import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | HIWOT Makeup Artist",
  description:
    "Makeup artistry for every occasion — simple, elegant, and uniquely you.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-bg">
      <Contact />
    </main>
  );
}
