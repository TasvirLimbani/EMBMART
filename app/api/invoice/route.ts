export const runtime = "nodejs"

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Basic validation
    if (
      !data.invoice_no ||
      !data.order_id ||
      !data.user_id ||
      !data.customer ||
      !data.email ||
      !Array.isArray(data.items) ||
      data.items.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid invoice payload" },
        { status: 400 }
      )
    }

    // Force valid prices
    data.items = data.items.map((item: any) => ({
      desc: item.desc,
      price: Number(item.price) > 0 ? Number(item.price) : 1,
      qty: Number(item.qty) > 0 ? Number(item.qty) : 1,
    }))

    // Forward request to PHP invoice API
    const phpRes = await fetch("http://embmart.soon.it/invoice/create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await phpRes.text()

    if (!phpRes.ok) {
      return NextResponse.json(
        { error: "Invoice PHP API failed", details: result },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Invoice created & email sent",
      response: result,
    })

  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", message: err.message },
      { status: 500 }
    )
  }
}
