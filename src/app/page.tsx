import BenefitsGrid from "@/components/landing/benefits-grid";
import CalloutBanner from "@/components/landing/callout-banner";
import FeatureStrip from "@/components/landing/feature-strip";
import HeroSection from "@/components/landing/hero-section";
import PricingToggle from "@/components/landing/pricing-toggle";
import SavingsCalculator from "@/components/landing/savings-calculator";
import TestimonialsCarousel from "@/components/landing/testimonials-carousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <BenefitsGrid />
      <FeatureStrip />
      <SavingsCalculator />
      <TestimonialsCarousel />
      <PricingToggle />
      <CalloutBanner />
    </div>
  );
}
