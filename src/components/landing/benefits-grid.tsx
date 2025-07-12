import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw, BadgeDollarSign, Clock } from "lucide-react";

const benefits = [
  {
    icon: <RefreshCw className="h-10 w-10 text-primary" />,
    title: "Real-Time Re-routing",
    description: "Our AI adapts to traffic and weather, ensuring your routes are always the most efficient."
  },
  {
    icon: <BadgeDollarSign className="h-10 w-10 text-primary" />,
    title: "15% Lower Delivery Cost",
    description: "Optimize fuel and labor costs with shorter routes and fewer delays, boosting your bottom line."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "98% On-Time Arrival",
    description: "Increase customer satisfaction with reliable ETAs and consistently punctual deliveries."
  }
]

const BenefitsGrid = () => {
  return (
    <section id="benefits" className="py-20 md:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6 bg-card hover:border-primary/50 transition-all transform hover:-translate-y-1">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  {benefit.icon}
                </div>
                <CardTitle className="mt-4 font-headline text-2xl">{benefit.title}</CardTitle>
                <CardDescription className="mt-2">{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
