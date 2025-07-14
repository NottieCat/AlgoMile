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
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='12' width='18' height='8' rx='1' stroke='%23007bff' strokeWidth='2' fill='%23007bff' fillOpacity='0.1'/%3E%3Crect x='2' y='8' width='8' height='4' rx='1' stroke='%23007bff' strokeWidth='2' fill='%23007bff' fillOpacity='0.1'/%3E%3Ccircle cx='7' cy='22' r='2.5' stroke='%23007bff' strokeWidth='2' fill='none'/%3E%3Ccircle cx='17' cy='22' r='2.5' stroke='%23007bff' strokeWidth='2' fill='none'/%3E%3Cpath d='M22 6C22 6 24 4 26 6C28 8 26 10 26 10L24 12L22 10C22 10 20 8 22 6Z' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' fill='%23007bff' fillOpacity='0.2'/%3E%3Ccircle cx='24' cy='16' r='1.5' fill='%23007bff'/%3E%3Ccircle cx='28' cy='20' r='1.5' fill='%23007bff'/%3E%3Ccircle cx='26' cy='24' r='1.5' fill='%23007bff'/%3E%3Cpath d='M24 12L24 16M24 16L28 20M28 20L26 24' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' strokeDasharray='2 2' opacity='0.7'/%3E%3Cpath d='M12 14L14 14M12 16L15 16M12 18L13 18' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' opacity='0.6'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
    shortcut:
      "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='12' width='18' height='8' rx='1' stroke='%23007bff' strokeWidth='2' fill='%23007bff' fillOpacity='0.1'/%3E%3Crect x='2' y='8' width='8' height='4' rx='1' stroke='%23007bff' strokeWidth='2' fill='%23007bff' fillOpacity='0.1'/%3E%3Ccircle cx='7' cy='22' r='2.5' stroke='%23007bff' strokeWidth='2' fill='none'/%3E%3Ccircle cx='17' cy='22' r='2.5' stroke='%23007bff' strokeWidth='2' fill='none'/%3E%3Cpath d='M22 6C22 6 24 4 26 6C28 8 26 10 26 10L24 12L22 10C22 10 20 8 22 6Z' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' fill='%23007bff' fillOpacity='0.2'/%3E%3Ccircle cx='24' cy='16' r='1.5' fill='%23007bff'/%3E%3Ccircle cx='28' cy='20' r='1.5' fill='%23007bff'/%3E%3Ccircle cx='26' cy='24' r='1.5' fill='%23007bff'/%3E%3Cpath d='M24 12L24 16M24 16L28 20M28 20L26 24' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' strokeDasharray='2 2' opacity='0.7'/%3E%3Cpath d='M12 14L14 14M12 16L15 16M12 18L13 18' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' opacity='0.6'/%3E%3C/svg%3E",
    apple:
      "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='12' width='18' height='8' rx='1' stroke='%23007bff' strokeWidth='2' fill='%23007bff' fillOpacity='0.1'/%3E%3Crect x='2' y='8' width='8' height='4' rx='1' stroke='%23007bff' strokeWidth='2' fill='%23007bff' fillOpacity='0.1'/%3E%3Ccircle cx='7' cy='22' r='2.5' stroke='%23007bff' strokeWidth='2' fill='none'/%3E%3Ccircle cx='17' cy='22' r='2.5' stroke='%23007bff' strokeWidth='2' fill='none'/%3E%3Cpath d='M22 6C22 6 24 4 26 6C28 8 26 10 26 10L24 12L22 10C22 10 20 8 22 6Z' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' fill='%23007bff' fillOpacity='0.2'/%3E%3Ccircle cx='24' cy='16' r='1.5' fill='%23007bff'/%3E%3Ccircle cx='28' cy='20' r='1.5' fill='%23007bff'/%3E%3Ccircle cx='26' cy='24' r='1.5' fill='%23007bff'/%3E%3Cpath d='M24 12L24 16M24 16L28 20M28 20L26 24' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' strokeDasharray='2 2' opacity='0.7'/%3E%3Cpath d='M12 14L14 14M12 16L15 16M12 18L13 18' stroke='%23007bff' strokeWidth='1.5' strokeLinecap='round' opacity='0.6'/%3E%3C/svg%3E",
  },
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
