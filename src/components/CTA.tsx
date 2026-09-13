"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

// Configuration for animated floating gold & rose balloons
const balloons = [
  {
    size: "w-4 h-4",
    top: "15%",
    left: "12%",
    duration: 6,
    delay: 0,
    x: [0, 20, -15, 0],
    y: [0, -25, 10, 0],
  },
  {
    size: "w-6 h-6",
    top: "25%",
    left: "80%",
    duration: 8,
    delay: 1,
    x: [0, -30, 15, 0],
    y: [0, 20, -20, 0],
  },
  {
    size: "w-3 h-3",
    top: "65%",
    left: "18%",
    duration: 7,
    delay: 0.5,
    x: [0, 15, -20, 0],
    y: [0, -15, 25, 0],
  },
  {
    size: "w-5 h-5",
    top: "70%",
    left: "75%",
    duration: 9,
    delay: 2,
    x: [0, -20, 25, 0],
    y: [0, -30, 15, 0],
  },
  {
    size: "w-4 h-4",
    top: "40%",
    left: "88%",
    duration: 6.5,
    delay: 1.5,
    x: [0, -15, -10, 0],
    y: [0, 25, -15, 0],
  },
  {
    size: "w-5 h-5",
    top: "30%",
    left: "8%",
    duration: 7.5,
    delay: 0.8,
    x: [0, 25, -10, 0],
    y: [0, -20, 20, 0],
  },
];

export default function CTA() {
  const { isDark } = useTheme();

  return (
    <Section
      className={`py-28 px-6 relative overflow-hidden border-0 transition-colors duration-500 ${
        isDark
          ? "bg-neutral-900 text-white min-h-[80vh]"
          : "bg-white text-black border-black/10"
      }`}
    >
      {/* Ambient Radial Background Blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] ${
            isDark ? "bg-[#D4AF37]/5" : "bg-[#D4AF37]/10"
          }`}
        />

        {/* Floating Gold-to-Rose Balloons */}
        {balloons.map((balloon, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full bg-gradient-to-tr from-[#E6C594] via-[#D4AF37] to-[#E2B2A2] shadow-[0_0_12px_rgba(212,175,55,0.4)] ${balloon.size}`}
            style={{ top: balloon.top, left: balloon.left }}
            animate={{
              x: balloon.x,
              y: balloon.y,
              opacity: [0.2, 0.9, 0.3, 0.9, 0.2],
              scale: [0.9, 1.15, 0.95, 1.1, 0.9],
            }}
            transition={{
              duration: balloon.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: balloon.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heading Animation */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-sans text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6"
        >
          Start Your Journey with{" "}
          <span className="inline-flex items-baseline gap-1 uppercase">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E6C594] to-[#E2B2A2] bg-clip-text text-transparent">
              Hiwot
            </span>
          </span>
        </motion.h2>

        {/* Subtitle Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`font-sans text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10 transition-colors duration-500 ${
            isDark ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          Take the next step toward experiencing bespoke beauty tailored to your
          essence through personalized consultations, expert artistry, and
          timeless elegance.
        </motion.p>

        {/* Single CTA Button Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Link href="/contact">
            <Button variant="primary">Book Appointment</Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
