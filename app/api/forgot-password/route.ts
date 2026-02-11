import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ status: false, message: "Email is required" }, { status: 400 });
    }

    // Call the external API
    const response = await fetch("http://embmart.soon.it/auth/forgotpassword.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json({ status: false, message: "Internal server error" }, { status: 500 });
  }
}
