"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type UserRole = "customer" | "driver" | "retailer"

function getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') {
        return undefined;
    }
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return undefined;
}

const roleDetails = {
    customer: {
        title: "Welcome, Customer!",
        description: "Manage your shipments, track deliveries, and analyze performance.",
        quickLinks: [
            { href: "/dashboard/customer", label: "Start Shopping" },
            { href: "/dashboard/customer/orders", label: "View My Orders" },
        ]
    },
    driver: {
        title: "Welcome, Driver!",
        description: "Find new jobs, view your route for the day, and track your earnings.",
        quickLinks: [
            { href: "/dashboard/driver", label: "Go to Driver Dashboard" },
            { href: "/dashboard/driver/earnings", label: "Check Earnings" },
        ]
    },
    retailer: {
        title: "Welcome, Retailer!",
        description: "Manage bulk orders, sync your inventory, and view performance KPIs.",
        quickLinks: [
            { href: "/dashboard/retailer", label: "Go to Retailer Dashboard" },
            { href: "/dashboard/retailer/inventory", label: "Sync Inventory" },
        ]
    },
}

export default function DashboardPage() {
    // The layout already protects this route. We can read the cookie directly.
    // This avoids the "Loading..." flicker caused by useEffect and useState.
    const userRole = getCookie("userRole") as UserRole | undefined

    if (!userRole || !roleDetails[userRole]) {
        // This state should be brief, as the layout will redirect if the cookie is invalid.
        return <div>Loading dashboard...</div>
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
