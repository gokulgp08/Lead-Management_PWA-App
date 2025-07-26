import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const newLeadSchema = z.object({
  lead_name: z.string().min(2, 'Lead name must be at least 2 characters'),
  company_name: z.string().min(2, 'Company name must be at least 2 characters'),
  mobile_numbers: z.string().optional(), // Will be transformed into a JSON array
  current_software: z.string().optional(),
  remarks: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).default('new')
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(newLeadSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(newLeadSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { supabase, company, user } = event.locals;

    if (!company || !user) {
      return fail(401, { form, error: 'User is not associated with a company or is not logged in.' });
    }

    const { error } = await supabase.from('leads').insert([
      {
        lead_name: form.data.lead_name,
        company_name: form.data.company_name,
        mobile_numbers: form.data.mobile_numbers ? [form.data.mobile_numbers] : [],
        current_software: form.data.current_software,
        remarks: form.data.remarks,
        status: form.data.status,
        company_id: company.id,
        created_by: user.id
      }
    ]);

    if (error) {
      console.error('Failed to create lead:', error);
      return fail(500, { form, error: 'Failed to create lead. Please try again.' });
    }

    throw redirect(303, '/dashboard');
  }
};
