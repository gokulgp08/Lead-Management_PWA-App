import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
  const session = await getSession();
  if (!session) {
    throw redirect(303, '/auth/login');
  }

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('id, name, company_id')
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
    throw error(403, 'You do not have permission to delete this lead.');
  }

  return { lead };
};

export const actions: Actions = {
  default: async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      throw redirect(303, '/auth/login');
    }

    // Re-verify permission before deleting
    const { data: lead } = await supabase.from('leads').select('company_id').eq('id', params.leadId).single();
    const { data: profile } = await supabase.from('users').select('company_id').eq('id', session.user.id).single();

    if (lead?.company_id !== profile?.company_id) {
      return fail(403, { error: 'Permission denied.' });
    }

    const { error: deleteError } = await supabase
      .from('leads')
      .delete()
      .eq('id', params.leadId);

    if (deleteError) {
      return fail(500, { error: `Could not delete lead: ${deleteError.message}` });
    }

    throw redirect(303, '/dashboard');
  }
};
