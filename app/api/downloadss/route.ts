// app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";

// Simulate a database function
async function addDownloadToDB(download: any) {
  // Replace this with your actual DB logic
  console.log("Download saved:", download);
  return { success: true, downloadId: Date.now() };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["user_id", "product_id", "product_name"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Save the download record (replace with real DB logic)
    const result = await addDownloadToDB(body);

    return NextResponse.json({
      status: "success",
      message: "Download recorded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error recording download:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to record download" },
      { status: 500 }
    );
  }
}
