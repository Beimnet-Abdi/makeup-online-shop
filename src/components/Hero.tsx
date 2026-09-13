"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className={`relative min-h-[100svh] overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#1A1412]" : "bg-[#F5ECE8]"
      }`}
    >
      {/* 1. Full-width Hero Background Image */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/Hero-bg.png"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
      </div>

      {/* 2. Architectural Diagonal Light Beam */}
      <div
        className={`pointer-events-none absolute inset-0 z-[1] mix-blend-overlay transition-opacity duration-500 ${
          isDark ? "opacity-70" : "opacity-40"
        }`}
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.3) 30%, transparent 55%)",
        }}
      />

      {/* 3. Soft Stair Light Shadows */}
      <div
        className={`pointer-events-none absolute -left-10 top-0 h-full w-[130%] z-[1] transition-opacity duration-500 ${
          isDark ? "opacity-100" : "opacity-50"
        }`}
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(-35deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 140px, transparent 140px, transparent 300px)",
          filter: "blur(35px)",
        }}
      />

      {/* 4. Left-Side Gradient Shadow */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] transition-all duration-500"
        aria-hidden="true"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(15,10,8,0.65) 0%, rgba(15,10,8,0.45) 30%, rgba(15,10,8,0.15) 60%, transparent 100%), linear-gradient(180deg, rgba(15,10,8,0.3) 0%, transparent 25%, rgba(15,10,8,0.4) 100%)"
            : "linear-gradient(90deg, rgba(245,236,232,0.45) 0%, rgba(245,236,232,0.25) 30%, rgba(245,236,232,0.05) 60%, transparent 100%), linear-gradient(180deg, rgba(245,236,232,0.2) 0%, transparent 25%, rgba(245,236,232,0.2) 100%)",
        }}
      />

      {/* 5. Bottom Blur Feather Effect */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-[3] backdrop-blur-[2px] transition-all duration-500"
        aria-hidden="true"
        style={{
          background: isDark
            ? "linear-gradient(to top, #0F0A08 0%, rgba(15,10,8,0.8) 40%, transparent 100%)"
            : "linear-gradient(to top, #E8D7CE 0%, rgba(232,215,206,0.6) 40%, transparent 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1360px] flex-col justify-center px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-14 lg:pb-20 lg:pt-24">
        <div className="max-w-xl lg:max-w-[55%]">
          <h1 className="animate-fade-up font-sans text-[2.85rem] font-bold leading-[1.05] tracking-tighter sm:text-[3.85rem] md:text-[4.75rem] lg:text-[5.25rem]">
            <span className="bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#E2B2A2] bg-clip-text text-transparent">
              Discover Your Beauty
            </span>
          </h1>

          <p
            className={`animate-fade-up delay-2 mt-6 max-w-[32rem] text-[0.95rem] font-light leading-[1.7] md:text-[1.1rem] transition-colors duration-500 ${
              isDark ? "text-[#E0D8D0]" : "text-[#3D302B]"
            }`}
          >
            Personalized artistry for every occasion
          </p>

          <div className="animate-fade-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/contact">
              <Button variant="primary">Book Appointment</Button>
            </Link>

            <Link href="/services">
              <Button variant="outline">View Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
