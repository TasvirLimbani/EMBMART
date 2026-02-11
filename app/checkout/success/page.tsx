"use client"

import { useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    const saveOrder = async () => {
      for (const item of items) {
        await fetch("http://embmart.soon.it/product/addorder.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
          }),
        })

        await fetch("http://embmart.soon.it/product/adddownload.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: item.id,
            product_name: item.name,
          }),
        })
      }

      clearCart()
      router.push("/downloads")
    }

    saveOrder()
  }, [])

  return <p className="text-center mt-20">Finalizing your order...</p>
}
