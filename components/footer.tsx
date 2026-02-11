"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from "lucide-react"

/* ================= TYPES ================= */

type FooterLink = {
  name: string
  href: string
  download?: boolean
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

/* ================= FOOTER DATA ================= */

const footerLinks: Record<string, FooterSection> = {
  about: {
    title: "About",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
  },
  useful: {
    title: "Useful Links",
    links: [
      { name: "My Account", href: "/account" },
      { name: "Order History", href: "/orders" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
  },
  legal: {
    title: "Terms & Privacy",
    links: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refunds" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
  support: {
    title: "Help & Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faq" },
      { name: "Machine Formats", href: "/formats" },
      { name: "Tutorials", href: "/tutorials" },
    ],
  },


  links: {
    title: "Links",
    links: [
      {
        name: "Wilcom TrueSizer",
        href: "/software/truesizer.exe",
        download: true,
      },
      {
        name: "ZIP",
        href: "/software/software.exe",
        download: true,
      },
      {
        name: "Embird",
        href: "https://www.embird.net/download.htm",
        // ❌ NO download
      },
    ],
  },



}

/* ================= SOCIAL ================= */

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "WhatsApp", icon: MessageCircle, href: "#" },
]

/* ================= FOOTER ================= */

export function Footer() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage("✅ You are subscribed successfully!")
        setEmail("")
      } else {
        setMessage("❌ " + data.message)
      }
    } catch {
      setMessage("❌ Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <img src="/hlogo.png" alt="EmbMart" className="h-20" />
            </Link>

            <p className="mb-6 text-sm text-background/70">
              Your one-stop destination for premium embroidery designs.
            </p>

            <h4 className="mb-3 font-semibold">Subscribe for Updates</h4>

            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20"
              />

              <Button onClick={handleSubscribe} disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {message && (
              <p className="mt-2 text-sm text-background/70">{message}</p>
            )}
          </div>

          {/* LINKS */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.name}>
                    {item.download ? (
                      <a
                        href={item.href}
                        download
                        className="text-sm text-background/70 hover:text-primary transition"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : "_self"}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-background/70 hover:text-primary transition"
                      >
                        {item.name}
                      </a>
                    )}
                  </li>

                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-sm text-background/70">
            © {new Date().getFullYear()} EmbMart. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="rounded-full bg-background/10 p-2 hover:bg-primary hover:text-primary-foreground transition"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
