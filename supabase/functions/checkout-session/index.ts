import { createClient } from "npm:@supabase/supabase-js@2.43.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS Preflight cross-origin requests
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { cartItems, email } = await req.json()

    // 1. Connect to Supabase using Admin permissions to read products safely
    const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    let totalAmountKobo = 0
    const itemsSummary = []

    // 2. Loop through cart items and calculate verified prices directly from the database
    for (const item of cartItems) {
      const { data: product } = await supabaseAdmin
          .from('products')
          .select('*')
          .eq('id', item.id)
          .single()

      if (!product) continue

      // Paystack handles money in Kobo (1 Naira = 100 Kobo)
      totalAmountKobo += Math.round(Number(product.price) * 100 * item.quantity)

      // Save item data to pass to the webhook later
      itemsSummary.push({
        p_id: product.id,
        qty: item.quantity,
        prc: Number(product.price)
      })
    }

    // 3. Initialize Transaction with Paystack's exact API gateway endpoint
    const paystackResponse = await fetch('https://paystack.co', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email || "guest-customer@example.com",
        amount: totalAmountKobo,
        callback_url: `${req.headers.get('origin')}/success`,
        metadata: {
          cart_summary: itemsSummary
        }
      })
    })

    const paystackData = await paystackResponse.json()

    if (!paystackData.status) {
      throw new Error(paystackData.message || "Paystack failed to generate payment link.")
    }

    // 4. Return the payment page url straight back to the React UI
    return new Response(JSON.stringify({ url: paystackData.data.authorization_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
