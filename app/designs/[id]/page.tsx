"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getDesignById, getTrendingDesigns, type Design } from "@/lib/designs-data"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Heart,
  Download,
  ChevronRight,
  Check,
  Share2,
  FileType,
  Ruler,
  Palette,
  Layers
} from "lucide-react"
import { FreedesignItem, FreedesignResponse } from "@/models/Freedesign"
import { SafeImage } from "@/components/imagehandel"

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  // const design = getDesignById(Number(id))
  const { addToCart, formatPrice } = useCart()
  const { isAuthenticated, openLogin } = useAuth()

  const [design, setDesign] = useState<FreedesignItem | null>(null)
  const [similerdesign, setSimilerDesign] = useState<[FreedesignItem] | []>([])
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const relatedDesigns = getTrendingDesigns()
    .filter((d) => d.id !== Number(id))
    .slice(0, 4)

  /* ---------------- FETCH DESIGN ---------------- */
  useEffect(() => {
    async function loadDesign() {
      try {
        setLoading(true)
        const res = await fetch(`/api/detail?id=${id}`)
        const response = await fetch(`/api/similer?product_id=${id}`)
        if (!res.ok) {
          setDesign(null)
          return
        }
        const data: FreedesignItem = await res.json()
        const similerdata: FreedesignItem = await response.json()
        setDesign(data)
        setSimilerDesign(similerdata.similar_products)

      } catch (error) {
        console.error("Failed to load design", error)
        setDesign(null)
      } finally {
        setLoading(false)
      }
    }

    loadDesign()
  }, [id])

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold">
          Loading design...
        </div>
      </div>
    )
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!design) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Design Not Found</h1>
        <Button onClick={() => router.push("/designs")}>
          Browse All Designs
        </Button>
      </div>
    )
  }
  const handleAddToCart = () => {
    addToCart(design)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openLogin()
      return
    }
    addToCart(design)
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/designs" className="hover:text-primary">Designs</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{design.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <SafeImage
                src={design.images[0] || "/images/images.png"}
                alt={design.name}
                className="object-contain object-center transition duration-300 group-hover:scale-105 bg-primary/10"
              />
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {design.created_at &&
                  new Date(design.created_at).toDateString() ===
                  new Date().toDateString() && (
                    <Badge className="bg-accent text-accent-foreground">New</Badge>
                  )}
                {/* {design.isSale && (
                  <Badge className="bg-destructive text-white">
                    {design.originalPrice && `${Math.round((1 - design.price / design.originalPrice) * 100)}% OFF`}
                  </Badge>
                )} */}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm font-medium text-primary">{design.category}</span>
              <h1 className="text-3xl font-bold text-foreground mt-2 text-balance">{design.name}</h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">{formatPrice(Number(design.price))}</span>
              {Number(design.price) && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(Number(design.price))}
                </span>
              )}
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Stitch Count</p>
                  <p className="font-semibold text-foreground">{design.stitches}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Width</p>
                  <p className="font-semibold text-foreground">{design.width.split(".")[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Ruler className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Height</p>
                  <p className="font-semibold text-foreground">{design.height.split(".")[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileType className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Formats</p>
                  <p className="font-semibold text-foreground">{design.formats.split(",").length} types</p>
                </div>
              </div>
            </div>

            {/* Formats */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-2">Available Formats:</p>
              <div className="flex flex-wrap gap-2">
                {design.formats.split(",").map((format) => (
                  <Badge key={format} variant="outline" className="bg-transparent">
                    {format}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`bg-transparent ${isWishlisted ? "text-destructive border-destructive" : ""}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Buy Now & Download
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>Instant download after purchase</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>Compatible with {design.formats}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>All formats included in one purchase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              How to Download?
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="offer"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Offer
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Machine & File Formats
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-gray max-w-none">
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>Step 1: Create an account / login into EMBCART using your mobile number.</p>
                <p>Step 2: Select designs from a wide range of categories.</p>
                <p>Step 3: Click on the “Buy Now” button.</p>
                <p>Step 4: Pay using Debit/Credit Card, UPI, or PayPal.</p>
                <p>Step 5: After successful payment, you will receive a download link. Click it to download the design.</p>
                <p>Step 6: The downloaded file will be a ZIP file. Right-click and choose “Extract Here” to get all formats.</p>
                <p>Step 7: Copy the required file format to your USB (Pen Drive) and insert it into your machine.</p>
                <p>Step 8: Enjoy embroidery with EMBCART designs 🎉</p>
              </div>

            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Design Name</p>
                <p className="font-medium text-foreground">{design.name}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium text-foreground">{design.category}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Stitch Count</p>
                <p className="font-medium text-foreground">{design.stitches}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Number of Needle</p>
                <p className="font-medium text-foreground">{design.needle}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="row flex">
                  <p className="text-sm text-muted-foreground">Design Width</p>
                  <p className="text-[10px] font-medium text-muted-foreground ml-1">
                    (in mm)
                  </p>
                </div>

                <p className="font-medium text-foreground">{design.width.split(".")[0]}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="row flex">
                  <p className="text-sm text-muted-foreground">Design Height</p>
                  <p className="text-[10px] font-medium text-muted-foreground ml-1">
                    (in mm)
                  </p>
                </div>

                <p className="font-medium text-foreground">{design.height.split(".")[0]}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="offer" className="mt-6">
            <div className="space-y-4 text-muted-foreground">
              <h1 className="text-3xl font-bold text-primary mt-2 text-balance">Get this Design for as low as Rs.10</h1>
              <p>Purchase Power Pack Subscription Plan</p>
              <p>In which you can download 300 Designs</p>
              <p>@ Just Rs. 2999/- </p>
              <p>Validity 12 Months</p>
              <div className="row flex">
                <p className="text-primary">CLICK HERE </p>
                <p className="ml-1">to explore more plan.</p>

              </div>

            </div>
          </TabsContent>
          <TabsContent value="usage" className="mt-6">
            <div className="space-y-4 text-muted-foreground">
              <p>Step 1: Create Account/ Login into EMBCART using your Mobile Number</p>
              <p>Step 2: Select Designs from wide range of Category</p>
              <p>Step 3: Click on “Buy Now” Button</p>
              <p>Step 4: Pay with Debit/Credit Card, UPI, Paypal Options</p>
              <p>Step 5: After Successful payment you will get download link of design. Click on download link and your designs will download in your computer.</p>
              <p>Step 6: Downloaded file is ZIP file. Right click on ZIP file & click on “Extract Here” option. You will get all file formats.</p>
              <p>Step 7: Take appropriate file format into your USB Drive (PEN Drive). And insert in your machine</p>
              <p>Step 8: Enjoy Doing Embroidery with EMB CART Designs</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Designs */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8">Related Designs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {similerdesign.map((item) => (
            <Link
              key={item.id}
              href={`/designs/${item.id}`}
              className="group block overflow-hidden rounded-xl bg-card shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden">
                <SafeImage
                  src={item.image || "/images/images.png"}
                  alt={item.name}
                  className="object-contain object-center transition duration-300 group-hover:scale-105 bg-white/10"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-foreground group-hover:text-primary transition line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-primary font-semibold">{formatPrice(Number(item.price))}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
