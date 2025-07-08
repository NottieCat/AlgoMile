"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type UserRole = "customer" | "driver" | "retailer" | null

const roleDetails = {
    customer: {
        title: "Welcome, Customer!",
        description: "Manage your shipments, track deliveries, and analyze performance.",
        quickLinks: [
            { href: "/dashboard/customer/orders", label: "View Orders" },
            { href: "/dashboard/customer/map", label: "Live Map" },
        ]
    },
    driver: {
        title: "Welcome, Driver!",
        description: "Find new jobs, view your route for the day, and track your earnings.",
        quickLinks: [
            { href: "/dashboard/driver/route", label: "Today's Route" },
            { href: "/dashboard/driver/earnings", label: "Check Earnings" },
        ]
    },
    retailer: {
        title: "Welcome, Retailer!",
        description: "Manage bulk orders, sync your inventory, and view performance KPIs.",
        quickLinks: [
            { href: "/dashboard/retailer/shipments", label: "Manage Shipments" },
            { href: "/dashboard/retailer/inventory", label: "Sync Inventory" },
        ]
    },
}

export default function DashboardPage() {
    const router = useRouter()
    const [userRole, setUserRole] = React.useState<UserRole>(null)

    React.useEffect(() => {
        const storedRole = localStorage.getItem("userRole") as UserRole
        if (storedRole) {
            setUserRole(storedRole)
        } else {
            router.push('/login')
        }
    }, [router])

    if (!userRole) {
        return <div>Loading...</div>
    }

    const details = roleDetails[userRole];

    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight font-headline">{details.title}</h1>
                <p className="text-muted-foreground">{details.description}</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Get started with your most common tasks.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    {details.quickLinks.map(link => (
                        <Button asChild key={link.href} variant="outline" className="justify-between h-12">
                            <Link href={link.href}>
                                {link.label}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
