"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Logo } from "@/components/logo"
import Link from "next/link"

type UserRole = "customer" | "driver" | "retailer"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = React.useState<UserRole>("customer")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd handle JWTs here.
    // For this demo, we'll use localStorage to mock the session.
    localStorage.setItem("userRole", role)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-card p-4">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="ghost">← Back to Home</Button>
      </Link>
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
             <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Select your role to sign in to your portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <RadioGroup defaultValue={role} onValueChange={(value: UserRole) => setRole(value)} className="grid grid-cols-1 gap-4">
              <div>
                <RadioGroupItem value="customer" id="customer" className="peer sr-only" />
                <Label
                  htmlFor="customer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <h3 className="font-semibold">Customer</h3>
                  <p className="text-sm text-muted-foreground">Manage shipments</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="driver" id="driver" className="peer sr-only" />
                <Label
                  htmlFor="driver"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <h3 className="font-semibold">Driver</h3>
                  <p className="text-sm text-muted-foreground">Manage routes</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="retailer" id="retailer" className="peer sr-only" />
                <Label
                  htmlFor="retailer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <h3 className="font-semibold">Retailer</h3>
                  <p className="text-sm text-muted-foreground">Manage inventory</p>
                </Label>
              </div>
            </RadioGroup>
            <Button type="submit" className="w-full" aria-label={`Sign in as ${role}`}>
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
