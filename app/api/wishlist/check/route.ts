import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const product_id = searchParams.get("product_id");

    if (!user_id || !product_id) {
      return NextResponse.json(
        { success: false, message: "Missing params" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `http://embmart.soon.it/wishlist/check.php?user_id=${user_id}&product_id=${product_id}`,
      { cache: "no-store" }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Check wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Error checking wishlist" },
      { status: 500 }
    );
  }
}
