import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { SocialProof } from "@/components/sections/SocialProof";
import { Offer } from "@/components/sections/Offer";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const Index = () => (
  <main className="min-h-screen">
    <Navbar />
    <Hero />
    <Problem />
    <Solution />
    <Benefits />
    <Process />
    <SocialProof />
    <Offer />
    <FAQ />
    <CTA />
    <Footer />
    <WhatsAppFloat />
  </main>
);

export default Index;
