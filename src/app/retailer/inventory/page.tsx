"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Search, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

// Mock inventory data
const mockInventory = [
  {
    sku: "PROD-001",
    name: "Wireless Headphones",
    onHand: 150,
    reserved: 25,
    available: 125,
    lastSynced: "2024-01-15T10:30:00Z",
    lowStock: false,
  },
  {
    sku: "PROD-002",
    name: "Smart Watch",
    onHand: 8,
    reserved: 3,
    available: 5,
    lastSynced: "2024-01-15T09:15:00Z",
    lowStock: true,
  },
  {
    sku: "PROD-003",
    name: "Coffee Beans",
    onHand: 200,
    reserved: 50,
    available: 150,
    lastSynced: "2024-01-15T08:45:00Z",
    lowStock: false,
  },
  {
    sku: "PROD-004",
    name: "Office Chair",
    onHand: 0,
    reserved: 0,
    available: 0,
    lastSynced: "2024-01-14T16:20:00Z",
    lowStock: true,
  },
  {
    sku: "PROD-005",
    name: "Phone Charger",
    onHand: 75,
    reserved: 15,
    available: 60,
    lastSynced: "2024-01-14T14:10:00Z",
    lowStock: false,
  },
]

// Mock user role - in real app this would come from auth context
const mockUser = {
  role: "admin", // or "user"
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const filteredInventory = mockInventory.filter(
    (item) =>
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSyncInventory = async () => {
    if (mockUser.role !== "admin") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only administrators can sync inventory.",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Inventory Synced",
        description: "Inventory has been successfully synchronized with all platforms.",
      })
    }, 2000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const lowStockCount = mockInventory.filter((item) => item.lowStock).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Monitor stock levels and sync across platforms</p>
        </div>
        <Button onClick={handleSyncInventory} disabled={isLoading || mockUser.role !== "admin"}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Syncing..." : "Sync Inventory"}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventory.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventory.reduce((sum, item) => sum + item.onHand, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventory.reduce((sum, item) => sum + item.available, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{lowStockCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Details</CardTitle>
          <CardDescription>Current stock levels and synchronization status</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>On Hand</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Synced</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.onHand}</TableCell>
                    <TableCell>{item.reserved}</TableCell>
                    <TableCell>{item.available}</TableCell>
                    <TableCell>
                      {item.onHand === 0 ? (
                        <Badge variant="destructive">Out of Stock</Badge>
                      ) : item.lowStock ? (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        >
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          In Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(item.lastSynced)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
