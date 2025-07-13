"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddShipmentModal } from "@/components/retailer/add-shipment-modal"

// Mock shipment data
const mockShipments = [
  {
    id: "SH001",
    status: "delivered",
    origin: "New York, NY",
    destination: "Boston, MA",
    carrier: "FedEx",
    cost: 45.99,
    lastUpdated: "2024-01-15T10:30:00Z",
  },
  {
    id: "SH002",
    status: "in-transit",
    origin: "Los Angeles, CA",
    destination: "San Francisco, CA",
    carrier: "UPS",
    cost: 32.5,
    lastUpdated: "2024-01-15T09:15:00Z",
  },
  {
    id: "SH003",
    status: "pending",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    carrier: "DHL",
    cost: 28.75,
    lastUpdated: "2024-01-15T08:45:00Z",
  },
  {
    id: "SH004",
    status: "delivered",
    origin: "Miami, FL",
    destination: "Orlando, FL",
    carrier: "USPS",
    cost: 18.99,
    lastUpdated: "2024-01-14T16:20:00Z",
  },
  {
    id: "SH005",
    status: "cancelled",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    carrier: "FedEx",
    cost: 41.25,
    lastUpdated: "2024-01-14T14:10:00Z",
  },
]

const statusColors = {
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "in-transit": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredShipments = mockShipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
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
          <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
          <p className="text-muted-foreground">Manage and track all your shipments</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Shipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shipment Overview</CardTitle>
          <CardDescription>Track the status and details of all your shipments</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search shipments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[shipment.status as keyof typeof statusColors]}>
                        {shipment.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.carrier}</TableCell>
                    <TableCell>${shipment.cost.toFixed(2)}</TableCell>
                    <TableCell>{formatDate(shipment.lastUpdated)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredShipments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No shipments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddShipmentModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  )
}
