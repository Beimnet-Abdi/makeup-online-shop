import type { Metadata } from "next";
import About from "@/components/About";
import StatSection from "@/components/StatSection";
import VisionSection from "@/components/VisionSection";
import CeoSection from "@/components/CeoSection";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "About | RUTBA Makeup Artist",
  description:
    "Explore premium makeup, hair, bridal, and nail services crafted with precision and luxury care.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-bg">
      <About />
      <StatSection />
      <VisionSection />
      <CeoSection />
      <CTA />
    </main>
  );
}
