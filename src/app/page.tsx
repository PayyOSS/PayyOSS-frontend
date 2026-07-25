import { CallToAction } from "@/components/landingPage/CallToAction";
import { DeveloperExperience } from "@/components/landingPage/DeveloperExperience";
import { FAQ } from "@/components/landingPage/FAQ";
import { Features } from "@/components/landingPage/Features";
import { Footer } from "@/components/landingPage/Footer";
import { Hero } from "@/components/landingPage/Hero";
import { HowItWorks } from "@/components/landingPage/HowItWorks";
import { Networks } from "@/components/landingPage/Networks";
import { Pricing } from "@/components/landingPage/Pricing";
import { ProductDemo } from "@/components/landingPage/ProductDemo";
import { Security } from "@/components/landingPage/Security";

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#030403] text-[#f7f8f2]">
      <Hero />
      <Networks />
      <HowItWorks />
      <ProductDemo />
      <Features />
      <DeveloperExperience />
      <Security />
      <Pricing />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
