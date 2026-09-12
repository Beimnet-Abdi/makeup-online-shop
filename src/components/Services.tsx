"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import { useTheme } from "@/context/ThemeContext";

const servicesList = [
  {
    id: "bridal",
    tag: "Timeless & Elegant",
    title: "BRIDAL MAKEUP",
    description:
      "A timeless and elegant bridal look designed to make you feel confident and beautiful on your special day. From flawless skin to perfectly defined eyes, every detail is carefully crafted to complement your features, dress, and personal style.",
    bgImage: "/images/bridal-bg.jpg",
    fgImage: "/images/bridal-fg.jpg",
  },
  {
    id: "event",
    tag: "Unforgettable Occasions",
    title: "EVENT & PARTY MAKEUP",
    description:
      "Get ready to make an impression. Whether it’s a birthday, engagement, dinner, celebration, or special occasion, your look is customized to match the event and leave you feeling effortlessly beautiful.",
    bgImage: "/images/event-bg.jpg",
    fgImage: "/images/event-fg.jpg",
  },
  {
    id: "soft-glam",
    tag: "Effortless Polish",
    title: "SOFT GLAM MAKEUP",
    description:
      "A beautifully balanced look that enhances your natural features with glowing skin, softly defined eyes, and elegant details. Perfect for those who want a polished and sophisticated look without feeling overly made up.",
    bgImage: "/images/softglam-bg.jpg",
    fgImage: "/images/softglam-fg.jpg",
  },
  {
    id: "photoshoot",
    tag: "Lens & Lighting Ready",
    title: "PHOTOSHOOT MAKEUP",
    description:
      "Camera-ready makeup designed to look flawless under professional lighting and through the lens. From complexion perfection to carefully defined features, every detail is created to photograph beautifully.",
    bgImage: "/images/photoshoot-bg.jpg",
    fgImage: "/images/photoshoot-fg.jpg",
  },
  {
    id: "kit",
    tag: "Essentials & Tools",
    title: "MAKEUP KIT",
    description:
      "Everything you need to create your perfect look. Explore carefully selected makeup tools and essentials, from brushes and applicators to beauty accessories, chosen to help you achieve professional-looking results with ease.",
    bgImage: "/images/kit-bg.jpg",
    fgImage: "/images/kit-fg.jpg",
  },
];

export default function Services() {
  const { isDark } = useTheme();

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
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Text Content */}
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
                  {service.description}
                </p>
              </div>

              {/* Image Collage */}
              <div
                className={`lg:col-span-7 relative flex ${
                  isEven
                    ? "justify-end order-2"
                    : "justify-start order-2 lg:order-1"
                }`}
              >
                {/* Background Monochromatic Image */}
                <div
                  className={`relative w-2/3 h-[320px] md:h-[420px] rounded-2xl overflow-hidden filter grayscale transition-opacity duration-500 ${
                    isDark ? "opacity-30" : "opacity-20"
                  }`}
                >
                  <Image
                    src={service.bgImage}
                    alt={`${service.title} secondary background`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Foreground Colored Overlapping Image */}
                <div
                  className={`absolute top-8 ${
                    isEven ? "left-4 md:left-12" : "right-4 md:right-12"
                  } w-2/3 h-[300px] md:h-[400px] rounded-2xl overflow-hidden border shadow-2xl z-10 transition-colors duration-500 ${
                    isDark
                      ? "border-white/10 shadow-black/50"
                      : "border-black/10 shadow-neutral-300"
                  }`}
                >
                  <Image
                    src={service.fgImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
