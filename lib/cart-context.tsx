// "use client"

// import { FreedesignItem } from "@/models/Freedesign"
// import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

// export interface Design {
//   id: number
//   name: string
//   price: number
//   originalPrice?: number
//   image: string
//   images: [string]
//   category: string
//   isNew?: boolean
//   isSale?: boolean
// }

// export interface CartItem extends Design {
//   quantity: number
// }

// interface CartContextType {
//   items: CartItem[]
//   currency: string
//   setCurrency: (currency: string) => void
//   addToCart: (design: FreedesignItem) => void
//   removeFromCart: (id: number) => void
//   updateQuantity: (id: number, quantity: number) => void
//   clearCart: () => void
//   totalItems: number
//   totalPrice: number
//   formatPrice: (price: number) => string
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// const currencyRates: Record<string, { symbol: string; rate: number }> = {
//   INR: { symbol: "₹", rate: 1 },      // ✅ base currency
//   USD: { symbol: "$", rate: 1 / 83.12 },
//   EUR: { symbol: "€", rate: 1 / 90.3 },
//   GBP: { symbol: "£", rate: 1 / 105.4 },
// }


// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([])
//   const [currency, setCurrency] = useState("INR")

//   const addToCart = useCallback((design: FreedesignItem) => {
//     setItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === design.id)

//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === design.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       }

//       const cartItem: CartItem = {
//         id: design.id,
//         name: design.name,
//         price: Number(design.price), // ✅ convert string → number
//         image: design.image,
//         images: design.images,
//         category: design.category,
//         quantity: 1,
//       }

//       return [...prevItems, cartItem]
//     })
//   }, [])


//   const removeFromCart = useCallback((id: number) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id))
//   }, [])

//   const updateQuantity = useCallback((id: number, quantity: number) => {
//     if (quantity < 1) {
//       removeFromCart(id)
//       return
//     }
//     setItems((prevItems) =>
//       prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
//     )
//   }, [removeFromCart])

//   const clearCart = useCallback(() => {
//     setItems([])
//   }, [])

//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

//   const formatPrice = useCallback((price: number) => {
//     const { symbol, rate } = currencyRates[currency] || currencyRates.USD
//     const convertedPrice = price * rate
//     return `${symbol}${convertedPrice.toFixed(2)}`
//   }, [currency])

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         currency,
//         setCurrency,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         totalPrice,
//         formatPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }







// "use client"

// import { FreedesignItem } from "@/models/Freedesign"
// import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
// import { useAuth } from "@/lib/auth-context" // ✅ import Auth

// export interface Design {
//   id: number
//   name: string
//   price: number
//   originalPrice?: number
//   image: string
//   images: [string]
//   category: string
//   isNew?: boolean
//   isSale?: boolean
//   design_file?: string
// }

// export interface CartItem extends Design {
//   quantity: number
// }

// interface CartContextType {
//   items: CartItem[]
//   currency: string
//   setCurrency: (currency: string) => void
//   addToCart: (design: FreedesignItem) => void
//   removeFromCart: (id: number) => void
//   updateQuantity: (id: number, quantity: number) => void
//   clearCart: () => void
//   totalItems: number
//   totalPrice: number
//   formatPrice: (price: number) => string
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// const currencyRates: Record<string, { symbol: string; rate: number }> = {
//   INR: { symbol: "₹", rate: 1 },
//   USD: { symbol: "$", rate: 1 / 83.12 },
//   EUR: { symbol: "€", rate: 1 / 90.3 },
//   GBP: { symbol: "£", rate: 1 / 105.4 },
// }

// export function CartProvider({ children }: { children: ReactNode }) {
//   const { user, isReady } = useAuth() // ✅ get current user
//   const [items, setItems] = useState<CartItem[]>([])
//   const [currency, setCurrency] = useState("INR")
//   const [hydrated, setHydrated] = useState(false)

//   // ✅ per-user storage key
//   const getStorageKey = () => {
//     if (!user) return null
//     return `cart_${user.id}`
//   }

//   // ✅ load cart for current user
//   useEffect(() => {
//     if (!isReady || !user) {
//       setItems([])
//       setHydrated(true)
//       return
//     }
//     const key = getStorageKey()
//     const stored = key ? localStorage.getItem(key) : null
//     setItems(stored ? JSON.parse(stored) : [])
//     setHydrated(true)
//   }, [isReady, user])

