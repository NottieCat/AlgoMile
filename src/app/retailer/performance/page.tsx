"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Calendar, TrendingUp, TrendingDown, Clock, DollarSign, CheckCircle } from "lucide-react"

// Mock performance data
const dailyData = [
  { date: "Mon", avgDeliveryTimeHrs: 24, totalCost: 1250, onTimePct: 85 },
  { date: "Tue", avgDeliveryTimeHrs: 22, totalCost: 1180, onTimePct: 88 },
  { date: "Wed", avgDeliveryTimeHrs: 26, totalCost: 1320, onTimePct: 82 },
  { date: "Thu", avgDeliveryTimeHrs: 20, totalCost: 1100, onTimePct: 92 },
  { date: "Fri", avgDeliveryTimeHrs: 28, totalCost: 1450, onTimePct: 78 },
  { date: "Sat", avgDeliveryTimeHrs: 18, totalCost: 980, onTimePct: 95 },
  { date: "Sun", avgDeliveryTimeHrs: 16, totalCost: 850, onTimePct: 97 },
]

const weeklyData = [
  { week: "Week 1", avgDeliveryTimeHrs: 23, totalCost: 8200, onTimePct: 87 },
  { week: "Week 2", avgDeliveryTimeHrs: 21, totalCost: 7800, onTimePct: 89 },
  { week: "Week 3", avgDeliveryTimeHrs: 25, totalCost: 8900, onTimePct: 84 },
  { week: "Week 4", avgDeliveryTimeHrs: 19, totalCost: 7200, onTimePct: 93 },
]

export default function PerformancePage() {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily")

  const currentData = viewMode === "daily" ? dailyData : weeklyData
  const xAxisKey = viewMode === "daily" ? "date" : "week"

  // Calculate summary metrics
  const avgDeliveryTime = currentData.reduce((sum, item) => sum + item.avgDeliveryTimeHrs, 0) / currentData.length
  const totalCost = currentData.reduce((sum, item) => sum + item.totalCost, 0)
  const avgOnTimePct = currentData.reduce((sum, item) => sum + item.onTimePct, 0) / currentData.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Metrics</h1>
          <p className="text-muted-foreground">Track delivery performance and operational efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant={viewMode === "daily" ? "default" : "outline"} onClick={() => setViewMode("daily")}>
            <Calendar className="mr-2 h-4 w-4" />
            Daily
          </Button>
          <Button variant={viewMode === "weekly" ? "default" : "outline"} onClick={() => setViewMode("weekly")}>
            <Calendar className="mr-2 h-4 w-4" />
            Weekly
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDeliveryTime.toFixed(1)}h</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">-2.3h from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">+5.2% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOnTimePct.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+3.1% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Average Delivery Time</CardTitle>
            <CardDescription>
              {viewMode === "daily" ? "Daily" : "Weekly"} average delivery time in hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value}h`, "Avg Delivery Time"]}
                  labelFormatter={(label) => `${viewMode === "daily" ? "Day" : "Period"}: ${label}`}
                />
                <Bar dataKey="avgDeliveryTimeHrs" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Cost</CardTitle>
            <CardDescription>{viewMode === "daily" ? "Daily" : "Weekly"} operational costs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Total Cost"]}
                  labelFormatter={(label) => `${viewMode === "daily" ? "Day" : "Period"}: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="totalCost"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>On-Time Delivery Percentage</CardTitle>
          <CardDescription>{viewMode === "daily" ? "Daily" : "Weekly"} on-time delivery performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "On-Time Delivery"]}
                labelFormatter={(label) => `${viewMode === "daily" ? "Day" : "Period"}: ${label}`}
              />
              <Bar dataKey="onTimePct" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
