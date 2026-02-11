"use client"

import { useEffect, useState } from "react"

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<number[]>([])

  useEffect(() => {
    fetch("/api/wishlist/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setWishlistIds(data.products.map((p: any) => p.id))
        }
      })
  }, [])

  async function toggleWishlist(productId: number) {
    const isFav = wishlistIds.includes(productId)

    await fetch(isFav ? "/api/wishlist/delete" : "/api/wishlist/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId }),
    })

    setWishlistIds((prev) =>
      isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  return { wishlistIds, toggleWishlist }
}