//   // ✅ save cart whenever it changes
//   useEffect(() => {
//     const key = getStorageKey()
//     if (!key || !hydrated) return
//     localStorage.setItem(key, JSON.stringify(items))
//   }, [items, hydrated, user])

//   const addToCart = useCallback((design: FreedesignItem) => {
//     setItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === design.id)
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === design.id ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       }
//       return [
//         ...prevItems,
//         {
//           id: design.id,
//           name: design.name,
//           price: Number(design.price),
//           image: design.image,
//           images: design.images,
//           category: design.category,
//           quantity: 1,
//         },
//       ]
//     })
//   }, [])

//   const removeFromCart = useCallback((id: number) => {
//     setItems(prevItems => prevItems.filter(item => item.id !== id))
//   }, [])

//   const updateQuantity = useCallback(
//     (id: number, quantity: number) => {
//       if (quantity < 1) {
//         removeFromCart(id)
//         return
//       }
//       setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, quantity } : item)))
//     },
//     [removeFromCart]
//   )

//   const clearCart = useCallback(() => {
//     const key = getStorageKey()
//     if (key) localStorage.removeItem(key) // ✅ clear per-user cart
//     setItems([])
//   }, [user])

//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

//   const formatPrice = useCallback(
//     (price: number) => {
//       const { symbol, rate } = currencyRates[currency] || currencyRates.USD
//       const convertedPrice = price * rate
//       return `${symbol}${convertedPrice.toFixed(2)}`
//     },
//     [currency]
//   )

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         currency,
//         setCurrency,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         totalPrice,
//         formatPrice,
//       }}
//     >
//       {hydrated && children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (!context) throw new Error("useCart must be used within a CartProvider")
//   return context
// }










"use client"

import { FreedesignItem } from "@/models/Freedesign"
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useAuth } from "@/lib/auth-context" // ✅ import Auth

export interface Design {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images: [string]
  category: string
  isNew?: boolean
  isSale?: boolean
  design_file?: string
}

export interface CartItem extends Design {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  currency: string
  setCurrency: (currency: string) => void
  addToCart: (design: FreedesignItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  formatPrice: (price: number) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const currencyRates: Record<string, { symbol: string; rate: number }> = {
  INR: { symbol: "₹", rate: 1 },
  USD: { symbol: "$", rate: 1 / 83.12 },
  EUR: { symbol: "€", rate: 1 / 90.3 },
  GBP: { symbol: "£", rate: 1 / 105.4 },
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth() // ✅ get current user
  const [items, setItems] = useState<CartItem[]>([])
  const [currency, setCurrency] = useState("INR")
  const [hydrated, setHydrated] = useState(false)

  // ✅ per-user storage key
  const getStorageKey = () => {
    if (!user) return null
    return `cart_${user.id}`
  }

  // ✅ load cart for current user
  useEffect(() => {
    if (!isReady || !user) {
      setItems([])
      setHydrated(true)
      return
    }
    const key = getStorageKey()
    const stored = key ? localStorage.getItem(key) : null
    setItems(stored ? JSON.parse(stored) : [])
    setHydrated(true)
  }, [isReady, user])

  // ✅ save cart whenever it changes
  useEffect(() => {
    const key = getStorageKey()
    if (!key || !hydrated) return
    localStorage.setItem(key, JSON.stringify(items))
  }, [items, hydrated, user])

  const addToCart = useCallback((design: FreedesignItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === design.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === design.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [
        ...prevItems,
        {
          id: design.id,
          name: design.name,
          price: Number(design.price),
          image: design.image,
          images: design.images,
          category: design.category,
          quantity: 1,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(id)
        return
      }
      setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, quantity } : item)))
    },
    [removeFromCart]
  )

  const clearCart = useCallback(() => {
    const key = getStorageKey()
    if (key) localStorage.removeItem(key) // ✅ clear per-user cart
    setItems([])
  }, [user])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0) // ✅ fixed

  const formatPrice = useCallback(
    (price: number) => {
      const { symbol, rate } = currencyRates[currency] || currencyRates.USD
      const convertedPrice = price * rate
      return `${symbol}${convertedPrice.toFixed(2)}`
    },
    [currency]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        currency,
        setCurrency,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        formatPrice,
      }}
    >
      {hydrated && children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
