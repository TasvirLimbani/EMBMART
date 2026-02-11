import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Design ID is required" },
        { status: 400 }
      )
    }

    const res = await fetch(
      `http://embmart.soon.it/product/productdetail.php?id=${id}`,
      { cache: "no-store" }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch design" },
        { status: 500 }
      )
    }

    const result = await res.json()

    // ✅ Always return NextResponse
    return NextResponse.json(result)
  } catch (error) {
    console.error("Designs API error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
