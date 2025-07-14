"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  // Don't show header/footer for retailer, driver, or other dashboard pages
  const isDashboardPage =
    pathname?.startsWith("/retailer") || pathname?.startsWith("/driver") || pathname?.startsWith("/dashboard")

  if (isDashboardPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
