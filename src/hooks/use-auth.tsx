"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  fullName: string
  email: string
  role: "customer" | "retailer" | "driver"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      // Check if response is ok and has content
      if (!response.ok) {
        let errorMessage = "Login failed"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (jsonError) {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
        return false
      }

      // Check if response has content before parsing JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid response from server",
        })
        return false
      }

      const data = await response.json()

      if (data.user) {
        setUser(data.user)
        toast({
          title: "Success",
          description: "Logged in successfully!",
        })

        // Redirect based on role
        switch (data.user.role) {
          case "customer":
            router.push("/dashboard")
            break
          case "retailer":
            router.push("/retailer")
            break
          case "driver":
            router.push("/driver")
            break
          default:
            router.push("/dashboard")
        }

        return true
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid response from server",
        })
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Network error. Please check your connection and try again.",
      })
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      setUser(null)
      toast({
        title: "Success",
        description: "Logged out successfully",
      })

      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      // Still clear user state even if logout request fails
      setUser(null)
      router.push("/")
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during logout, but you have been logged out locally",
      })
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
