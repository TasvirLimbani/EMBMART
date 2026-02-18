import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.user_id || !body.product_id || !body.product_name) {
      return NextResponse.json(
        { status: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send raw JSON to PHP API
    const response = await fetch(
      "http://embmart.soon.it/product/adddownload.php",
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
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Download Proxy Error:", error);

    return NextResponse.json(
      { status: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
