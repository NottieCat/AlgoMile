"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: "Starter",
    price: { monthly: 49, yearly: 490 },
    description: "For small teams and startups.",
    features: ["Up to 5 drivers", "Basic routing", "Email support"],
    isPopular: false
  },
  {
    name: "Growth",
    price: { monthly: 99, yearly: 990 },
    description: "For growing businesses.",
    features: ["Up to 25 drivers", "Dynamic routing", "Live ETA predictions", "API Access"],
    isPopular: true
  },
  {
    name: "Enterprise",
    price: { monthly: 0, yearly: 0 },
    description: "For large-scale operations.",
    features: ["Unlimited drivers", "Multi-depot support", "Dedicated support & SLA", "Advanced analytics"],
    isPopular: false
  }
];

const PricingToggle = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Flexible Pricing for Any Fleet</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Choose a plan that scales with your business. Cancel anytime.</p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <span>Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle pricing period" />
          <span>Yearly (Save 2 months)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card key={index} className={cn(
              "flex flex-col", 
              tier.isPopular ? "border-primary shadow-lg shadow-primary/10" : "bg-card"
            )}>
              {tier.isPopular && <div className="bg-primary text-primary-foreground text-xs font-bold text-center py-1 rounded-t-lg">MOST POPULAR</div>}
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-baseline gap-2 mb-6">
                  {tier.price.monthly > 0 ? (
                    <>
                      <span className="text-4xl font-bold">${isYearly ? tier.price.yearly / 10 : tier.price.monthly}</span>
                      <span className="text-muted-foreground">/ month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">Custom</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" variant={tier.isPopular ? "default" : "outline"}>
                  {tier.price.monthly > 0 ? "Choose Plan" : "Contact Sales"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingToggle;
