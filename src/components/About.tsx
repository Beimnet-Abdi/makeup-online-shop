"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// Smooth luxury easing curve [cubic-bezier]
const luxuryEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

// Stagger container variant for text elements
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Text elements animation
const textItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
};

// Image animation with blur, scale, and fade-up
const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: luxuryEase,
    },
  },
};

export default function AboutSection() {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative w-full pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden px-6 lg:px-16 transition-colors duration-500 ${
        isDark ? "bg-[#0D0B0A] text-[#F5F2EB]" : "bg-[#F5ECE8] text-[#1C1613]"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Pill / Badge */}
          <motion.div variants={textItemVariants} className="mb-6 sm:mb-8">
            <span
              className={`inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-light tracking-wide backdrop-blur-md transition-colors duration-500 ${
                isDark
                  ? "bg-white/5 border border-white/10 text-[#E0D8CC]"
                  : "bg-black/5 border border-black/10 text-[#52433D]"
              }`}
            >
              About RUTBA Makeup Artist
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={textItemVariants}
            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Shaping Beauty <br />
            Through{" "}
            <span className="bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#C59B27] bg-clip-text text-transparent">
              Artistry
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={textItemVariants}
            className={`font-sans text-base sm:text-lg font-light leading-relaxed max-w-lg mb-10 transition-colors duration-500 ${
              isDark ? "text-[#B5AEA5]" : "text-[#52433D]"
            }`}
          >
            Creating timeless beauty through precision, technique, and a deep
            understanding of every unique face. Dedicated to elevating natural
            features into bespoke editorial perfection.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={textItemVariants}>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase text-[#0D0B0A] bg-gradient-to-r from-[#E6C594] to-[#D4AF37] hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#D4AF37]/10"
            >
              Discover My Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Image Container */}
        <motion.div
          className={`lg:col-span-6 relative w-full h-[480px] sm:h-[600px] lg:h-[680px] rounded-3xl overflow-hidden transition-all duration-500 ${
            isDark
              ? "bg-white/5 border border-white/10"
              : "bg-black/5 border border-black/10 shadow-xl"
          }`}
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Image
            src="/images/AboutHero.jpg"
            alt="RUTBA Editorial Makeup Artistry"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Theme-Adaptive Subtle Gradient Overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
              isDark
                ? "bg-gradient-to-t from-[#0D0B0A]/40 via-transparent to-transparent"
                : "bg-gradient-to-t from-[#F5ECE8]/30 via-transparent to-transparent"
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
}
