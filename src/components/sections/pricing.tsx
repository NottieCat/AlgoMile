"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Badge } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const tiers = [
  {
    name: "Starter",
    price: { monthly: 49, yearly: 490 },
    features: ["Up to 10 Drivers", "Basic Routing", "Live Tracking", "Email Support"],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: { monthly: 199, yearly: 1990 },
    features: [
      "Up to 50 Drivers",
      "Dynamic Re-routing",
      "ETA Predictions",
      "Priority Support",
      "Basic Analytics",
    ],
    cta: "Choose Growth",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    features: [
      "Unlimited Drivers",
      "Multi-Depot Support",
      "Advanced Analytics",
      "Dedicated Account Manager",
      "API Access & Integrations",
    ],
    cta: "Contact Sales",
  },
]

export function Pricing() {
  const [isYearly, setIsYearly] = React.useState(true)

  return (
    <motion.section 
        id="pricing"
        className="py-20 md:py-32 bg-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Flexible Pricing for Every Fleet</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. Cancel or upgrade anytime.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-12">
            <Label htmlFor="pricing-toggle">Monthly</Label>
            <Switch id="pricing-toggle" checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle between monthly and yearly pricing"/>
            <Label htmlFor="pricing-toggle">Yearly</Label>
            <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Save 15%</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col h-full",
                tier.highlighted && "border-primary shadow-card relative"
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 right-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                  Best Value
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                    {typeof tier.price.monthly === 'number' ? 
                        `$${isYearly ? tier.price.yearly / 12 : tier.price.monthly}` : 
                        "Custom"}
                    </span>
                    {typeof tier.price.monthly === 'number' && <span className="text-muted-foreground">/ month</span>}
                </div>
                <CardDescription>{tier.name === 'Enterprise' ? 'For large-scale, complex operations' : `For ${tier.name.toLowerCase()} teams.`}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={tier.highlighted ? "default" : "outline"}>
                  <Link href="/login">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
