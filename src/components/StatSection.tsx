"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll(".story-line");

      if (lines) {
        gsap.from(lines, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      className={`relative py-16 lg:py-24 min-h-[70vh] flex items-center border-t transition-colors duration-500 overflow-hidden ${
        isDark
          ? "bg-black text-white border-white/10"
          : "bg-white text-black border-black/10"
      }`}
    >
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] ${
            isDark ? "bg-[#D4AF37]/5" : "bg-[#D4AF37]/10"
          }`}
        />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#E6C594]/30 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#D4AF37]/20 rounded-full blur-[2px] animate-pulse delay-700" />
      </div>

      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-6"
      >
        {/* Section Sub-Label */}
        <h2 className="story-line font-sans text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#D4AF37]">
          OUR STORY
        </h2>

        {/* Main Headlines - Reduced font size/weight */}
        <div className="space-y-6">
          <p className="story-line font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight">
            Crafting Timeless Elegance <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#B8860B] bg-clip-text text-transparent">
              Through Professional Mastery
            </span>
          </p>

          <p
            className={`story-line max-w-2xl mx-auto font-sans text-sm sm:text-base font-normal leading-relaxed transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Every brushstroke is guided by a commitment to accentuating unique
            beauty, delivering unforgettable bridal, high-fashion, and
            red-carpet transformations.
          </p>

          <p
            className={`story-line max-w-2xl mx-auto font-sans text-sm sm:text-base font-normal leading-relaxed transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Rooted in precision and refined techniques, our passion extends
            beyond application—empowering clients with bespoke beauty
            experiences that inspire lifelong confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
