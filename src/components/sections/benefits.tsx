"use client"
import { Clock, DollarSign, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    icon: Clock,
    title: "Real-Time Re-routing",
    description: "Adapt to traffic and weather instantly, keeping your deliveries on schedule.",
  },
  {
    icon: DollarSign,
    title: "15% Lower Delivery Cost",
    description: "Optimize fuel and labor expenses with our intelligent routing algorithms.",
  },
  {
    icon: CheckCircle,
    title: "98% On-Time Arrival",
    description: "Increase customer satisfaction with reliable and predictable delivery times.",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

export function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-32 bg-card">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">The AlgoMile Advantage</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Unlock efficiency and savings with features designed for modern logistics.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Card className="h-full text-center transition-all hover:shadow-card hover:-translate-y-1">
                <CardHeader className="items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
