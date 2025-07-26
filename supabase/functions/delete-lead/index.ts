/// <reference types="./deno.env.d.ts" />
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'

const createResponse = (body: any, status: number) => {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    },
    status,
  })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return createResponse({ message: 'ok' }, 200)
  }

  try {
    const { id } = await req.json()

    if (!id) {
      return createResponse({ error: 'Missing lead ID' }, 400)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing required environment variables')
      return createResponse({ error: 'Server configuration error' }, 500)
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { error } = await supabaseAdmin
      .from('leads')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting lead:', error)
      return createResponse({ error: `Failed to delete lead: ${error.message}` }, 500)
    }

    return createResponse({ success: true, message: 'Lead deleted successfully' }, 200)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Unhandled error in delete-lead function:', error)
    return createResponse({ success: false, error: errorMessage }, 500)
  }
})
