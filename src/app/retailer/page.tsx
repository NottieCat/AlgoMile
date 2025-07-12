import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RetailerPage = () => {
    return (
        <div className="container mx-auto py-28 px-4 md:px-6">
            <div className="space-y-4 mb-8">
                <h1 className="text-4xl font-bold font-headline">Retailer Portal</h1>
                <p className="text-muted-foreground">Manage your shipments, inventory, and performance.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Retailer Portal Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This page would contain components for the retailer, such as:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                        <li>Shipment Management</li>
                        <li>Inventory Sync Status</li>
                        <li>Performance KPIs (Delivery times, costs)</li>
                        <li>Platform Integration Settings</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default RetailerPage;
