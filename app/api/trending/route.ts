import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const res = await fetch(
      "http://embmart.soon.it/product/gettrending.php",
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { status: false, products: [] },
        { status: 500 }
      )
    }

    const data = await res.json()

    return NextResponse.json({
      status: true,
      products: Array.isArray(data.products) ? data.products : [],
    })
  } catch (error) {
    console.error("Trending API Error:", error)

    return NextResponse.json(
      {
        status: false,
        products: [],
        message: "Failed to load trending products",
      },
      { status: 500 }
    )
  }
}
