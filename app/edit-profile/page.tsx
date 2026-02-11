"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function EditProfile() {
    const params = useSearchParams()
    const router = useRouter()
    const userId = params.get("id")

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (!userId) return

        fetch(`/api/profile?id=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status && data.data) {
                    setFirstname(data.data.firstname)
                    setLastname(data.data.lastname)
                } else {
                    setError("Failed to load user")
                }
            })
            .catch(() => setError("Failed to fetch user data"))
    }, [userId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Number(userId),
                    firstname,
                    lastname,
                }),
            })

            const data = await res.json()

            if (data.status) {
                setSuccess("Profile updated successfully")

                if (data.status) {
                    setSuccess("Profile updated successfully")

                    setTimeout(() => {
                        router.replace("/account")
                        router.refresh()
                    }, 1000)
                }

            } else {
                setError(data.message || "Update failed")
            }
        } catch {
            setError("Failed to update profile")
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">

                <h2 className="text-2xl font-bold text-center text-teal-600">
                    Edit Profile
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}

                <input
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                    placeholder="First Name"
                    className="w-full border p-3 rounded"
                />

                <input
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                    placeholder="Last Name"
                    className="w-full border p-3 rounded"
                />

                <button
                    disabled={loading}
                    className="w-full bg-teal-600 text-white py-3 rounded font-semibold"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    )
}
