import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { user_id, product_id } = body

  if (!user_id || !product_id) {
    return NextResponse.json(
      { status: false, message: "user_id & product_id required" },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(
      "http://embmart.soon.it/favorite/addfavorite.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, product_id }),
      }
    )

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to add favorite" },
      { status: 500 }
    )
  }
}
