import BenefitsGrid from "@/components/landing/benefits-grid"
import CalloutBanner from "@/components/landing/callout-banner"
import HeroSection from "@/components/landing/hero-section"
import SavingsCalculator from "@/components/landing/savings-calculator"
import AboutUs from "@/components/landing/about-us"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <BenefitsGrid />
      <SavingsCalculator />
      <AboutUs />
      <CalloutBanner />
    </div>
  )
}
