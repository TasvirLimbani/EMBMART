"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  ChevronRight,
  CreditCard,
  Wallet,
  ShieldCheck,
  Lock,
  Trash2,
  Loader2,
  Check,
  ArrowLeft
} from "lucide-react"
import { SafeImage } from "@/components/imagehandel"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, formatPrice, removeFromCart, clearCart } = useCart()
  const { user, isAuthenticated, openLogin } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    couponCode: "",
  })
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const applyCoupon = () => {
    if (formData.couponCode.toLowerCase() === "save10") {
      setDiscount(totalPrice * 0.1)
      setCouponApplied(true)
    }
  }

  const finalTotal = totalPrice - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !user?.id) {
      openLogin()
      return
    }

    try {
      setIsProcessing(true)

      // 🔁 Loop through cart items
      for (const item of items) {
        /* ---------------- ADD ORDER ---------------- */
        await fetch("http://embmart.soon.it/product/addorder.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: Number(user.id),
            product_id: Number(item.id),
            product_name: item.name,
            product_category: item.category,
            product_image: item.image || item.images[0],
            quantity: Number(item.quantity),
          }),
        });

        /* ---------------- ADD DOWNLOAD ---------------- */
        await fetch("http://embmart.soon.it/product/adddownload.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: Number(user.id),
            product_id: Number(item.id),
            product_name: item.name,
            product_category: item.category,
            product_image: item.image || item.images[0],
          }),
        });
      }

      // ✅ Success
      setOrderComplete(true)
      clearCart()
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Something went wrong while placing the order.")
    } finally {
      setIsProcessing(false)
    }
  }
  const handlePay = async () => {
    if (!isAuthenticated || !user?.id) {
      openLogin()
      return
    }

    // ✅ SAVE CART BEFORE STRIPE REDIRECT
    localStorage.setItem("checkout_items", JSON.stringify(items))

    try {
      setIsProcessing(true)

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
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



  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some designs to proceed with checkout.</p>
          <Button onClick={() => router.push("/")} className="bg-primary text-primary-foreground">
            Browse Designs
          </Button>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Order Complete!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          <p className="text-muted-foreground mb-8">
            Your designs are ready to download. Check your email for the download links.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => router.push("/downloads")} className="bg-primary text-primary-foreground">
              Go to Downloads
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="bg-transparent">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Checkout</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-4 text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
                {isAuthenticated ? (
                  <p className="text-muted-foreground">
                    Logged in as <span className="text-foreground font-medium">{user?.email}</span>
                  </p>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <button type="button" onClick={openLogin} className="text-primary hover:underline">
                        Log in
                      </button>
                    </p>
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="mt-1 bg-background"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Details */}
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">Billing Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="mt-1 bg-background"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="mt-1 bg-background"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">Reciver Contect Number </h2>
                <div className="grid">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground">Contect Number</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your contact number"
                      className="mt-1 bg-background"
                      required
                    />
                  </div>
                </div>
              </div>



              <div className="bg-card rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">Shipping Address</h2>
                <div className="grid">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground">Address</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="mt-1 bg-background"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              {/* <div className="bg-card rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className={`flex items-center gap-4 p-4 rounded-lg border transition ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Credit / Debit Card</span>
                    </Label>
                    <div className="flex gap-2">
                      <div className="h-6 w-10 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                      <div className="h-6 w-10 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-4 p-4 rounded-lg border transition ${paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-3 flex-1 cursor-pointer">
                      <Wallet className="h-5 w-5 text-blue-500" />
                      <span className="text-foreground">PayPal</span>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 bg-background"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-foreground">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="mt-1 bg-background"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="mt-1 bg-background"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div> */}

              {/* Security Notice */}
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg text-green-800">
                <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">Your payment information is encrypted and secure. We never store your card details.</p>
              </div>

              {/* <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Pay {formatPrice(finalTotal)}
                  </>
                )}
              </Button> */}
              <Button
                type="button"
                onClick={handlePay}
                className="w-full bg-primary text-primary-foreground py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Redirecting to payment...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Pay {formatPrice(finalTotal)}
                  </>
                )}
              </Button>


            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <SafeImage
                        src={item.image || item.images[0] || "/images/images.png"}
                        alt={item.name}
                        className="object-contain object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-primary">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Coupon */}
              <div className="mb-4">
                <Label htmlFor="coupon" className="text-foreground text-sm">Coupon Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="coupon"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    placeholder="Enter code"
                    className="bg-background"
                    disabled={couponApplied}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={applyCoupon}
                    disabled={couponApplied}
                    className="bg-transparent"
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-green-600 mt-1">Coupon applied! You saved {formatPrice(discount)}</p>
                )}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">{formatPrice(0)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
