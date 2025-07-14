import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CalloutBanner = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto">
        <div className="bg-card rounded-lg p-8 md:p-12 shadow-lg border border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold font-headline">Integrates with Major Delivery Platforms</h3>
              <p className="mt-2 text-muted-foreground">Connect with Walmart Spark, DoorDash, and more with our powerful APIs.</p>
            </div>
            <Button asChild size="lg" className="flex-shrink-0">
              <Link href="#">Read the docs <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalloutBanner;
