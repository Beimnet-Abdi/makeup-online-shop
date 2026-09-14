"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 md:px-12",
        scrolled
          ? isDark
            ? "bg-[#0D0B0A]/85 backdrop-blur-md py-3 border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-[#F5ECE8]/85 backdrop-blur-md py-3 border-b border-black/10 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* RUTBA Logo */}
        <Link
          href="/"
          className={cn(
            "text-2xl font-black tracking-tighter uppercase transition-colors duration-300",
            isDark ? "text-[#F5F2EB]" : "text-[#1C1613]",
          )}
        >
          <sup className="text-[#D4AF37] text-sm font-bold tracking-tight">
            by
          </sup>
          Hiwot
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                isDark
                  ? "text-[#E0D8CC] hover:text-[#FFFFFF]"
                  : "text-[#1C1613] hover:text-[#000000]",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Controls (With Theme Toggle Included) */}
        <div
          className={cn(
            "hidden md:flex items-center gap-4 transition-colors duration-300",
            isDark ? "text-[#F5F2EB]" : "text-[#1C1613]",
          )}
        >
          <ThemeToggle />
          <Button
            variant="primary"
            className="px-6 py-2 text-xs uppercase font-semibold"
          >
            Book an Appointment
          </Button>
        </div>

        {/* Mobile Controls */}
        <div
          className={cn(
            "flex items-center gap-2 md:hidden transition-colors duration-300",
            isDark ? "text-[#F5F2EB]" : "text-[#1C1613]",
          )}
        >
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "p-2 transition-colors duration-300",
              isDark ? "text-[#F5F2EB]" : "text-[#1C1613]",
            )}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "md:hidden backdrop-blur-lg border-t mt-4 rounded-b-2xl overflow-hidden transition-colors duration-300",
              isDark
                ? "bg-[#0D0B0A]/95 border-white/10"
                : "bg-[#F5ECE8]/95 border-black/10 shadow-xl",
            )}
          >
            <nav className="flex flex-col py-6 px-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-bold py-2 uppercase tracking-wider transition-colors duration-300",
                    isDark
                      ? "text-[#E0D8CC] hover:text-[#FFFFFF]"
                      : "text-[#1C1613] hover:text-[#000000]",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 flex items-center justify-between gap-4">
                <Link href="/contact">
                  <Button
                    variant="primary"
                    className="w-full text-xs uppercase font-semibold"
                  >
                    Book an Appointment
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
