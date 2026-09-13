"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const luxuryEase: [number, number, number, number] = [0.25, 1, 0.5, 1];
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: luxuryEase,
    },
  },
};

export default function CeoSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="ceo-section"
      className={`relative w-full py-20 lg:py-32 px-6 lg:px-16 border-t transition-colors duration-500 overflow-hidden ${
        isDark
          ? "bg-black text-white border-white/10"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Portrait Image Frame */}
        <motion.div
          className={`lg:col-span-5 relative w-full h-[450px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden border shadow-2xl transition-colors duration-500 ${
            isDark
              ? "bg-neutral-900 border-white/10"
              : "bg-neutral-100 border-black/10"
          }`}
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Image
            src="/images/hiwot-portrait.jpg"
            alt="Hiwot - RUTBA Founder & Lead Artist"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
          />
          {/* Overlay gradient for depth */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isDark
                ? "bg-gradient-to-t from-black/50 via-transparent to-transparent"
                : "bg-gradient-to-t from-black/20 via-transparent to-transparent"
            }`}
          />
        </motion.div>

        {/* Right Side: Text & Story Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Subheading Badge / Label */}
          <motion.span
            variants={textItemVariants}
            className="text-xs sm:text-sm font-sans font-medium tracking-[0.25em] text-[#D4AF37] uppercase mb-2"
          >
            Founder & Lead Artist
          </motion.span>

          {/* Main Title - Adjusted font weight & size */}
          <motion.h2
            variants={textItemVariants}
            className="font-sans text-3xl md:text-5xl font-semibold tracking-tight mb-5"
          >
            MEET{" "}
            <span
              className={
                isDark
                  ? "bg-gradient-to-r from-[#D4AF37] via-[#E6C594] to-[#E2B2A2] bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#E2B2A2] bg-clip-text text-transparent"
              }
            >
              HIWOT
            </span>
          </motion.h2>

          {/* Story Paragraph 1 - Reduced font size/weight */}
          <motion.p
            variants={textItemVariants}
            className={`font-sans text-sm sm:text-base font-normal leading-relaxed mb-4 transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Hello, I’m Hiwot. My journey began in Hawassa, where I developed a
            passion for beauty and creativity from a young age. I have always
            been fascinated by how small details can transform the way someone
            looks and, more importantly, how they can make someone feel more
            confident.
          </motion.p>

          {/* Story Paragraph 2 - Reduced font size/weight */}
          <motion.p
            variants={textItemVariants}
            className={`font-sans text-sm sm:text-base font-normal leading-relaxed mb-8 transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Two years ago, I moved to Addis Ababa, bringing with me a strong
            desire to build something of my own. I started my journey as a
            businesswoman in the fashion industry, selling clothes and exploring
            my love for style and beauty. Through that experience, I discovered
            that makeup was more than just another interest—it was something I
            truly wanted to pursue.
          </motion.p>
          {/* Story Paragraph 3 - Reduced font size/weight */}
          <motion.p
            variants={textItemVariants}
            className={`font-sans text-sm sm:text-base font-normal leading-relaxed mb-8 transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Today, my goal is to bring together my love for beauty, fashion, and
            creativity to create makeup looks that enhance natural features and
            make every client feel confident, elegant, and beautiful. For me,
            makeup is not about changing who you are—it’s about bringing out the
            beauty that is already there.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={textItemVariants}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase text-[#0D0B0A] bg-gradient-to-r from-[#E6C594] to-[#D4AF37] hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#D4AF37]/10"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
