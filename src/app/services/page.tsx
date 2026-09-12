import type { Metadata } from "next";
import ServicesHero from "@/components/ServicesHero";
import Sevices from "@/components/Services";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Services | RUTBA Makeup Artist",
  description:
    "Explore premium makeup, hair, bridal, and nail services crafted with precision and luxury care.",
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
