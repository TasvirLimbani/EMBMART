// "use client"

// import { useEffect, useRef, useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import { FreedesignItem } from "@/models/Freedesign"

// export default function PaymentSuccessPage() {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const sessionId = searchParams.get("session_id")
//     const { user } = useAuth()
//     const [design, setDesign] = useState<FreedesignItem | null>(null)

//     const hasRun = useRef(false) // 🔒 prevents duplicate execution

//     useEffect(() => {
//         if (!sessionId || !user?.id) return
//         if (hasRun.current) return
//         hasRun.current = true

//         const storedItems = localStorage.getItem("checkout_items")

//         if (!storedItems) {
//             console.warn("Checkout items missing — likely page refresh")
//             router.replace("/downloads")
//             return
//         }

//         const items = JSON.parse(storedItems)

//         const saveOrder = async () => {
//             try {
//                 for (const item of items) {
//                     // Save order
//                     await fetch("http://embmart.soon.it/product/addorder.php", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({
//                             user_id: user.id,
//                             product_id: item.id,
//                             product_name: item.name,
//                             product_category: item.category,
//                             product_image: item.image || item.images?.[0] || "",
//                             quantity: item.quantity,
//                             session_id: sessionId,
//                         }),
//                     })

//                     // Add download record
//                     await fetch("http://embmart.soon.it/product/adddownload.php", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({
//                             user_id: user.id,
//                             product_id: item.id,
//                             product_name: item.name,
//                             product_category: item.category,
//                             product_image: item.image || item.images?.[0] || "",
//                         }),
//                     })

//                     // Get product detail
//                     const res = await fetch(`/api/detail?id=${item.id}`)
//                     const data: FreedesignItem = await res.json()

//                     // Download the file directly from API response
//                     if (data?.design_file) {
//                         const response = await fetch(`/api/download?file=${data.design_file.trim()}`)
//                         const blob = await response.blob()

//                         const url = window.URL.createObjectURL(blob)
//                         const a = document.createElement("a")
//                         a.href = url
//                         a.download = `${data.name}.${data.design_file.split(".").pop() || "EMB"}`
//                         document.body.appendChild(a)
//                         a.click()
//                         document.body.removeChild(a)
//                         window.URL.revokeObjectURL(url)
//                     }
//                 }

//                 // Cleanup
//                 localStorage.removeItem("checkout_items")
//                 router.replace("/downloads")
//             } catch (err) {
//                 console.error("Order save failed", err)
//             }
//         }

//         saveOrder()
//     }, [sessionId, user?.id, router])



//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <p className="text-lg font-medium">Finalizing your order...</p>
//         </div>
//     )
// }





// "use client"

// import { useEffect, useRef } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import { FreedesignItem } from "@/models/Freedesign"
// import ProductDetailsPage from "../designs/[id]/page"

// export default function PaymentSuccessPage() {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const sessionId = searchParams.get("session_id")
//     const { user } = useAuth()
//     const hasRun = useRef(false)

//     useEffect(() => {
//         if (!sessionId || !user?.id) return
//         if (hasRun.current) return
//         hasRun.current = true

//         const storedItems = localStorage.getItem("checkout_items")
//         if (!storedItems) {
//             router.replace("/downloads")
//             return
//         }

//         const items = JSON.parse(storedItems)

//         const saveOrderAndSendInvoice = async () => {
//             try {
//                 const invoiceItems: any[] = []

//                 // 1️⃣ Save each order, add download, and prepare invoice items
//                 for (const item of items) {
//                     invoiceItems.push({
//                         desc: item.name,
//                         price: Number(item.price || 0),
//                         qty: Number(item.quantity || 1),
//                     })

//                     // Save order
//                     await fetch("http://embmart.soon.it/product/addorder.php", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({
//                             user_id: user.id,
//                             product_id: item.id,
//                             product_name: item.name,
//                             product_category: item.category,
//                             product_image: item.image || item.images?.[0] || "",
//                             quantity: item.quantity,
//                             session_id: sessionId,
//                         }),
//                     })

//                     // Add download
//                     await fetch("http://embmart.soon.it/product/adddownload.php", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({
//                             user_id: user.id,
//                             product_id: item.id,
//                             product_name: item.name,
//                             product_category: item.category,
//                             product_image: item.image || item.images?.[0] || "",
//                         }),
//                     })

//                     // Auto file download
//                     const res = await fetch(`/api/detail?id=${item.id}`)
//                     const data: FreedesignItem = await res.json()
//                     if (data?.design_file) {
//                         const response = await fetch(`/api/download?file=${data.design_file.trim()}`)
//                         const blob = await response.blob()
//                         const url = window.URL.createObjectURL(blob)
//                         const a = document.createElement("a")
//                         a.href = url
//                         a.download = `${data.name}.${data.design_file.split(".").pop() || "EMB"}`
//                         document.body.appendChild(a)
//                         a.click()
//                         document.body.removeChild(a)
//                         window.URL.revokeObjectURL(url)
//                     }
//                 }

