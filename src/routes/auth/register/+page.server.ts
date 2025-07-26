import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import type { Actions, ServerLoad } from '@sveltejs/kit';

const registerSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  name: z.string().min(2, 'Your name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const load: ServerLoad = async () => {
	return {};
};

export const actions: Actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const companyName = formData.get('companyName') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = registerSchema.safeParse({ companyName, name, email, password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return fail(400, {
        data: { companyName, name, email },
        errors
      });
    }

        // Check if user with this email already exists
    // Use a service role client to bypass RLS for registration
    const supabaseService = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // 1. Check if user already exists
    const { data: existingUser } = await supabaseService
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return fail(409, { error: 'A user with this email address already exists.', data: { companyName, name, email } });
    }

    // 2. Generate and check for a unique subdomain
    const generateSubdomain = (name: string) =>
      name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

    const subdomain = generateSubdomain(companyName);

    const { data: existingSubdomain } = await supabaseService
      .from('companies')
      .select('id')
      .eq('subdomain', subdomain)
      .single();

    if (existingSubdomain) {
      return fail(409, { error: 'A company with this name already exists, please choose another.' });
    }

    // 3. Create the company
    const { data: newCompany, error: companyError } = await supabaseService
      .from('companies')
      .insert({ name: companyName, subdomain: subdomain, is_active: true })
      .select()
      .single();

    if (companyError || !newCompany) {
      return fail(500, { error: `Failed to create company: ${companyError?.message || 'Unknown error'}` });
    }

    // 4. Sign up the new user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (authError || !authData.user) {
      // Clean up created company if auth fails
      await supabaseService.from('companies').delete().eq('id', newCompany.id);
      return fail(500, { error: `Failed to create user: ${authError?.message || 'Unknown error'}` });
    }

    // 5. Create the user's profile, linking them to the company
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const { error: profileError } = await supabaseService.from('users').insert({
      id: authData.user.id,
      name: name,
      email: email,
      company_id: newCompany.id,
      role: 'admin', // The first user is the company admin
      password_hash: password_hash
    });

    if (profileError) {
      // Clean up: delete both the auth user and the company
      await supabase.auth.admin.deleteUser(authData.user.id);
      await supabaseService.from('companies').delete().eq('id', newCompany.id);
      return fail(500, { error: `Failed to create user profile: ${profileError.message}` });
    }

    throw redirect(303, '/auth/login?registered=true');
  }
};
