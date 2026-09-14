"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Section from "@/components/ui/Section";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabaseClient";

interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  short_description: string;
  fg_image: string;
}

export default function HomeServices() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from("services")
        .select("id, tag, title, short_description, fg_image")
        .order("sort_order", { ascending: true });

      if (data) setServicesList(data);
    }
    fetchServices();
  }, []);

  return (
    <Section
      id="services"
      className={isDark ? "bg-black text-white" : "bg-white text-black"}
    >
      <div className="max-w-7xl mx-auto">
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

        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {servicesList.map((service, index) => {
              // Formats index as 01, 02, 03... instead of service.id
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={service.id}
                  onClick={() => router.push(`/services#${service.id}`)}
                  className={`group relative aspect-[4/5] overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                    isDark
                      ? "bg-neutral-900 border-white/5 hover:border-white/20"
                      : "bg-neutral-100 border-black/5 hover:border-black/20"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.fg_image})` }}
                  />

                  <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-white/70 border border-white/30 bg-black/30">
                        {formattedIndex}
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-white" />
                    </div>

                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white mb-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        {service.title}
                      </h3>
                      <p className="text-xs text-white/80 leading-snug opacity-100 translate-y-0 transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 line-clamp-3">
                        {service.short_description}{" "}
                        <Link
                          href={`/services#${service.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="font-semibold underline hover:text-white transition-colors"
                        >
                          Read More
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
