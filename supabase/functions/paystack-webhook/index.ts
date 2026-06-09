import { createClient } from "npm:@supabase/supabase-js@2.43.4"

Deno.serve(async (req) => {
  try {
    const body = await req.json()

    // Listen for Paystack's successful payment alert signal
    if (body.event === 'charge.success') {
      const data = body.data
      const orderItemsArray = data.metadata.cart_summary

      const supabaseAdmin = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      )

      // 1. Insert master record into your orders table
      const { data: newOrder, error: orderError } = await supabaseAdmin
          .from('orders')
          .insert({
            total_amount: data.amount / 100, // Convert Kobo back to standard Naira units
            status: 'paid'
          })
          .select('id')
          .single()

      if (orderError) throw orderError

      // 2. Map items to fit your EXACT public.order_items columns
      const finalLineItems = orderItemsArray.map((item: any) => ({
        order_id: newOrder.id,     // Your auto-incremented integer ID from step 1
        product_id: item.p_id,     // UUID matching products
        quantity: item.qty,        // Integer quantity
        price: item.prc            // Numeric price value
      }))

      // 3. Bulk insert rows directly into your order details database table
      const { error: itemsError } = await supabaseAdmin
          .from('order_items')
          .insert(finalLineItems)

      if (itemsError) throw itemsError
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err: any) {
    return new Response(`Webhook Database Write Error: ${err.message}`, { status: 400 })
  }
})
