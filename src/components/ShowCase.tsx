"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function ShowcaseSection() {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showcaseItems = [
    { id: 1, image: "/images/showcase-1.jpg", alt: "Winter Couture" },
    { id: 2, image: "/images/showcase-2.jpg", alt: "Accessories" },
    { id: 3, image: "/images/showcase-3.jpg", alt: "Summer Couture" },
    { id: 4, image: "/images/showcase-4.jpg", alt: "Jewelry" },
    { id: 5, image: "/images/showcase-5.jpg", alt: "Bridal Artistry" },
    { id: 6, image: "/images/showcase-6.jpg", alt: "Editorial Glam" },
  ];

  const totalSteps = showcaseItems.length - 3;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= totalSteps ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section
      className={`w-full pt-6 pb-12 px-6 transition-colors duration-500 overflow-hidden ${
        isDark
          ? "bg-[#070403] text-[#F5F2EB]"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header Block — Updated heading to complement reviews */}
        <div className="flex items-center justify-between border-b pb-4 border-current/10">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tighter uppercase">
            <span>Client </span>
            <span
              className={
                isDark
                  ? "bg-gradient-to-r from-[#D4AF37] via-[#E6C594] to-[#E2B2A2] bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#B8860B] bg-clip-text text-transparent"
              }
            >
              Transformations
            </span>
          </h2>
        </div>

        {/* Sliding Cards Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / 4 + 0.5)}%)`,
            }}
          >
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className="min-w-[calc(100%-1.5rem)] sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] flex-shrink-0 group cursor-pointer"
              >
                {/* Image Card Without Captions */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 bg-black/5 shadow-md">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Step Indicators */}
        <div className="flex flex-col items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              {Array.from({ length: totalSteps + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? "w-8 bg-[#D4AF37]"
                      : `w-2 ${isDark ? "bg-white/20" : "bg-black/20"}`
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
