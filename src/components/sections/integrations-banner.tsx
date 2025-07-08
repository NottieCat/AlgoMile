"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function IntegrationsBanner() {
  return (
    <motion.section 
        id="integrations" 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="rounded-lg bg-primary/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-primary md:text-3xl font-headline">
            Integrates with Your Existing Workflow
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80">
            AlgoMile connects seamlessly with Walmart Spark and other major delivery platforms to supercharge your logistics without disrupting your toolchain.
          </p>
          <Button asChild size="lg" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#">Read the docs</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
