import { NextResponse } from "next/server"

const USER_API = "http://embmart.soon.it/auth/userdetail.php"
const UPDATE_API = "http://embmart.soon.it/auth/update_profile.php"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                { status: false, message: "User ID missing" },
                { status: 400 }
            )
        }

        const res = await fetch(`${USER_API}?id=${id}`)
        const text = await res.text()

        // 🔥 If PHP sends HTML / error
        if (!text.startsWith("{")) {
            return NextResponse.json(
                {
                    status: false,
                    message: "Invalid response from PHP",
                    raw: text,
                },
                { status: 500 }
            )
        }

        return NextResponse.json(JSON.parse(text))
    } catch (err: any) {
        return NextResponse.json(
            {
                status: false,
                message: "API route error",
                error: err.message,
            },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const res = await fetch(UPDATE_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        const data = await res.json()
        return NextResponse.json(data)
    } catch (err: any) {
        return NextResponse.json(
            {
                status: false,
                message: "Update failed",
                error: err.message,
            },
            { status: 500 }
        )
    }
}
