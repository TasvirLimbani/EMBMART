import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Read body sent from frontend
    const body = await req.json();

    // Forward request to PHP API
    const response = await fetch(
      "http://embmart.soon.it/product/addorder.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: body.user_id,
          product_id: body.product_id,
          product_name: body.product_name,
          product_category: body.product_category,
          product_image: body.product_image,
          quantity: body.quantity,
        }),
      }
    );

    const data = await response.json();

    // Return PHP API response to frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Order proxy error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Order API failed",
      },
      { status: 500 }
    );
  }
}
