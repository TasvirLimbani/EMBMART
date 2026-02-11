import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://embmart.soon.it/plan/get.php", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const text = await res.text();
    console.log("RAW PHP RESPONSE 👉", text);

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          status: false,
          error: "PHP did not return valid JSON",
          raw: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      plans: Array.isArray(data.plans) ? data.plans : [], // ✅ use data.plans
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}