"use client"

import React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export function AuthModal() {
  const {
    isLoginOpen,
    isRegisterOpen,
    closeModals,
    openLogin,
    openRegister,
    loginWithUser

  } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [hideLoginTemporarily, setHideLoginTemporarily] = useState(false)


  // Register form state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")



  const [isForgotOpen, setIsForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      const data = await res.json()


      if (!res.ok || data.status === false) {
        setError("Invalid email or password")
      } else {
        // ✅ Fetch full user details
        const userRes = await fetch(`http://embmart.soon.it/auth/userdetail.php?id=${data.user_id}`);
        const userData = await userRes.json();

        if (!userRes.ok || userData.status === false) {
          setError("Failed to fetch user details");
        } else {
          // ✅ Call loginWithUser with full user object
          loginWithUser({
            id: data.user_id,
            firstname: userData.data.firstname,
            lastname: userData.data.lastname,
            email: userData.data.email,
            phonenumber: userData.data.phonenumber,
            created_at: userData.data.created_at,
            address: "",
            city: "",
            name: ""
          });

          resetForms();
        }
      }

    } catch {
      setError("Server error. Try again later.")
    }

    setIsLoading(false)
  }


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const payload = {
        firstname: registerName.split(" ")[0],
        lastname: registerName.split(" ")[1] || "",
        email: registerEmail,
        phonenumber: contactNumber,
        password: registerPassword,
      }

      const res = await fetch("/api/signup", {

        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ RAW JSON
        },
        body: JSON.stringify(payload), // ✅ RAW BODY
      })

      const text = await res.text()
      console.log("RAW RESPONSE:", text)

      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        setError("Backend error. Invalid response.")
        setIsLoading(false)
        return
      }

      if (!res.ok || data.status === false) {
        console.log("FULL ERROR:", data)
        setError(data.error || data.message || "Registration failed")
      } else {
        closeModals()
        resetForms()
        openLogin()
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err)
      setError("Server error. Try again later.")
    }

    setIsLoading(false)
  }





  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json()
      if (data.status) {
        alert("Reset email process started")
        setIsForgotOpen(false)
        setHideLoginTemporarily(false)
      }

    } catch (err) {
      setError("Server error")
    }

    setIsLoading(false)
  }



  const resetForms = () => {
    setLoginEmail("")
    setLoginPassword("")
    setRegisterName("")
    setRegisterEmail("")
    setContactNumber("")
    setRegisterPassword("")
    setRegisterConfirmPassword("")
    setError("")
    setShowPassword(false)
  }

  return (
    <>
      {/* Login Modal */}
      <Dialog
        open={isLoginOpen && !hideLoginTemporarily}
        onOpenChange={(open) => {
          if (!open) closeModals(), resetForms()
        }}
      >

        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">Welcome Back</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Sign in to your EmbMart account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-foreground">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-background pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => {
                  if (loginEmail) setForgotEmail(loginEmail)
                  setHideLoginTemporarily(true)
                  setIsForgotOpen(true)

                }}

                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>


            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <button
                type="button"
                onClick={() => { resetForms(); openRegister(); }}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog >

      {/* Register Modal */}
      < Dialog open={isRegisterOpen} onOpenChange={(open) => { if (!open) { closeModals(); resetForms(); } }}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">Create Account</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Join EmbMart to access thousands of designs
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4 mt-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="register-name" className="text-foreground">Full Name</Label>
              <Input
                id="register-name"
                type="text"
                placeholder="Enter your name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-foreground">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-number" className="text-foreground">
                Number
              </Label>
              <Input
                id="register-number"
                type="tel"
                placeholder="Enter your number"
                value={contactNumber}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // digits only
                  if (value.length <= 10) {
                    setContactNumber(value);
                  }
                }}
                className="bg-background"
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="bg-background pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm" className="text-foreground">Confirm Password</Label>
              <Input
                id="register-confirm"
                type="password"
                placeholder="Confirm your password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { resetForms(); openLogin(); }}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog >


      {/* FORGOT PASSWORD MODAL */}
      <Dialog
        open={isForgotOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsForgotOpen(false)
            setHideLoginTemporarily(false) // 👈 SHOW LOGIN AGAIN
            setForgotEmail("") // 👈 CLEAR EMAIL FIELD
          }
        }}
      >

        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email and we’ll send you a password reset link.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleForgot} className="space-y-4 mt-4">
            {error && <div className="text-destructive text-sm">{error}</div>}

            <Input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>


    </>
  )
}
