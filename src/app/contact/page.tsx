import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | HIWOT Makeup Artist",
  description:
    "Get in touch with HIWOT Makeup Artist for inquiries about our premium makeup, hair, bridal, and nail services.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-bg">
      <Contact />
    </main>
  );
}
