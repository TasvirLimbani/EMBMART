"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, User, ChevronDown, Download, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { CartSheet } from "@/components/cart-sheet"

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Embroidery Designs",
    href: "/designs",
    submenu: [
      { name: "Small Machines Designs", href: "/designs?category=small-machines" },
      { name: "Multi / Flat Designs", href: "/designs?category=multi-flat" },
      { name: "Cording Designs", href: "/designs?category=cording" },
      { name: "Sequins Designs", href: "/designs?category=sequins" },
      { name: "Chain Stitch Designs", href: "/designs?category=chain-stitch" },
      { name: "330 Area Designs", href: "/designs?category=330-area" },
    ],
  },
  { name: "Free Designs", href: "/designs?filter=free" },
  { name: "Subscription", href: "/subscription" },
  { name: "Contact", href: "/contact" },
]

const currencies = ["INR", "USD", "EUR", "GBP",]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { currency, setCurrency } = useCart()
  const { user, isAuthenticated, openLogin, openRegister, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        {/* <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">E</span>
          </div>
          <span className="text-xl font-bold text-foreground">EmbMart</span>
        </Link> */}
        <Link href="/" className="flex items-center gap-2">
          <img src="hlogo.png" alt="" className="h-15" />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.submenu ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-foreground hover:bg-primary hover:text-white">
                    {link.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {link.submenu.map((sublink) => (
                    <DropdownMenuItem key={sublink.name} asChild>
                      <Link href={sublink.href}>{sublink.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button key={link.name} variant="ghost" asChild className="text-foreground hover:bg-primary hover:text-white" >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            )
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Currency Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex text-foreground hover:bg-primary hover:text-white">
                {currency}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currencies.map((curr) => (
                <DropdownMenuItem
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={currency === curr ? "bg-muted" : ""}
                >
                  {curr}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Install App Button */}
          <Button size="sm" className="hidden md:flex gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Install App
          </Button>

          {/* Cart Sheet */}
          <CartSheet />

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group flex items-center gap-2 text-foreground hover:text-white"
                >
                  <div className="h-7 w-7 rounded-full bg-primary group-hover:bg-white/70 flex items-center justify-center transition-colors">
                    <span className="text-xs font-medium text-primary-foreground group-hover:text-primary">
                      {(user?.firstname?.charAt(0) ?? "?").toUpperCase()}

                    </span>
                  </div>

                  <span className="hidden sm:inline">{user?.firstname}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>

                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/downloads">My Downloads</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4 text-red" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-primary hover:text-white">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={openLogin}>Login</DropdownMenuItem>
                <DropdownMenuItem onClick={openRegister}>Register</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-80 border-l bg-background/95 backdrop-blur-xl"
            >
              {/* <SheetTitle className="text-xl font-semibold">
                Navigation
              </SheetTitle> */}

              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div key={link.name} className="space-y-1">
                    <Link
                      href={link.href}
                      onClick={() => !link.submenu && setIsOpen(false)}
                      className="
              flex items-center justify-between
              rounded-xl px-4 py-3
              text-base font-medium
              transition
              hover:bg-muted
              active:scale-[0.98]
            "
                    >
                      {link.name}
                    </Link>

                    {link.submenu && (
                      <div className="ml-4 border-l border-muted pl-4 space-y-1">
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.name}
                            href={sublink.href}
                            onClick={() => setIsOpen(false)}
                            className="
                    block rounded-lg px-3 py-2
                    text-sm text-muted-foreground
                    transition
                    hover:bg-muted hover:text-foreground
                  "
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Currency Selector */}
              <div className="mt-6 rounded-xl border bg-muted/50 p-4 mr-2 ml-2">
                <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">
                  Currency
                </p>
                <div className="flex gap-2 flex-wrap">
                  {currencies.map((curr) => (
                    <Button
                      key={curr}
                      size="sm"
                      variant={currency === curr ? "default" : "outline"}
                      onClick={() => setCurrency(curr)}
                      className="rounded-full px-4"
                    >
                      {curr}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Install App CTA */}
              <Button
                size="lg"
                className="
        mt-6 w-full rounded-xl
        bg-primary text-primary-foreground
        shadow-lg
        hover:shadow-xl
        
      "
              >
                <Download className="mr-2 h-4 w-4" />
                Install App
              </Button>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}