//                 // 2️⃣ Call PHP API to create invoice and send email automatically
//                 fetch("api/invoice", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Accept": "application/json"
//                     },
//                     body: JSON.stringify({
//                         "invoice_no": "INV" + Date.now(), // Simple invoice number generation
//                         "order_id": "21", // You can implement this function to generate unique order IDs
//                         "user_id": user.id,
//                         "customer": user.firstname,
//                         "email": user.email,
//                         "address": "Surat",
//                         "account": sessionId,
//                         "due_date": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Due in 7 days
//                         "currency": "₹",

//                         "items": [
//                             { "desc": "Item 1", "price": 100, "qty": 1 },
//                             { "desc": "Item 2", "price": 300, "qty": 1 }
//                         ]
//                     })
//                 })
//                     .then(res => localStorage.removeItem("checkout_items")
//                     )
//                     .then(data => console.log(data))
//                     .catch(err => console.error(err));




//                 // 3️⃣ Cleanup
//                 localStorage.removeItem("checkout_items")
//                 router.replace("/downloads")

//             } catch (err) {
//                 console.error("Payment success handling failed:", err)
//             }
//         }

//         saveOrderAndSendInvoice()
//     }, [sessionId, user?.id, router])

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <p className="text-lg font-medium">Finalizing your order & sending invoice...</p>
//         </div>
//     )
// }





"use client"

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context" // ✅ added for clearing cart
import { FreedesignItem } from "@/models/Freedesign"
import ProductDetailsPage from "../designs/[id]/page"

export default function PaymentSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const { user } = useAuth()
    const { clearCart } = useCart() // ✅ get clearCart function from context
    const hasRun = useRef(false)

    useEffect(() => {
        if (!sessionId || !user?.id) return
        if (hasRun.current) return
        hasRun.current = true

        const storedItems = localStorage.getItem("checkout_items")
        if (!storedItems) {
            router.replace("/downloads")
            return
        }

        const items = JSON.parse(storedItems)

        const saveOrderAndSendInvoice = async () => {
            try {
                const invoiceItems: any[] = []

                // 1️⃣ Save each order, add download, and prepare invoice items
                for (const item of items) {
                    invoiceItems.push({
                        desc: item.name,
                        price: Number(item.price || 0),
                        qty: Number(item.quantity || 1),
                    })

                    // Save order
                    await fetch("/api/order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: user.id,
                            product_id: item.id,
                            product_name: item.name,
                            product_category: item.category,
                            product_image: item.image || item.images?.[0] || "",
                            quantity: item.quantity,
                            session_id: sessionId,
                        }),
                    })

                    // Add download
                    await fetch("/api/downloadss", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: user.id,
                            product_id: item.id,
                            product_name: item.name,
                            product_category: item.category,
                            product_image: item.image || item.images?.[0] || "",
                        }),
                    })

                    // Auto file download
                    const res = await fetch(`/api/detail?id=${item.id}`)
                    const data: FreedesignItem = await res.json()
                    if (data?.design_file) {
                        const response = await fetch(`/api/download?file=${data.design_file.trim()}`)
                        const blob = await response.blob()
                        const url = window.URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = `${data.name}.${data.design_file.split(".").pop() || "EMB"}`
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        window.URL.revokeObjectURL(url)
                    }
                }

                // 2️⃣ Call PHP API to create invoice and send email automatically
                fetch("api/invoice", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "invoice_no": "INV" + Date.now(),
                        "order_id": "21",
                        "user_id": user.id,
                        "customer": user.firstname,
                        "email": user.email,
                        "address": "Surat",
                        "account": sessionId,
                        "due_date": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                        "currency": "₹",
                        "items": [
                            { "desc": "Item 1", "price": 100, "qty": 1 },
                            { "desc": "Item 2", "price": 300, "qty": 1 }
                        ]
                    })
                })
                    .then(res => localStorage.removeItem("checkout_items"))
                    .then(data => console.log(data))
                    .catch(err => console.error(err));

                // 3️⃣ Cleanup
                localStorage.removeItem("checkout_items")
                clearCart() // ✅ clear the main cart after successful payment
                router.replace("/downloads")

            } catch (err) {
                console.error("Payment success handling failed:", err)
            }
        }

        saveOrderAndSendInvoice()
    }, [sessionId, user?.id, router, clearCart])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg font-medium">Finalizing your order & sending invoice...</p>
        </div>
    )
}
