import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions, ServerLoad } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const load: ServerLoad = async ({ locals: { user } }) => {
  if (user) {
    throw redirect(303, '/dashboard');
  }
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return fail(400, { data: { email }, errors });
    }

    const supabaseService = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data: user, error: userError } = await supabaseService
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return fail(401, { error: 'Invalid email or password.', data: { email } });
    }

    if (!user.password_hash) {
      return fail(401, { error: 'Invalid email or password.', data: { email } });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return fail(401, { error: 'Invalid email or password.', data: { email } });
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      companyId: user.company_id,
      role: user.role,
      theme: user.theme
    };

    const token = jwt.sign(payload, process.env.AUTH_SECRET!, { expiresIn: '1h' });

    cookies.set('auth_token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 // 1 hour
    });

    throw redirect(303, '/dashboard');
  }
};
