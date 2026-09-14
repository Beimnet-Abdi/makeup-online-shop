"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function ServicesHero() {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative min-h-[80svh] overflow-hidden transition-colors duration-500 md:min-h-[90svh] ${
        isDark ? "bg-[#070403] text-[#F5F2EB]" : "bg-[#4D433C] text-[#F5F2EB]"
      }`}
    >
      {/* Background Image Layer */}
      <Image
        src="/images/hero-powder.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-all duration-500 ${
          isDark
            ? "brightness-[0.65] contrast-[1.1]"
            : "brightness-[0.35] contrast-[1.2] opacity-95"
        }`}
        aria-hidden="true"
      />

      {/* Cinematic Overlays — Lighter top edge in light mode for header visibility */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        aria-hidden="true"
        style={{
          background: isDark
            ? `
              radial-gradient(ellipse 70% 60% at 50% 45%, rgba(177,106,78,0.25) 0%, transparent 55%),
              linear-gradient(180deg, rgba(7,4,3,0.5) 0%, rgba(7,4,3,0.15) 40%, rgba(7,4,3,0.4) 70%, rgba(7,4,3,0.95) 100%),
              linear-gradient(90deg, rgba(7,4,3,0.3) 0%, transparent 35%, transparent 65%, rgba(7,4,3,0.3) 100%)
            `
            : `
              radial-gradient(ellipse 70% 60% at 50% 45%, rgba(212,175,55,0.15) 0%, transparent 55%),
              linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(35,30,26,0.2) 40%, rgba(35,30,26,0.85) 70%, #4D433C 100%),
              linear-gradient(90deg, rgba(35,30,26,0.5) 0%, transparent 35%, transparent 65%, rgba(35,30,26,0.5) 100%)
            `,
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-[1360px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[90svh] md:px-10 lg:px-14">
        <h1 className="animate-fade-up font-sans text-[3rem] font-bold leading-tight tracking-tighter uppercase sm:text-[3.75rem] md:text-[4.75rem]">
          <span className="bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#E2B2A2] bg-clip-text text-transparent">
            Our Services
          </span>
        </h1>

        <p
          className={`animate-fade-up delay-1 mt-3 max-w-md font-sans text-[0.95rem] font-light leading-relaxed transition-colors duration-500 md:text-[1rem] ${
            isDark ? "text-neutral-300" : "text-[#F0EAE5]"
          }`}
        >
          Curated beauty rituals crafted with precision, from luminous skin to
          bridal elegance, every service is designed to feel effortless and
          extraordinary.
        </p>

        <Link
          href="/contact"
          className="mt-8 h-11 items-center justify-center px-8"
        >
          <Button variant="outline">Contact Us</Button>
        </Link>
      </div>
    </section>
  );
}
