import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Truck, RefreshCw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentShipments = [
    { id: "SHP-00123", status: "In Transit", destination: "New York, NY", eta: "4:30 PM" },
    { id: "SHP-00122", status: "Delivered", destination: "Boston, MA", eta: "Yesterday" },
    { id: "SHP-00121", status: "Delivered", destination: "Chicago, IL", eta: "Yesterday" },
    { id: "SHP-00120", status: "Pending", destination: "Miami, FL", eta: "Tomorrow" },
]

export default function RetailerDashboardPage() {
  return (
    <div className="grid gap-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Retailer Dashboard</h1>
            <p className="text-muted-foreground">Manage your shipments and inventory seamlessly.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Bulk Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button className="w-full justify-start gap-2"><Upload className="w-4 h-4"/> Upload Shipments (CSV)</Button>
                    <Button variant="outline" className="w-full justify-start gap-2"><RefreshCw className="w-4 h-4"/> Sync Inventory</Button>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Shipment Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">In Transit</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">84</p>
                        <p className="text-sm text-muted-foreground">Delivered (24h)</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold text-destructive">2</p>
                        <p className="text-sm text-muted-foreground">Delayed</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>A quick look at your most recent shipments.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Shipment ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>ETA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentShipments.map(shipment => (
                            <TableRow key={shipment.id}>
                                <TableCell className="font-medium">{shipment.id}</TableCell>
                                <TableCell>{shipment.status}</TableCell>
                                <TableCell>{shipment.destination}</TableCell>
                                <TableCell>{shipment.eta}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
