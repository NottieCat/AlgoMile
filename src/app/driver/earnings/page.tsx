"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, Clock, MapPin, Download, Calendar } from "lucide-react"

// Mock earnings data
const dailyEarnings = [
  { date: "Mon", earnings: 127.5, hours: 6.5, trips: 8 },
  { date: "Tue", earnings: 145.25, hours: 7.2, trips: 9 },
  { date: "Wed", earnings: 98.75, hours: 5.5, trips: 6 },
  { date: "Thu", earnings: 156.0, hours: 8.0, trips: 10 },
  { date: "Fri", earnings: 189.5, hours: 8.5, trips: 12 },
  { date: "Sat", earnings: 203.25, hours: 9.0, trips: 13 },
  { date: "Sun", earnings: 134.75, hours: 6.8, trips: 8 },
]

const weeklyEarnings = [
  { week: "Week 1", earnings: 1054.5, hours: 51.5, trips: 66 },
  { week: "Week 2", earnings: 1189.25, hours: 56.2, trips: 72 },
  { week: "Week 3", earnings: 987.75, hours: 48.8, trips: 58 },
  { week: "Week 4", earnings: 1245.0, hours: 58.5, trips: 78 },
]

const earningsBreakdown = [
  { name: "Base Pay", value: 65, color: "#8884d8" },
  { name: "Tips", value: 20, color: "#82ca9d" },
  { name: "Bonuses", value: 10, color: "#ffc658" },
  { name: "Peak Hours", value: 5, color: "#ff7300" },
]

const recentTransactions = [
  {
    id: "TXN-001",
    date: "2024-01-15T14:30:00Z",
    type: "delivery",
    amount: 28.5,
    status: "completed",
    customer: "John D.",
    location: "Downtown",
  },
  {
    id: "TXN-002",
    date: "2024-01-15T13:15:00Z",
    type: "tip",
    amount: 5.0,
    status: "completed",
    customer: "Sarah M.",
    location: "Midtown",
  },
  {
    id: "TXN-003",
    date: "2024-01-15T12:00:00Z",
    type: "delivery",
    amount: 32.75,
    status: "completed",
    customer: "Mike R.",
    location: "North Side",
  },
  {
    id: "TXN-004",
    date: "2024-01-15T11:30:00Z",
    type: "bonus",
    amount: 15.0,
    status: "completed",
    customer: "Peak Hour Bonus",
    location: "City Center",
  },
  {
    id: "TXN-005",
    date: "2024-01-15T10:45:00Z",
    type: "delivery",
    amount: 24.25,
    status: "completed",
    customer: "Lisa K.",
    location: "West End",
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const typeColors = {
  delivery: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  tip: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  bonus: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}

export default function EarningsPage() {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily")

  const currentData = viewMode === "daily" ? dailyEarnings : weeklyEarnings
  const xAxisKey = viewMode === "daily" ? "date" : "week"

  // Calculate summary metrics
  const totalEarnings = currentData.reduce((sum, item) => sum + item.earnings, 0)
  const totalHours = currentData.reduce((sum, item) => sum + item.hours, 0)
  const totalTrips = currentData.reduce((sum, item) => sum + item.trips, 0)
  const avgHourlyRate = totalEarnings / totalHours

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
          <p className="text-muted-foreground">Track your income and payment history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from last {viewMode === "daily" ? "week" : "month"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hourly Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgHourlyRate)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span> from last {viewMode === "daily" ? "week" : "month"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-500">+3.1%</span> from last {viewMode === "daily" ? "week" : "month"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrips}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15.3%</span> from last {viewMode === "daily" ? "week" : "month"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Earnings Trend</h3>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("daily")}
              >
                Daily
              </Button>
              <Button
                variant={viewMode === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("weekly")}
              >
                Weekly
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Earnings</CardTitle>
                <CardDescription>{viewMode === "daily" ? "Daily" : "Weekly"} earnings overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value as number), "Earnings"]}
                      labelFormatter={(label) => `${viewMode === "daily" ? "Day" : "Period"}: ${label}`}
                    />
                    <Bar dataKey="earnings" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hours vs Trips</CardTitle>
                <CardDescription>{viewMode === "daily" ? "Daily" : "Weekly"} activity correlation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} name="Hours" />
                    <Line type="monotone" dataKey="trips" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Trips" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
                <CardDescription>Distribution of your income sources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={earningsBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {earningsBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average per Trip</span>
                  <span className="text-sm font-bold">{formatCurrency(totalEarnings / totalTrips)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Peak Hour Bonus</span>
                  <span className="text-sm font-bold">+25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Customer Rating</span>
                  <span className="text-sm font-bold">4.8 ⭐</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Acceptance Rate</span>
                  <span className="text-sm font-bold">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">On-Time Delivery</span>
                  <span className="text-sm font-bold">96%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest earnings and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Customer/Source</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={typeColors[transaction.type as keyof typeof typeColors]}
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{transaction.location}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={statusColors[transaction.status as keyof typeof statusColors]}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
