"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { allDesigns } from "@/lib/designs-data"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ShoppingCart,
  Heart,
  Eye,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Check,
  Grid3X3,
  LayoutGrid,
} from "lucide-react"
import Loading from "./loading"
import { FreedesignItem, FreedesignResponse } from "@/models/Freedesign"
import router from "next/router"
import { SafeImage } from "@/components/imagehandel"
import { useAuth } from "@/lib/auth-context"
import WishlistButton from "@/components/WishlistButton"

const categories = [
  { value: "all", label: "All Categories" },
  { value: "floral", label: "Floral" },
  { value: "nature", label: "Nature" },
  { value: "birds", label: "Birds" },
  { value: "geometric", label: "Geometric" },
  { value: "borders", label: "Borders" },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
]

export default function DesignsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DesignsPageContent />
    </Suspense>
  )
}

function DesignsPageContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState("newest")
  const [gridCols, setGridCols] = useState<3 | 4>(3)

  const { addToCart, formatPrice } = useCart()

  const [design, setDesigns] = useState<FreedesignItem[]>([])

  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useAuth();
  const [addedItems, setAddedItems] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlistIds, setWishlistIds] = useState<number[]>([])

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function loadDesigns() {
      setLoading(true)
      const res = await fetch(`/api/freedesign?page=${page}&limit=${limit}`)
      const data: FreedesignResponse = await res.json()

      setDesigns(data.data || [])
      setTotalPages(data.pages || 1)
      setLoading(false)
    }

    loadDesigns()
  }, [page, limit])

  /* ============ RESET PAGE ON FILTER CHANGE ============ */
  useEffect(() => {
    setPage(1)
  }, [searchQuery, selectedCategory, sortBy])

  /* ================= FILTER + SORT ================= */
  const filteredDesigns = useMemo(() => {
    let designs = [...design]

    if (searchQuery) {
      designs = designs.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      designs = designs.filter(
        (d) => d.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    switch (sortBy) {
      case "price-low":
        designs.sort((a, b) => Number(a.price) - Number(b.price))
        break
      case "price-high":
        designs.sort((a, b) => Number(b.price) - Number(a.price))
        break
      case "name":
        designs.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        designs.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
    }

    return designs
  }, [design, searchQuery, selectedCategory, sortBy])
  const getPagination = () => {
    const pages: (number | "...")[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    pages.push(1)

    if (page > 3) pages.push("...")

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (page < totalPages - 2) pages.push("...")

    pages.push(totalPages)

    return pages
  }
  // 🔹 Fetch wishlist (MUST be before any return)
  useEffect(() => {
    fetch(`/api/wishlist/get?user_id=${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        const ids = data.products.map((item: any) => item.id)
        setWishlistIds(ids)
      })
      .catch(() => { })
  }, [user?.id])

  const handleAddToCart = (design: FreedesignItem) => {
    addToCart(design)

    setAddedItems((prev) => [...prev, design.id])
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((id) => id !== design.id))
    }, 2000)
  }

  const toggleWishlist = async (designId: number) => {
    const isWishlisted = wishlistIds.includes(designId)

    await fetch(`/api/wishlist/${isWishlisted ? "delete" : "add"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user?.id,
        product_id: designId,
      }),
    })

    setWishlistIds((prev) =>
      isWishlisted
        ? prev.filter((id) => id !== designId)
        : [...prev, designId]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Embroidery Designs</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Embroidery Designs
        </h1>
        <p className="text-muted-foreground">
          Browse our collection of {filteredDesigns.length}+ premium embroidery designs
        </p>
      </div>

      {/* GRID */}
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={`grid gap-6 sm:grid-cols-2 ${gridCols === 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
              {filteredDesigns.map((design) => (
                <Link
                  key={design.id}
                  href={`/designs/${design.id}`}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <SafeImage
                      src={design.image || "/images/images.png"}
                      alt={design.name}
                      className="object-contain object-center transition duration-300 group-hover:scale-105 "
                    />


                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-col gap-1">
                      {design.created_at &&
                        new Date(design.created_at).toDateString() ===
                        new Date().toDateString() && (
                          <Badge className="bg-accent text-accent-foreground">
                            New
                          </Badge>
                        )}
                      {/* {design.isSale && (
                    <Badge className="bg-destructive text-white">
                      Sale
                    </Badge>
                  )} */}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
                      <WishlistButton
                        productId={design.id}
                        user_id={Number(user?.id)}
                        wishlistIds={wishlistIds}
                        onToggle={toggleWishlist}
                      />

                      <button
                        type="button"
                        aria-label="Quick view"
                        className="rounded-full bg-card p-2 text-foreground shadow-md transition hover:bg-primary hover:text-primary-foreground"
                        onClick={(e) => {
                          e.preventDefault()
                          router.push(`/designs/${design.id}`)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="absolute inset-x-0 bottom-[72px] translate-y-full bg-white p-3 transition duration-300 group-hover:translate-y-0">
                    <Button
                      className="w-full bg-primary/30 text-foreground hover:bg-primary/90 hover:text-white"
                      disabled={addedItems.includes(design.id)}
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(design)
                      }}
                    >
                      {addedItems.includes(design.id) ? (
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
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <span className="mb-1 block text-xs font-medium text-muted-foreground">
                      {design.category}
                    </span>
                    <h3 className="mb-2 font-semibold text-foreground transition group-hover:text-primary overflow-hidden text-ellipsis"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {design.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(Number(design.price))}
                      </span>
                      {Number(design.price) && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(Number(design.price) * 1.5)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex items-center justify-center gap-2 mt-10">
              {getPagination().map((item, index) =>
                item === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="px-3 py-2 text-sm text-muted-foreground"
                  >
                    ...
                  </span>
                ) : (
                  <Button
                    key={item}
                    variant={item === page ? "default" : "outline"}
                    className="h-9 w-9 p-0 hover:text-white"
                    onClick={() => setPage(item)}
                    disabled={item === page}
                  >
                    {item}
                  </Button>
                )
              )}
            </div>

          </>
        )}
      </div>
    </div>
  )
}
