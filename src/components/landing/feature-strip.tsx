import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';

const features = [
  { text: "Live ETA predictions for ultimate customer satisfaction." },
  { text: "Cost-vs-Time slider to align with your business priorities." },
  { text: "Multi-depot support for complex logistical operations." },
  { text: "REST + GraphQL APIs for seamless integration." }
];

const FeatureStrip = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Powerful Features, Simple Interface</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Everything you need to streamline your delivery operations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="p-4 border rounded-lg bg-background">
            <Image 
              src="https://placehold.co/1200x900.png" 
              alt="AlgoMile Dashboard Screenshot" 
              width={1200} 
              height={900} 
              className="rounded-lg shadow-xl"
              data-ai-hint="dashboard analytics"
            />
          </div>
          <div className="space-y-6">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;
