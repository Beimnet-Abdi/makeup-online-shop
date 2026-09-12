"use client";

import Image from "next/image";
import { Sparkles, Heart, Crown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function VisionSection() {
  const { isDark } = useTheme();

  const cards = [
    {
      icon: Sparkles,
      title: "Enhance Natural Beauty",
      description:
        "We believe makeup should enhance, not hide, what makes you unique. Every look is thoughtfully created to complement your natural features, personal style, and individuality while bringing out your most beautiful self.",
    },
    {
      icon: Heart,
      title: "Inspire Confidence",
      description:
        "Our goal is to make every client feel confident, comfortable, and beautiful. Through personalized artistry and attention to detail, we create looks that help you feel your best and carry that confidence wherever you go.",
    },
    {
      icon: Crown,
      title: "Define Timeless Beauty",
      description:
        "We create elegant and refined looks that go beyond trends. From everyday beauty to your most important occasions, our vision is to create makeup that feels sophisticated, memorable, and beautifully timeless.",
    },
  ];

  return (
    <section
      className={`relative w-full py-28 lg:py-36 px-6 border-t overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-[#1C1714] via-[#15100E] to-[#0E0B0A] text-[#F5F2EB] border-white/5"
          : "bg-gradient-to-b from-[#FAF4ED] via-[#F3E8DB] to-[#EBDCCA] text-[#1C1613] border-[#E8D7C3]"
      }`}
    >
      {/* Background Image Layer — Rendered in Both Themes */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vision-bg.jpg"
          alt="Luxury Makeup Artistry Background"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center scale-105 transition-opacity duration-500 ${
            isDark ? "opacity-35" : "opacity-25 mix-blend-multiply"
          }`}
        />
        <div
          className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
            isDark
              ? "bg-gradient-to-b from-[#1C1714]/90 via-[#15100E]/75 to-[#0E0B0A]/90"
              : "bg-gradient-to-b from-[#FAF4ED]/80 via-[#F3E8DB]/65 to-[#EBDCCA]/80"
          }`}
        />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-sans text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold leading-none tracking-tighter uppercase">
            <span>Our </span>
            <span
              className={`bg-gradient-to-r ${
                isDark
                  ? "from-[#E6C594] via-[#D4AF37] to-[#C59B27]"
                  : "from-[#D4AF37] via-[#C59B27] to-[#B8860B]"
              } bg-clip-text text-transparent`}
            >
              Vision
            </span>
          </h2>
          <p
            className={`font-sans text-[0.95rem] md:text-[1.05rem] font-light leading-[1.8] transition-colors duration-500 ${
              isDark ? "text-[#DCD2C9]" : "text-[#594A3E]"
            }`}
          >
            The core principles that guide our artistry, inspire our creative
            journey, and shape the future of beauty education.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`relative group rounded-2xl p-10 lg:p-12 min-h-[360px] lg:min-h-[400px] flex flex-col items-center justify-center text-center transition-all duration-500 border ${
                  isDark
                    ? "bg-white/[0.03] backdrop-blur-md border-white/10 hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:-translate-y-1.5"
                    : "bg-white/70 backdrop-blur-md border-[#E8D7C3] shadow-[0_12px_36px_rgba(212,175,55,0.18)] hover:border-[#D4AF37] hover:shadow-[0_18px_45px_rgba(212,175,55,0.3)] hover:-translate-y-1.5"
                }`}
              >
                {/* Edge Rotating Glow Highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#E6C594]/60 transition-colors duration-500" />

                {/* Icon Container */}
                <div
                  className={`w-18 h-18 rounded-full flex items-center justify-center mb-8 border transition-all duration-300 group-hover:scale-110 ${
                    isDark
                      ? "bg-gradient-to-b from-white/10 to-white/5 border-[#D4AF37]/30 text-[#E6C594] group-hover:border-[#D4AF37]"
                      : "bg-white/90 border-[#D4AF37]/30 text-[#8C6D3B] shadow-[0_4px_16px_rgba(212,175,55,0.2)] group-hover:border-[#D4AF37]"
                  }`}
                >
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>

                {/* Card Title */}
                <h3
                  className={`font-sans text-xl sm:text-2xl font-semibold mb-4 tracking-tight transition-colors duration-300 ${
                    isDark
                      ? "text-[#F5F2EB] group-hover:text-[#E6C594]"
                      : "text-[#1C1613] group-hover:text-[#8C6D3B]"
                  }`}
                >
                  {card.title}
                </h3>

                {/* Card Description */}
                <p
                  className={`font-sans text-[0.925rem] sm:text-[0.975rem] font-light leading-[1.8] transition-colors duration-500 ${
                    isDark ? "text-[#CBBDB5]" : "text-[#594A3E]"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
