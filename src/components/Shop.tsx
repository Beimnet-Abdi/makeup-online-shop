"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  category: string | null;
  price: string;
  description: string | null;
  image: string;
}

export default function Shop() {
  const { isDark } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products live from Supabase
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, category, price, description, image")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Section
      id="shop"
      className={`py-24 px-6 border-t transition-colors duration-500 ${
        isDark
          ? "bg-black text-white border-white/10"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16 border-b border-white/10 pb-8">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-[#E6C594]/10 text-[#D4AF37] border border-[#D4AF37]/20">
            <span className="inline-flex items-center">
              <span className="text-[0.65em] align-top text-[#D4AF37]">BY</span>
              <span>HIWOT Professional Shop</span>
            </span>
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter leading-none whitespace-nowrap flex justify-center items-center gap-x-2 sm:gap-x-3">
            <span>Essentials Beauty</span>
            <span className="bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#C59B27] bg-clip-text text-transparent">
              Collection
            </span>
          </h2>

          <p
            className={`text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto pt-2 transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Professional tools and products curated by RUTBA Beauty Academy for
            artists who demand excellence.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group rounded-3xl overflow-hidden p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border shadow-xl ${
                isDark
                  ? "bg-[#141210] border-white/10 text-white shadow-black/80 hover:border-[#D4AF37]/40"
                  : "bg-neutral-100/90 border-neutral-200 text-neutral-900 shadow-neutral-200/50 hover:border-[#D4AF37]/50"
              }`}
            >
              {/* Image Container */}
              <div className="relative w-[calc(100%+2rem)] -mx-4 -mt-4 h-72 sm:h-80 overflow-hidden bg-neutral-200/50 mb-4 rounded-t-3xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-[#0D0B0A]/80 backdrop-blur-md text-[#E6C594] text-xs font-semibold px-3 py-1 rounded-full border border-white/10 z-10">
                  {product.price}
                </span>
              </div>

              {/* Card Details */}
              <div className="space-y-3 text-center flex-1 flex flex-col justify-between pt-1">
                <div>
                  {product.category && (
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37] mb-1">
                      {product.category}
                    </p>
                  )}
                  <h3
                    className={`font-sans text-xl font-bold leading-snug ${
                      isDark ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {product.name}
                  </h3>
                  {product.description && (
                    <p
                      className={`text-xs font-light mt-1.5 leading-relaxed line-clamp-2 ${
                        isDark ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Animated Order Link with Primary Gold Color & Sliding Arrow */}
                <div className="pt-3 pb-1">
                  <a
                    href="#contact"
                    className="group/link inline-flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase text-[#D4AF37] hover:text-[#E6C594] transition-colors duration-300"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5 animate-pulse" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
