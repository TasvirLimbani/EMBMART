"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import {
  ChevronRight,
  Check,
  Star,
  Download,
  Zap,
  Crown,
  Users,
} from "lucide-react"
import { Plan } from "@/lib/plan"

/* ------------------ Currency helpers ------------------ */

const currencySymbols: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
}

/** Base prices assumed in USD */
const exchangeRates: Record<string, number> = {
  USD: 1 / 83.12,
  INR: 1,
  EUR: 1 / 90.3,
  GBP: 1 / 105.4,
}

const convertPrice = (price: number, currency: string) => {
  const rate = exchangeRates[currency] ?? 1
  return Math.round(price * rate)
}

/* ----------------------------------------------------- */

export default function SubscriptionPage() {
  const { user, isAuthenticated, openLogin } = useAuth()
  const { currency } = useCart()

  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setPlans(data.plans)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])


  const handleSubscribe = async (plan: Plan) => {
    if (!isAuthenticated || !user?.id) {
      openLogin()
      return
    }

    // ✅ SAVE CART BEFORE STRIPE REDIRECT
    localStorage.setItem("plan_items", JSON.stringify(plan))

    try {
      setIsProcessing(true)

      const res = await fetch("/api/stripe/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          userId: user.id,
          
          
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        alert("Payment session failed")
        return
      }

      window.location.href = data.url
    } catch (err) {
      console.error(err)
      alert("Payment failed")
    }
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Subscription</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-12 text-center">
        <Badge className="mb-4 bg-primary/10 text-primary border-0">
          Save up to 60%
        </Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Get unlimited access to thousands of premium embroidery designs.
          Cancel anytime, no hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {!loading &&
            plans.map((plan) => {
              const Icon =
                plan.icon === "Download"
                  ? Download
                  : plan.icon === "Zap"
                    ? Zap
                    : plan.icon === "Crown"
                      ? Crown
                      : plan.icon === "Users"
                        ? Users
                        : Star

              const finalPrice = convertPrice(Number(plan.price), currency)

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 md:p-8 transition ${plan.highlighted
                    ? "bg-primary text-primary-foreground scale-105 shadow-xl"
                    : "bg-card border shadow-sm"
                    }`}
                >
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent">
                      {plan.badge}
                    </Badge>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center ${plan.highlighted
                        ? "bg-white/20"
                        : "bg-primary/10"
                        }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${plan.highlighted
                          ? "text-primary-foreground"
                          : "text-primary"
                          }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm opacity-80">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {currencySymbols[currency]} {finalPrice}
                    </span>
                    <span className="opacity-80"> / {plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string) => (
                      <li key={feature} className="flex gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm opacity-90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full ${plan.highlighted
                      ? "bg-white text-primary hover:bg-white/90"
                      : ""
                      }`}
                  >
                    Subscribe Now
                  </Button>
                </div>
              )
            })}
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Subscription?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Download, title: "Instant Downloads" },
            { icon: Star, title: "Premium Quality" },
            { icon: Zap, title: "Regular Updates" },
            { icon: Users, title: "Community Access" },
          ].map(({ icon: Icon, title }) => (
            <div key={title} className="text-center p-6">
              <div className="h-14 w-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">
                High-quality embroidery designs tailored for professionals.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
