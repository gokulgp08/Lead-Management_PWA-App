import { json } from '@sveltejs/kit'

export async function POST({ request }) {
  const { id, name, email, phone, status, owner_id, company_id } = await request.json()

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/update-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ id, name, email, phone, status, owner_id, company_id }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error from Edge Function:', result)
      return json({ success: false, error: result.error || 'Edge Function error' }, { status: response.status })
    }

    return json({ success: true, lead: result.lead })
  } catch (error: any) {
    console.error('API endpoint error:', error)
    return json({ success: false, error: error.message || 'Internal server error' }, { status: 500 })
  }
}
