"use client";

import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "AlgoMile transformed our delivery logistics. We're faster, more efficient, and our customers have never been happier. The savings are just the cherry on top.",
    name: "Jane Doe",
    company: "CEO, QuickBox Logistics",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "professional woman"
  },
  {
    quote: "The real-time re-routing is a game-changer. We've cut our fuel costs by 18% and our drivers can handle more deliveries per shift without the stress.",
    name: "John Smith",
    company: "Fleet Manager, UrbanDeliver",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "professional man"
  },
  {
    quote: "Integrating our systems with the AlgoMile API was seamless. The level of control and insight we've gained is unparalleled. Highly recommended.",
    name: "Emily White",
    company: "CTO, FreshFare Grocers",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "tech professional"
  }
]

const TestimonialsCarousel = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Trusted by Industry Leaders</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Don't just take our word for it. Here's what our partners have to say.</p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-0 bg-transparent shadow-none">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-lg md:text-xl font-medium">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
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
    </section>
  );
};

export default TestimonialsCarousel;
