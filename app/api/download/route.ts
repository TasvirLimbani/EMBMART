export async function GET(req: Request) {
  const url = new URL(req.url)
  const file = url.searchParams.get("file")

  if (!file) {
    return new Response("File missing", { status: 400 })
  }

  const upstream = await fetch("http://embmart.soon.it/" + file)

  if (!upstream.ok || !upstream.body) {
    return new Response("File not found", { status: 404 })
  }

  const filename = file.split("/").pop() || "download.EMB"

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": upstream.headers.get("content-length") ?? ""
    }
  })
}
