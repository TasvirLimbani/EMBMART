import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { user_id, plan_id } = body

  if (!user_id || !plan_id) {
    return NextResponse.json(
      { status: false, message: "user_id & plan_id required" },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      "http://embmart.soon.it/plan/subscribe.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, plan_id }),
      }
    )

const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to add favorite" },
      { status: 500 }
    )
  }
}
