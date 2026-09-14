import type { Metadata } from "next";
import ServicesHero from "@/components/ServicesHero";
import Sevices from "@/components/Services";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Services | HIWOT Makeup Artist",
  description:
    "Makeup artistry for every occasion — simple, elegant, and uniquely you.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1 bg-bg">
      <ServicesHero />
      <Sevices />
      <CTA />
    </main>
  );
}
