import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const product_id = searchParams.get("product_id");

    if (!product_id) {
      return NextResponse.json(
        { success: false, message: "product_id is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `http://embmart.soon.it/product/getsimilar.php?product_id=${product_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // important for fresh data
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Orders API error:", error);

    return NextResponse.json(
      { success: false, message: "Error fetching orders" },
      { status: 500 }
    );
  }
}
