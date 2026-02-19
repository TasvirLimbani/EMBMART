// import React from "react"
// import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
// import { CartProvider } from "@/lib/cart-context"
// import { AuthProvider } from "@/lib/auth-context"
// import { AuthModal } from "@/components/auth-modal"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import './globals.css'

// const _geist = Geist({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'EmbMart - Premium Embroidery Designs Marketplace',
//   description: 'Browse and download high-quality embroidery designs for all machine types. Instant downloads, professional patterns for Small Machines, Multi-Needle, Cording, Sequins & more.',
//   generator: 'Radhe Software Solutions',
//   icons: {
//     icon: [
//       {
//         url: '/favicon.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/favicon.png',
//         media: '(prefers-color-scheme: dark)',
//       },

//     ],
//     apple: '/favicon.png',
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={`font-sans antialiased`}>
//         <AuthProvider>
//           <CartProvider>
//             <Header />
//             {children}
//             <Footer />
//             <AuthModal />
//           </CartProvider>
//         </AuthProvider>

//         <Analytics />
//       </body>
//     </html>
//   )
// }





import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import DevToolsBlocker from "./DevToolsBlocker"   // ✅ ADDED
import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'EmbMart - Premium Embroidery Designs Marketplace',
  description: 'Browse and download high-quality embroidery designs for all machine types. Instant downloads, professional patterns for Small Machines, Multi-Needle, Cording, Sequins & more.',
  generator: 'Radhe Software Solutions',
  icons: {
    icon: [
      { url: '/favicon.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">

        {/* ✅ INSPECT BLOCKER */}
        <DevToolsBlocker />

        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <AuthModal />
          </CartProvider>
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  )
}
