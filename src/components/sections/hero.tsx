"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { AnimatedMap } from "./animated-map"

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl font-headline">
            Dynamic Routing that Cuts Time & Cost
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Our AI-powered platform optimizes vehicle routes in real-time, ensuring faster deliveries and significant operational savings.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" aria-label="Try AlgoMile">
              <Link href="/login">Try AlgoMile</Link>
            </Button>
            <Button asChild size="lg" variant="outline" aria-label="See Demo">
              <Link href="#features">See Demo</Link>
            </Button>
          </div>
        </motion.div>
        <div className="flex justify-center">
            <AnimatedMap />
        </div>
      </div>
    </section>
  )
}
