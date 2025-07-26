/// <reference types="./deno.env.d.ts" />
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'

// Helper function to create consistent response objects
const createResponse = (body: any, status: number) => {
  return new Response(JSON.stringify(body), {
    headers: { 
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' 
    },
    status,
  })
}

// Helper function to validate input
const validateInput = (data: any) => {
  if (!data) {
    return { valid: false, error: 'No data provided' }
  }
  
  const { companyName, userId, owner_id } = data
  
  if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
    return { valid: false, error: 'Company name must be at least 2 characters long' }
  }
  
  if (!userId || typeof userId !== 'string') {
    return { valid: false, error: 'Invalid user ID' }
  }

  if (!owner_id || typeof owner_id !== 'string') {
    return { valid: false, error: 'Invalid owner ID' }
  }
  
  return { valid: true, data: { companyName: companyName.trim(), userId, owner_id } }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return createResponse({ message: 'ok' }, 200)
  }

  try {
    // Parse and validate request body
    let requestData;
    try {
      requestData = await req.json()
    } catch (e) {
      console.error('Error parsing JSON:', e)
      return createResponse({ error: 'Invalid JSON payload' }, 400)
    }

    const validation = validateInput(requestData)
    if (!validation.valid) {
      console.error('Validation error:', validation.error)
      return createResponse({ error: validation.error }, 400)
    }
    const { companyName, userId, owner_id } = validation.data as { companyName: string; userId: string; owner_id: string };

    // Initialize Supabase client with environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing required environment variables')
      return createResponse(
        { error: 'Server configuration error' }, 
        500
      )
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // 1. Create the company
    // Generate a subdomain from company name (lowercase, replace spaces with hyphens)
    const subdomain = companyName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '-')
    
    console.log(`Creating company: ${companyName} with subdomain: ${subdomain} for user: ${userId}`)
    const { data: companyData, error: companyError } = await supabaseAdmin
      .from('companies')
      .insert({ 
        name: companyName, 
        subdomain: subdomain,
        owner_id: owner_id,
        created_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (companyError) {
      console.error('Error creating company:', JSON.stringify(companyError, null, 2))
      if (companyError.code === '23505') { // Unique constraint violation
        return createResponse({ error: 'A company with this name already exists. Please choose a different name.' }, 409) // 409 Conflict
      }
      return createResponse({ error: `Failed to create company: ${companyError.message}` }, 500)
    }

    // 2. Update the user's profile with the new company_id
    console.log(`Updating user profile with company ID: ${companyData.id}`)
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .update({ 
        company_id: companyData.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (profileError) {
      console.error('Error updating user profile:', JSON.stringify(profileError, null, 2))
      // Even if this fails, we should probably not fail the whole operation, but log it.
      // For now, we fail it to find the root cause.
      return createResponse({ error: `Failed to update user profile: ${profileError.message}` }, 500)
    }

    console.log('Company created and user profile updated successfully')
    return createResponse({ 
      success: true, 
      companyId: companyData.id 
    }, 200)

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Unhandled error in create-company function:', JSON.stringify(error, null, 2))
    return createResponse(
      { 
        success: false, 
        error: errorMessage 
      }, 500
    )
  }
})

