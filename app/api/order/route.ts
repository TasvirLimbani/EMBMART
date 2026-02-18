// app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";

// Simulate a database function
async function addOrderToDB(order: any) {
  // Replace this with your real DB logic
  console.log("Order saved:", order);
  return { success: true, orderId: Date.now() };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["user_id", "product_id", "product_name", "quantity", "session_id"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Save the order (replace with real DB logic)
    const result = await addOrderToDB(body);

    return NextResponse.json({
      status: "success",
      message: "Order added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding order:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to add order" },
      { status: 500 }
    );
  }
}
