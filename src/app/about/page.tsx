import type { Metadata } from "next";
import About from "@/components/About";
import StatSection from "@/components/StatSection";
import VisionSection from "@/components/VisionSection";
import CeoSection from "@/components/CeoSection";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "About | HIWOT Makeup Artist",
  description:
    "Makeup artistry for every occasion — simple, elegant, and uniquely you.",
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
