import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { AuthProvider } from "@/components/auth-context"
import { CartProvider } from "@/components/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FlashNews from "@/components/flash-news"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Krishi Jyothi - Connecting Farmers and Consumers",
  description:
    "A platform that connects small-scale farmers directly with consumers across India, cutting out middlemen to ensure fair prices and promote sustainable agriculture.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <FlashNews />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
