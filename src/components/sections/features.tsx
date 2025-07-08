"use client"
import Image from "next/image"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  "Live ETA predictions",
  "Cost-vs-Time optimization slider",
  "Multi-depot & multi-vehicle support",
  "Developer-friendly REST + GraphQL APIs",
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >
          <Image
            src="https://placehold.co/1200x900.png"
            alt="AlgoMile dashboard mock"
            width={1200}
            height={900}
            className="rounded-lg shadow-card"
            data-ai-hint="dashboard mock"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-2"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Powerful Tools, Total Control</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From granular predictions to high-level analytics, AlgoMile gives you the insights to make smarter decisions.
          </p>
          <ul className="mt-8 space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-lg text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
