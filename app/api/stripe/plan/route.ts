import Stripe from "stripe"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export async function POST(req: Request) {
  try {
    const { plan, userId } = await req.json()

    if (!plan || !userId) {
      return NextResponse.json(
        { error: "Plan and User ID required" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: plan.name,
            },
            recurring: {
              interval: plan.period, // month | year
            },
            unit_amount: Math.round(Number(plan.price) * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/subscription`,

      metadata: {
        userId: String(userId),
        planId: String(plan.id),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("STRIPE CHECKOUT ERROR:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
