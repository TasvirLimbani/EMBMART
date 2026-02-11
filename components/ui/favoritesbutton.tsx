"use client"

import { Heart } from "lucide-react"
import { useState } from "react"

export default function AddToFavoriteButton({
  userId,
  productId,
}: {
  userId: number
  productId: number
}) {
  const [loading, setLoading] = useState(false)

  const addToFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loading) return

    try {
      setLoading(true)

      const res = await fetch(
        "https://embmart.soon.it/favorite/addfavorite.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            product_id: productId,
          }),
        }
      )

      const data = await res.json()

      if (data.success) {
        alert("Added to favorites ❤️")
      } else {
        alert(data.message || "Failed to add favorite")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      aria-label="Add to wishlist"
      onClick={addToFavorite}
      disabled={loading}
      className="rounded-full bg-card p-2 text-foreground shadow-md transition
                 hover:bg-primary hover:text-primary-foreground
                 disabled:opacity-50"
    >
      <Heart className="h-4 w-4" />
    </button>
  )
}
