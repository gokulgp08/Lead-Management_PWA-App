import { json } from '@sveltejs/kit'

export async function GET() {
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/list-leads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error from Edge Function:', result)
      return json({ success: false, error: result.error || 'Edge Function error' }, { status: response.status })
    }

    return json({ success: true, leads: result.leads })
  } catch (error: any) {
    console.error('API endpoint error:', error)
    return json({ success: false, error: error.message || 'Internal server error' }, { status: 500 })
  }
}
