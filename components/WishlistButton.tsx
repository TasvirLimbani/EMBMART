"use client"

import { Heart } from "lucide-react"

type Props = {
  productId: number
  user_id: number
  wishlistIds: number[]
  onToggle: (productId: number) => void
}

export default function WishlistButton({
  productId,
  wishlistIds,
  user_id,
  onToggle,
}: Props) {
  const isFavorite = wishlistIds.includes(productId)

  return (
    <button
      type="button"
      aria-label="Add to wishlist"
      className="rounded-full bg-card p-2 shadow-md transition hover:scale-105"
      onClick={(e) => {
        e.preventDefault()
        onToggle(productId)
      }}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          isFavorite
            ? "text-primary fill-primary"
            : "text-foreground"
        }`}
      />
    </button>
  )
}
