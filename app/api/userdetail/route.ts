export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const response = await fetch(
      `http://embmart.soon.it/auth/userdetail.php?id=${id}`
    );

    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return Response.json(
      { status: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
