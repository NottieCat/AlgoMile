"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Logistics Manager, QuickShip",
    quote: "AlgoMile has been a game-changer for our fleet. We've cut fuel costs by 15% and our on-time delivery rate is the highest it's ever been. The real-time rerouting is magic.",
    avatar: "https://placehold.co/100x100.png?text=SJ",
  },
  {
    name: "David Chen",
    company: "Founder, FreshCart Grocers",
    quote: "As a growing business, efficiency is everything. AlgoMile scaled with us perfectly, from 2 vans to 20. Our drivers are happier and our customers get their orders faster.",
    avatar: "https://placehold.co/100x100.png?text=DC",
  },
  {
    name: "Maria Rodriguez",
    company: "COO, BuildIt Supplies",
    quote: "The analytics dashboard gives us incredible insights into our operations. We've identified and eliminated bottlenecks we didn't even know we had. Highly recommended!",
    avatar: "https://placehold.co/100x100.png?text=MR",
  },
]

export function Testimonials() {
  return (
    <motion.section 
      id="testimonials" 
      className="py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Loved by Logistics Leaders</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our customers are saying.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full shadow-card">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <blockquote className="text-lg italic text-foreground">
                        “{testimonial.quote}”
                      </blockquote>
                      <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </motion.section>
  )
}
