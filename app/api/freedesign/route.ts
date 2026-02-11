import { NextResponse } from "next/server";
import { fetchFreeDesigns } from "@/lib/freedesign";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    const data = await fetchFreeDesigns(page, limit);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching free designs" },
      { status: 500 }
    );
  }
}
