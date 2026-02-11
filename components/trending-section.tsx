// "use client"

// import { useEffect, useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Eye, ShoppingCart, Heart, Check } from "lucide-react"
// import { useCart } from "@/lib/cart-context"
// import { FreedesignItem } from "@/models/Freedesign"
// import { SafeImage } from "./imagehandel"

// const IMAGE_BASE = "http://embmart.soon.it/"

// // type Design = {
// //   id: number
// //   name: string
// //   category: string
// //   price: string
// //   image: string
// //   freedesign: boolean
// //   created_at: string
// // }

// export function TrendingSection() {
//   const router = useRouter()
//   const { addToCart, formatPrice } = useCart()

//   // const [designs, setDesigns] = useState<Design[]>([])
//   const [designs, setDesigns] = useState<FreedesignItem[]>([])

//   const [addedItems, setAddedItems] = useState<number[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchTrending = async () => {
//       try {
//         const res = await fetch("/api/trending")
//         const data = await res.json()

//         if (data.status) {
//           setDesigns(data.products)
//         }
//       } catch (err) {
//         console.error("Trending fetch error", err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTrending()
//   }, [])

//   // const handleAddToCart = (design: FreedesignItem) => {
//   //   addToCart(
//   //     design
//   //   )

//   //   setAddedItems((prev) => [...prev, design.id])
//   //   setTimeout(() => {
//   //     setAddedItems((prev) => prev.filter((id) => id !== design.id))
//   //   }, 2000)
//   // }


//   const handleAddToCart = (design: FreedesignItem) => {
//     addToCart(design)

//     setAddedItems((prev) => [...prev, design.id])
//     setTimeout(() => {
//       setAddedItems((prev) => prev.filter((id) => id !== design.id))
//     }, 2000)
//   }


//   if (loading) {
//     return <div className="py-20 text-center">Loading trending designs...</div>
//   }

//   return (
//     <section className="py-16 md:py-24 bg-muted/50">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
//           <div>
//             <h2 className="mb-2 text-3xl font-bold md:text-4xl">
//               Top Trendy Design Collection
//             </h2>
//             <p className="text-muted-foreground">
//               Our most popular designs loved by customers worldwide
//             </p>
//           </div>

//           <Link href="/designs">
//             <Button variant="outline">View All Designs</Button>
//           </Link>
//         </div>

//         {/* Grid */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {designs.map((design) => {
//             const isNew =
//               new Date(design.created_at) >
//               new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

//             return (
//               <Link
//                 key={design.id}
//                 href={`/designs/${design.id}`}
//                 className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition hover:shadow-lg"
//               >
//                 {/* Image */}
//                 <div className="relative aspect-square overflow-hidden">
//                   <SafeImage
//                     src={design.image || "/images/images.png"}
//                     alt={design.name}
//                     className="object-contain object-center transition duration-300 group-hover:scale-105 "
//                   />


//                   {/* Badges */}
//                   <div className="absolute left-3 top-3 flex flex-col gap-1">
//                     {design.created_at &&
//                       new Date(design.created_at).toDateString() ===
//                       new Date().toDateString() && (
//                         <Badge className="bg-accent text-accent-foreground">
//                           New
//                         </Badge>
//                       )}
//                     {/* {design.isSale && (
//                     <Badge className="bg-destructive text-white">
//                       Sale
//                     </Badge>
//                   )} */}
//                   </div>

//                   {/* Quick Actions */}
//                   <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
//                     <button
//                       type="button"
//                       aria-label="Add to wishlist"
//                       className="rounded-full bg-card p-2 text-foreground shadow-md transition hover:bg-primary hover:text-primary-foreground"
//                       onClick={(e) => e.preventDefault()}
//                     >
//                       <Heart className="h-4 w-4" />
//                     </button>

//                     <button
//                       type="button"
//                       aria-label="Quick view"
//                       className="rounded-full bg-card p-2 text-foreground shadow-md transition hover:bg-primary hover:text-primary-foreground"
//                       onClick={(e) => {
//                         e.preventDefault()
//                         router.push(`/designs/${design.id}`)
//                       }}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Add to Cart */}
//                 <div className="absolute inset-x-0 bottom-[72px] translate-y-full bg-white p-3 transition duration-300 group-hover:translate-y-0">
//                   <Button
//                     className="w-full bg-primary/30 text-foreground hover:bg-primary/90 hover:text-white"
//                     disabled={addedItems.includes(design.id)}
//                     onClick={(e) => {
//                       e.preventDefault()
//                       handleAddToCart(design)
//                     }}
//                   >
//                     {addedItems.includes(design.id) ? (
//                       <>
//                         <Check className="mr-2 h-4 w-4" />
//                         Added to Cart
//                       </>
//                     ) : (
//                       <>
//                         <ShoppingCart className="mr-2 h-4 w-4" />
//                         Add to Cart
//                       </>
//                     )}
//                   </Button>
//                 </div>

//                 {/* Info */}
//                 <div className="p-4">
//                   <span className="mb-1 block text-xs font-medium text-muted-foreground">
//                     {design.category}
//                   </span>
//                   <h3 className="mb-2 font-semibold text-foreground transition group-hover:text-primary overflow-hidden text-ellipsis"
//                     style={{
//                       display: '-webkit-box',
//                       WebkitLineClamp: 1,
//                       WebkitBoxOrient: 'vertical',
//                     }}
//                   >
//                     {design.name}
//                   </h3>

//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-bold text-primary">
//                       {formatPrice(Number(design.price))}
//                     </span>
//                     {Number(design.price) && (
//                       <span className="text-sm text-muted-foreground line-through">
//                         {formatPrice(Number(design.price) * 1.5)}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }




"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, ShoppingCart, Heart, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { FreedesignItem } from "@/models/Freedesign"
import { SafeImage } from "./imagehandel"
import WishlistButton from "./WishlistButton"

import { useAuth } from "@/lib/auth-context";

const IMAGE_BASE = "http://embmart.soon.it/"

export function TrendingSection() {
  const { user } = useAuth();

  const router = useRouter()
  const { addToCart, formatPrice } = useCart()

  const [designs, setDesigns] = useState<FreedesignItem[]>([])
  const [addedItems, setAddedItems] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlistIds, setWishlistIds] = useState<number[]>([])

  // 🔹 Fetch trending designs
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/trending")
        const data = await res.json()

        if (data.status) {
          setDesigns(data.products)
        }
      } catch (err) {
        console.error("Trending fetch error", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

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

  // ✅ SAFE: return AFTER all hooks
  if (loading) {
    return <div className="py-20 text-center">Loading trending designs...</div>
  }

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              Top Trendy Design Collection
            </h2>
            <p className="text-muted-foreground">
              Our most popular designs loved by customers worldwide
            </p>
          </div>

          <Link href="/designs">
            <Button variant="outline">View All Designs</Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {designs.map((design) => (
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
      </div>
    </section>
  )
}
