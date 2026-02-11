import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      )
    }

    // 1. Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "payment_intent"],
    })

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      )
    }

    // 2. Extract metadata
    const userId = session.metadata?.userId
    const planId = session.metadata?.planId

    const paymentId =
      session.subscription?.toString() ||
      session.payment_intent?.toString()
const start = new Date()

const end = new Date(start)
end.setMonth(end.getMonth() + 1)
    // 3. Call PHP API
    const response = await fetch(
      "http://embmart.soon.it/plan/subscribe.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          plan_id: planId,
          payment_id: session.id,
          payment_status: "paid",
          amount_paid : session.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00",
         start_date: start.toISOString(),
          end_date: end.toISOString(),
        }),
      }
    )

    // 🔥 SAFE PARSING (THIS FIXES YOUR ERROR)
    const text = await response.text()

    let result
    try {
      result = JSON.parse(text)
    } catch (err) {
      console.error("❌ PHP RESPONSE (NOT JSON):", text)
      return NextResponse.json(
        { error: "Server error while saving subscription" },
        { status: 500 }
      )
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || "DB insert failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("❌ STRIPE CONFIRM ERROR:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
