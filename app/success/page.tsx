"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid payment session")
      setLoading(false)
      return
    }

    const confirmPayment = async () => {
      try {
        const res = await fetch("/api/stripe/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Payment confirmation failed")
        }

        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    confirmPayment()
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {loading ? (
            <>
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">
                Activating your subscription…
              </p>
            </>
          ) : error ? (
            <>
              <p className="text-red-500">{error}</p>
              <Button onClick={() => router.push("/subscription")}>
                Try Again
              </Button>
            </>
          ) : (
            <>
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
              <h1 className="text-2xl font-semibold">
                Payment Successful 🎉
              </h1>
              <p className="text-muted-foreground">
                Your plan is now active.
              </p>

              <p className="text-xs break-all text-muted-foreground">
                Session ID: {sessionId}
              </p>

              <div className="flex flex-col gap-3">
                <Button onClick={() => router.push("/subscription")}>
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Back to Home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
