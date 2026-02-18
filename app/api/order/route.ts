import { NextRequest, NextResponse } from "next/server";

// Example DB insert function (replace with real DB logic)
async function insertOrder(data: {
  user_id: number;
  product_id: number;
  product_name: string;
  product_category: string;
  product_image: string;
  quantity: number;
}) {
  // TODO: replace with MySQL / Prisma / Mongo insert
  console.log("Order received:", data);

  return {
    order_id: Date.now(), // mock order id
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      user_id,
      product_id,
      product_name,
      product_category,
      product_image,
      quantity,
    } = body;

    // ✅ Validation
    if (
      !user_id ||
      !product_id ||
      !product_name ||
      !product_category ||
      !quantity
    ) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // ✅ Save order
    const result = await insertOrder({
      user_id,
      product_id,
      product_name,
      product_category,
      product_image: product_image || "",
      quantity,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Order added successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order API error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
