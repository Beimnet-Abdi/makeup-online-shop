import Hero from "@/components/Hero";
import HomeService from "@/components/HomeServices";
import CTA from "@/components/CTA";
import ShowCase from "@/components/ShowCase";

export default function Home() {
  return (
    <main className="flex-1 bg-bg">
      <Hero />
      <ShowCase />
      <HomeService />
      <CTA />
      <div id="contact" className="sr-only" aria-hidden="true" />
    </main>
  );
}
