import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, PackageCheck, Star } from "lucide-react"

export default function DriverDashboardPage() {
  return (
    <div className="grid gap-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Driver Dashboard</h1>
            <p className="text-muted-foreground">Your hub for jobs, routes, and earnings.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Today's Route</CardTitle>
                <CardDescription>Your optimized route for today's deliveries.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-muted/50 rounded-lg">
                <Map className="w-16 h-16 text-muted-foreground"/>
                <p className="text-muted-foreground">No route assigned yet. Check the job feed for new opportunities.</p>
                <Button>View Job Feed</Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Active Job</CardTitle>
                <CardDescription>Details for your current delivery.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-muted/50 rounded-lg">
                <PackageCheck className="w-16 h-16 text-muted-foreground"/>
                <p className="text-muted-foreground">You are not on an active job.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Your Rating</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400"/>
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400"/>
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400"/>
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400"/>
                <Star className="w-6 h-6 text-yellow-400/50 fill-yellow-400/50"/>
                <span className="text-xl font-bold ml-2">4.8</span>
                <span className="text-muted-foreground">(based on 123 deliveries)</span>
            </CardContent>
        </Card>
    </div>
  )
}
