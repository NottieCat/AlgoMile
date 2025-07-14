import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/hooks/use-cart"
import { AuthProvider } from "@/hooks/use-auth"
import { LayoutWrapper } from "@/components/layout/layout-wrapper"

export const metadata: Metadata = {
  title: "AlgoMile - Dynamic Routing that Cuts Time & Cost",
  description: "AI-powered dynamic vehicle routing for warehouse-to-customer delivery.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Source+Code+Pro:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </head>
      <body className={cn("font-body antialiased")}>
        <AuthProvider>
          <CartProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
