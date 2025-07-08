import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Features } from "@/components/sections/features";
import { Calculator } from "@/components/sections/calculator";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { IntegrationsBanner } from "@/components/sections/integrations-banner";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Benefits />
        <Features />
        <Calculator />
        <Testimonials />
        <Pricing />
        <IntegrationsBanner />
      </main>
      <Footer />
    </>
  );
}
