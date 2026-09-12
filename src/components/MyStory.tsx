"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function MyStory() {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-neutral-900 text-white min-h-[80vh] text-[#F5F2EB]"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-6 py-12 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-20">
        {/* Left portrait image container - Reduced size and balanced */}
        <div className="flex justify-center lg:col-span-5">
          <div className="relative aspect-[3/4] w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            <Image
              src="/images/about.jpg"
              alt="Beauty portrait of the makeup artist"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
            />
            {/* Mobile Bottom Fade Mask */}
            <div
              className="pointer-events-none absolute inset-0 lg:hidden"
              aria-hidden="true"
              style={{
                background: isDark
                  ? "linear-gradient(to bottom, transparent 70%, rgba(18,13,11,0.8) 100%)"
                  : "linear-gradient(to bottom, transparent 70%, rgba(232,215,206,0.8) 100%)",
              }}
            />
            {/* Desktop Right Edge Fade Mask */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 lg:block"
              aria-hidden="true"
              style={{
                background: isDark
                  ? "linear-gradient(to left, rgba(26,19,17,0.4) 0%, transparent 100%)"
                  : "linear-gradient(to left, rgba(232,215,206,0.4) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Right content */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-6">
          <h2 className="font-sans text-[2.5rem] font-bold leading-none tracking-tighter sm:text-[3.25rem] lg:text-[3.75rem]">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E6C594] to-[#E2B2A2] bg-clip-text text-transparent">
              My{" "}
            </span>
            <span className={isDark ? "border-white/10" : "border-black/10"}>
              Story
            </span>
          </h2>

          <p
            className={`mt-4 font-sans text-lg font-medium leading-snug transition-colors duration-500 sm:text-xl md:text-2xl ${
              isDark ? "text-[#E6D9D2]" : "text-[#3D302B]"
            }`}
          >
            My Beauty and Success starts here
          </p>

          <p
            className={`mt-6 max-w-lg font-sans text-[0.95rem] font-light leading-[1.8] transition-colors duration-500 md:text-[1.05rem] ${
              isDark ? "text-[#CBBDB5]" : "text-[#52433D]"
            }`}
          >
            Hello, I&apos;m Reuba. With 9 years of professional experience in
            the beauty industry, I have dedicated my career to helping women in
            Dhaka look and feel their absolute best. Beyond the brush, I am a
            passionate beauty blogger, constantly reviewing the latest global
            trends to bring the best techniques back to my studio.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#E6C594] via-[#F3D2B1] to-[#E2B2A2] px-8 text-[0.8rem] font-medium tracking-wide text-[#1C1613] border border-white/40 shadow-[0_4px_20px_rgba(230,197,148,0.25)] transition-all duration-300 hover:brightness-105 hover:shadow-[0_6px_25px_rgba(230,197,148,0.4)]"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
