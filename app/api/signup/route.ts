export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "http://embmart.soon.it/auth/signup.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
