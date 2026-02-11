import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token or password missing" },
        { status: 400 }
      );
    }

    // Send raw JSON
    const response = await fetch(
      "http://embmart.soon.it/auth/resetpassword.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      }
    );

    const text = await response.text();

    // PHP may return invalid JSON, so wrap in try/catch
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ message: text });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { message: "Server error. Try again later." },
      { status: 500 }
    );
  }
}
