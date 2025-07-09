"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "#benefits", label: "Benefits" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#integrations", label: "Docs" },
]

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Go to ${label} section`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/login" aria-label="Login">Login</Link>
          </Button>
           <Button asChild>
            <Link href="/signup" aria-label="Sign Up">Sign Up</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-background/80 backdrop-blur-lg md:hidden">
            <div className="container flex flex-col items-center justify-center h-full gap-8">
                {navLinks.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className="text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label={`Go to ${label} section`}
                >
                    {label}
                </Link>
                ))}
                <div className="flex flex-col w-full max-w-xs gap-4">
                  <Button asChild size="lg" variant="outline">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)} aria-label="Login">Login</Link>
                  </Button>
                  <Button asChild size="lg">
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)} aria-label="Sign Up">Sign Up</Link>
                  </Button>
                </div>
            </div>
        </div>
      )}
    </header>
  )
}
