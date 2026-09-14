"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabaseClient";

interface ServiceDetail {
  id: string;
  tag: string;
  title: string;
  full_description: string;
  bg_image: string;
  fg_image: string;
}

export default function Services() {
  const { isDark } = useTheme();
  const [servicesList, setServicesList] = useState<ServiceDetail[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from("services")
        .select("id, tag, title, full_description, bg_image, fg_image")
        .order("sort_order", { ascending: true });

      if (data) setServicesList(data);
    }
    fetchServices();
  }, []);

  return (
    <Section
      id="services"
      className={`py-24 px-6 border-t transition-colors duration-500 ${
        isDark
          ? "bg-black text-white border-white/10"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-32">
        {servicesList.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={service.id}
              id={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24"
            >
              <div
                className={`lg:col-span-5 space-y-4 ${
                  isEven ? "order-1" : "order-1 lg:order-2"
                }`}
              >
                <span className="font-sans text-xs font-medium text-[#D4AF37] uppercase tracking-[0.25em] block">
                  {service.tag}
                </span>
                <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
                  <span
                    className={
                      isDark
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#E6C594] to-[#E2B2A2] bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#E2B2A2] bg-clip-text text-transparent"
                    }
                  >
                    {service.title}
                  </span>
                </h2>
                <p
                  className={`font-sans text-sm md:text-base font-light leading-relaxed pt-2 transition-colors duration-500 ${
                    isDark ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  {service.full_description}
                </p>
              </div>

              <div
                className={`lg:col-span-7 relative flex ${
                  isEven
                    ? "justify-end order-2"
                    : "justify-start order-2 lg:order-1"
                }`}
              >
                <div
                  className={`relative w-2/3 h-[320px] md:h-[420px] rounded-2xl overflow-hidden filter grayscale transition-opacity duration-500 ${
                    isDark ? "opacity-30" : "opacity-20"
                  }`}
                >
                  {service.bg_image && (
                    <Image
                      src={service.bg_image}
                      alt={`${service.title} background`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>

                <div
                  className={`absolute top-8 ${
                    isEven ? "left-4 md:left-12" : "right-4 md:right-12"
                  } w-2/3 h-[300px] md:h-[400px] rounded-2xl overflow-hidden border shadow-2xl z-10 transition-colors duration-500 ${
                    isDark
                      ? "border-white/10 shadow-black/50"
                      : "border-black/10 shadow-neutral-300"
                  }`}
                >
                  {service.fg_image && (
                    <Image
                      src={service.fg_image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
