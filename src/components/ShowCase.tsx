"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabaseClient";

interface ShowcaseItem {
  id: string;
  title: string | null;
  image: string;
}

export default function ShowcaseSection() {
  const { isDark } = useTheme();
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch transformations dynamically from Supabase
  useEffect(() => {
    async function loadShowcase() {
      try {
        const { data, error } = await supabase
          .from("transformations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setItems(data);
      } catch (err) {
        console.error("Error loading showcase items:", err);
      } finally {
        setLoading(false);
      }
    }

    loadShowcase();
  }, []);

  // Update active indicator dot on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth
      : container.clientWidth;

    const newIndex = Math.round(scrollPosition / itemWidth);
    setActiveIndex(newIndex);
  };

  // Scroll to selected item when clicking indicator dot
  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const child = container.children[index] as HTMLElement;
    if (child) {
      container.scrollTo({
        left: child.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={`w-full pt-6 pb-12 px-6 transition-colors duration-500 overflow-hidden ${
        isDark
          ? "bg-[#070403] text-[#F5F2EB]"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header Block */}
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

        {loading ? (
          <div className="flex justify-center items-center h-64 text-sm text-neutral-400">
            Loading showcase...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-sm text-neutral-500">
            No transformation photos added yet.
          </div>
        ) : (
          <div className="relative w-full space-y-6">
            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] flex-shrink-0 snap-center group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 bg-black/5 shadow-md">
                    <Image
                      src={item.image}
                      alt={item.title || "Transformation Look"}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {item.title && (
                    <p className="mt-2 text-xs font-semibold tracking-wider uppercase opacity-80 truncate">
                      {item.title}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Dots Indicator */}
            {items.length > 1 && (
              <div className="flex justify-center items-center gap-2 pt-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "w-8 bg-[#D4AF37]"
                        : "w-2.5 bg-neutral-600/40 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
