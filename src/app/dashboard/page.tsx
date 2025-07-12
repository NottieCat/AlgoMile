import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
    return (
        <div className="container mx-auto py-28 px-4 md:px-6">
            <div className="space-y-4 mb-8">
                <h1 className="text-4xl font-bold font-headline">Customer Dashboard</h1>
                <p className="text-muted-foreground">Manage your orders and optimize deliveries.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Create New Delivery</CardTitle>
                        <CardDescription>Enter delivery details and let our AI find the best route.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* A proper form would go here using react-hook-form */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-1">Delivery Address</label>
                            <input id="address" type="text" placeholder="123 Main St, Anytown, USA" className="w-full p-2 rounded-md bg-input border border-border" />
                        </div>
                        <div className="flex gap-4">
                            <Button className="flex-1">Optimize for Time</Button>
                            <Button variant="secondary" className="flex-1">Optimize for Cost</Button>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Time & Cost Analytics</CardTitle>
                        <CardDescription>Review your savings and performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Analytics charts and KPIs would be displayed here.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>A list of your recent order shipments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Order history would be displayed here.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
