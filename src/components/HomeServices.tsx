"use client";

import Link from "next/link";
import Section from "@/components/ui/Section";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Services() {
  const { isDark } = useTheme();

  const servicesList = [
    {
      id: "bridal",
      interestValue: "bridal",
      tag: "Timeless & Elegant",
      title: "BRIDAL MAKEUP",
      description:
        "A beautiful and elegant makeup look created to make you feel confident and special on your wedding day. Every detail is carefully done to match your features.",
      image: "/images/bridal-fg.jpg",
    },
    {
      id: "event",
      interestValue: "event",
      tag: "Special Occasions",
      title: "EVENT & PARTY MAKEUP",
      description:
        "Beautiful makeup for birthdays, engagements, dinners, parties, and other special occasions. Your look is created to match your style and make you feel confident.",
      image: "/images/event-fg.jpg",
    },
    {
      id: "soft-glam",
      interestValue: "event",
      tag: "Natural & Elegant",
      title: "SOFT GLAM MAKEUP",
      description:
        "A soft and polished makeup look that enhances your natural beauty. Perfect for anyone who wants glowing skin, defined eyes, and an elegant finish.",
      image: "/images/softglam-fg.jpg",
    },
    {
      id: "photoshoot",
      interestValue: "editorial",
      tag: "Camera Ready",
      title: "PHOTOSHOOT MAKEUP",
      description:
        "Professional makeup created to look beautiful in photos and under different lighting. Every detail is carefully applied to give you a clean and flawless look.",
      image: "/images/photoshoot-fg.jpg",
    },
    {
      id: "kit",
      interestValue: "coaching",
      tag: "Beauty Essentials",
      title: "MAKEUP KIT",
      description:
        "Carefully selected makeup tools and beauty essentials to help you create beautiful looks with ease. From brushes to useful beauty accessories, find the tools you need.",
      image: "/images/kit-fg.jpg",
    },
  ];

  return (
    <Section
      id="services"
      className={isDark ? "bg-black text-white" : "bg-white text-black"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center md:items-end mb-16 border-b pb-8 ${
            isDark ? "border-white/10" : "border-black/10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center md:text-left">
            Our{" "}
            <span
              className={
                isDark
                  ? "bg-gradient-to-r from-[#D4AF37] via-[#E6C594] to-[#E2B2A2] bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#E2B2A2] bg-clip-text text-transparent"
              }
            >
              Services
            </span>
          </h2>
          <p
            className={`max-w-md mt-4 md:mt-0 text-center md:text-right ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Tailored makeup, hair, and nail treatments designed to highlight
            your natural beauty.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {servicesList.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("select-interest", {
                      detail: service.interestValue,
                    }),
                  );
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative aspect-[4/5] overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                  isDark
                    ? "bg-neutral-900 border-white/5 hover:border-white/20"
                    : "bg-neutral-100 border-black/5 hover:border-black/20"
                }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-white/70 border border-white/30 bg-black/30">
                      {service.id}
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-white" />
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/80 leading-snug opacity-100 translate-y-0 transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 line-clamp-3">
                      {service.description}{" "}
                      <Link
                        href="/services"
                        className="font-semibold underline hover:text-white transition-colors"
                      >
                        Read More
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
