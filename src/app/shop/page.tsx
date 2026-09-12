import type { Metadata } from "next";
import Shop from "@/components/Shop";

export const metadata: Metadata = {
  title: "Shop | RUTBA Makeup Artist",
  description:
    "Get in touch with RUTBA Makeup Artist for inquiries about our premium makeup, hair, bridal, and nail services.",
};

export default function ShopPage() {
  return (
    <main className="flex-1 bg-bg">
      <Shop />
    </main>
  );
}
