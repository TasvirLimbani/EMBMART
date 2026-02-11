import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get("user_id")

  if (!user_id) {
    return NextResponse.json(
      { status: false, message: "user_id required" },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(
      `http://embmart.soon.it/favorite/getfavorites.php?user_id=${user_id}`,
      { cache: "no-store" }
    )

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch wishlist" },
      { status: 500 }
    )
  }
}
