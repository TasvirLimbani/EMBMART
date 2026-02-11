import Stripe from "stripe"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL! || "http://localhost:3000"
export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json()

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

 

    success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout`,


      metadata: {
        userId: String(userId),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("❌ STRIPE ERROR:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
