import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user, company } }) => {
  if (!user || !company) {
    throw redirect(303, '/auth/login');
  }

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .eq('company_id', company.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    // Gracefully handle error, maybe return an empty array or show an error message
    return { user, company, leads: [] };
  }

  return {
    user,
    company,
    leads
  };
};

export const actions: Actions = {
  delete: async ({ request, locals: { supabase, user, company } }) => {
    if (!user || !company) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { error: 'Invalid request' });
    }

    const { error } = await supabase
      .from('leads')
      .delete()
      .match({ id: id, company_id: company.id });

    if (error) {
      console.error('Error deleting lead:', error);
      return fail(500, { error: 'Failed to delete lead. Please try again.' });
    }

    return { success: true };
  }
};
