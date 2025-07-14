"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeliveryMap } from "@/components/map/delivery-map"
import { ShoppingCart, Package, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold font-headline">Welcome to your Dashboard!</h1>
        <p className="text-muted-foreground">Manage your orders and optimize deliveries with our AI-powered routing.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Map Section - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <DeliveryMap />
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Start your delivery journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/products">
                  <Package className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Clock className="mr-2 h-4 w-4" />
                Track Orders
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
              <CardDescription>Choose your optimization preference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Optimize for:</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Time
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Cost
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Our AI will optimize your delivery route based on real-time traffic, weather, and your preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Order #1234</span>
                  <span className="text-green-600">Delivered</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Order #1233</span>
                  <span className="text-blue-600">In Transit</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Order #1232</span>
                  <span className="text-yellow-600">Processing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
