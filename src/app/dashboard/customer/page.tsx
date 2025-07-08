"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Route } from "lucide-react"

import { optimizeRoute, type OptimizeRouteOutput } from "@/ai/flows/dynamic-route-optimization"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  shipmentDetails: z.string().min(10, "Please provide more details about the shipment."),
  trafficConditions: z.string().min(5, "Please describe traffic conditions."),
  weatherConditions: z.string().min(5, "Please describe weather conditions."),
})

export default function CustomerDashboardPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [result, setResult] = React.useState<OptimizeRouteOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipmentDetails: "Origin: Warehouse A, 123 Industrial Dr. Destination: Customer B, 456 Main St. Fragile items.",
      trafficConditions: "Moderate congestion on highway I-95.",
      weatherConditions: "Light rain, visibility is good.",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResult(null)
    try {
      const response = await optimizeRoute(values)
      setResult(response)
    } catch (error) {
      console.error("Error optimizing route:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to optimize route. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Route Optimization</CardTitle>
          <CardDescription>
            Use our AI to find the most efficient route for your shipment in real-time.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="shipmentDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipment Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Origin, destination, package info..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trafficConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Traffic Conditions</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Heavy traffic on Main St." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Conditions</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Clear skies, light wind." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Route className="mr-2 h-4 w-4" />
                    Optimize Route
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="flex items-center justify-center">
        {isLoading && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                <p>Analyzing routes...</p>
            </div>
        )}
        {result && (
            <Card className="w-full bg-primary/5">
                <CardHeader>
                    <CardTitle>Optimized Route Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Recommended Route</h3>
                        <p className="text-muted-foreground">{result.optimizedRoute}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Estimated Arrival Time</h3>
                        <p className="text-muted-foreground">{result.estimatedTimeOfArrival}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Potential Delays</h3>
                        <p className="text-muted-foreground">{result.potentialDelays}</p>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  )
}
