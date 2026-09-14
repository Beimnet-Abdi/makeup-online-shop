import type { Metadata } from "next";
import Shop from "@/components/Shop";

export const metadata: Metadata = {
  title: "Shop | HIWOT Makeup Artist",
  description:
    "Makeup artistry for every occasion — simple, elegant, and uniquely you.",
};

export default function ShopPage() {
  return (
    <main className="flex-1 bg-bg">
      <Shop />
    </main>
  );
}
