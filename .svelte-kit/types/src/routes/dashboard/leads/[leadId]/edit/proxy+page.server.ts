// @ts-nocheck
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const updateLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'lost']),
  notes: z.string().optional(),
  assigned_to: z.string().uuid().optional().nullable()
});

export const load = async ({ params, locals: { supabase, getSession } }: Parameters<PageServerLoad>[0]) => {
  const session = await getSession();
  if (!session) {
    throw redirect(303, '/auth/login');
  }

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', params.leadId)
    .single();

  if (leadError) {
    throw error(404, 'Lead not found');
  }

  const { data: profile } = await supabase
    .from('users')
    .select('company_id')
    .eq('id', session.user.id)
    .single();

  if (lead.company_id !== profile?.company_id) {
    throw error(403, 'You do not have permission to edit this lead.');
  }

  const { data: users } = await supabase
    .from('users')
    .select('id, name')
    .eq('company_id', profile.company_id);

    const form = await superValidate(lead, zod(updateLeadSchema));
  return { form, users: users || [] };
};

export const actions = {
  default: async ({ request, params, locals: { supabase, getSession } }: import('./$types').RequestEvent) => {
    const session = await getSession();
    if (!session) {
      throw redirect(303, '/auth/login');
    }

        const form = await superValidate(request, zod(updateLeadSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // Handle empty string for nullable assigned_to
    if (form.data.assigned_to === '') {
      form.data.assigned_to = null;
    }

    const { error } = await supabase
      .from('leads')
      .update(form.data)
      .eq('id', params.leadId);

    if (error) {
      return fail(500, { form, error: `Could not update lead: ${error.message}` });
    }

    throw redirect(303, '/dashboard');
  }
};
;null as any as Actions;