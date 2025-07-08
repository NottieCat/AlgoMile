"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Calculator() {
  const [dailyOrders, setDailyOrders] = React.useState(100)
  const [fleetSize, setFleetSize] = React.useState(10)
  const [hoursSaved, setHoursSaved] = React.useState(0)
  const [dollarsSaved, setDollarsSaved] = React.useState(0)
  const [hasBeenVisible, setHasBeenVisible] = React.useState(false);

  React.useEffect(() => {
    // Simple formula stub
    const calculatedHours = Math.round(dailyOrders * 0.12 * 30) // 0.12 hours/order * 30 days
    const calculatedDollars = Math.round(dailyOrders * 2.15 * 30) // $2.15/order * 30 days
    
    if (hasBeenVisible) {
      let currentHours = 0;
      let currentDollars = 0;
      const interval = setInterval(() => {
        currentHours = Math.min(calculatedHours, currentHours + Math.ceil(calculatedHours / 50));
        currentDollars = Math.min(calculatedDollars, currentDollars + Math.ceil(calculatedDollars / 50));

        setHoursSaved(currentHours);
        setDollarsSaved(currentDollars);

        if (currentHours === calculatedHours && currentDollars === calculatedDollars) {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    } else {
        setHoursSaved(calculatedHours);
        setDollarsSaved(calculatedDollars);
    }
    
  }, [dailyOrders, fleetSize, hasBeenVisible])

  return (
    <motion.section 
        id="calculator"
        className="py-20 md:py-32 bg-card"
        onViewportEnter={() => setHasBeenVisible(true)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Calculate Your Potential Savings</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Estimate how much time and money you could save with AlgoMile.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6 rounded-lg bg-background p-8 lg:col-span-1">
            <div>
              <Label htmlFor="daily-orders" className="text-lg">Daily Orders</Label>
              <Input
                id="daily-orders"
                type="number"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="mt-2 text-lg h-12"
              />
            </div>
            <div>
              <Label htmlFor="fleet-size" className="text-lg">Fleet Size</Label>
              <Input
                id="fleet-size"
                type="number"
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="mt-2 text-lg h-12"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Hours Saved / Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-primary">{hoursSaved.toLocaleString()}</p>
                <p className="text-muted-foreground mt-2">More time for more deliveries.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">$ Saved / Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-primary">${dollarsSaved.toLocaleString()}</p>
                <p className="text-muted-foreground mt-2">Reduced fuel and labor costs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
