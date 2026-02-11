// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { useCart } from "@/lib/cart-context"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
// import { SafeImage } from "./imagehandel"

// export function CartSheet() {
//   const { items, totalItems, totalPrice, formatPrice, updateQuantity, removeFromCart } = useCart()

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-primary hover:text-white">
//           <ShoppingCart className="h-5 w-5" />
//           <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
//             {totalItems}
//           </span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-lg bg-card flex flex-col">
//         <SheetHeader>
//           <SheetTitle className="text-foreground">Shopping Cart ({totalItems} items)</SheetTitle>
//         </SheetHeader>

//         {items.length === 0 ? (
//           <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
//             <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
//             <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
//             <p className="text-muted-foreground mb-6">Browse our collection and add some designs!</p>
//             <SheetTrigger asChild>
//               <Button className="bg-primary text-primary-foreground">Continue Shopping</Button>
//             </SheetTrigger>
//           </div>
//         ) : (
//           <>
//             <div className="flex-1 overflow-y-auto py-4 space-y-4">
//               {items.map((item) => (
//                 <div key={item.id} className="flex gap-4 p-3 bg-background rounded-lg">
//                   <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
//                     <SafeImage
//                       src={item.image || item.images[0] || "/images/images.png"}
//                       alt={item.name}
//                       className="object-contain object-center transition duration-300 group-hover:scale-105 bg-white"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <Link href={`/designs/${item.id}`} className="font-medium text-foreground hover:text-primary line-clamp-1">
//                       {item.name}
//                     </Link>
//                     <p className="text-sm text-muted-foreground">{item.category}</p>
//                     <p className="font-semibold text-primary mt-1">{formatPrice(item.price)}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="h-7 w-7 flex items-center justify-center rounded border border-border text-foreground hover:bg-muted"
//                       >
//                         <Minus className="h-3 w-3" />
//                       </button>
//                       <span className="w-8 text-center text-foreground">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="h-7 w-7 flex items-center justify-center rounded border border-border text-foreground hover:bg-muted"
//                       >
//                         <Plus className="h-3 w-3" />
//                       </button>
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-auto h-7 w-7 flex items-center justify-center rounded text-destructive hover:bg-destructive/10"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-border pt-4 space-y-4 px-4 sm:px-6 lg:px-8 mb-5">
//               <div className="flex items-center justify-between text-lg font-semibold">
//                 <span className="text-foreground">Total</span>
//                 <span className="text-primary">{formatPrice(totalPrice)}</span>
//               </div>
//               <SheetTrigger asChild>
//                 <Link href="/checkout" className="block">
//                   <Button className="w-full bg-primary text-primary-foreground">
//                     Proceed to Checkout
//                   </Button>
//                 </Link>
//               </SheetTrigger>
//               <SheetTrigger asChild>
//                 <Button variant="outline" className="w-full border-border text-foreground bg-transparent hover:text-wite hover:bg-primary hover:text-primary-foreground">
//                   Continue Shopping
//                 </Button>
//               </SheetTrigger>
//             </div>
//           </>
//         )}
//       </SheetContent>
//     </Sheet>
//   )
// }











"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { SafeImage } from "./imagehandel" // make sure this exists

export function CartSheet() {
  const { items, totalItems, totalPrice, formatPrice, updateQuantity, removeFromCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-primary hover:text-white">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {totalItems}
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-card flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-foreground">Shopping Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Browse our collection and add some designs!</p>
            <SheetTrigger asChild>
              <Button className="bg-primary text-primary-foreground">Continue Shopping</Button>
            </SheetTrigger>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-3 bg-background rounded-lg">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <SafeImage
                      src={item.image || item.images?.[0] || "/images/images.png"}
                      alt={item.name}
                      className="object-contain object-center transition duration-300 group-hover:scale-105 bg-white"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/designs/${item.id}`} className="font-medium text-foreground hover:text-primary line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="font-semibold text-primary mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 flex items-center justify-center rounded border border-border text-foreground hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 flex items-center justify-center rounded border border-border text-foreground hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto h-7 w-7 flex items-center justify-center rounded text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4 px-4 sm:px-6 lg:px-8 mb-5">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <SheetTrigger asChild>
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-primary text-primary-foreground">Proceed to Checkout</Button>
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full border-border text-foreground bg-transparent hover:bg-primary hover:text-primary-foreground">
                  Continue Shopping
                </Button>
              </SheetTrigger>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
