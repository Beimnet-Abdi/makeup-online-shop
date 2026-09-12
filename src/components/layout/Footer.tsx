"use client";

import Link from "next/link";
import SocialIcon from "@/components/ui/SocialIcon";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`py-16 border-t transition-colors duration-500 ${
        isDark
          ? "bg-black text-white border-white/10"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
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
            <p
              className={`text-sm max-w-xs transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              Crafting bespoke makeup artistry and timeless beauty experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className={`transition-colors text-sm ${
                  isDark
                    ? "text-neutral-400 hover:text-[#D4AF37]"
                    : "text-neutral-600 hover:text-[#D4AF37]"
                }`}
              >
                Our Story
              </Link>
              <Link
                href="/services"
                className={`transition-colors text-sm ${
                  isDark
                    ? "text-neutral-400 hover:text-[#D4AF37]"
                    : "text-neutral-600 hover:text-[#D4AF37]"
                }`}
              >
                Services
              </Link>
              <Link
                href="/shop"
                className={`transition-colors text-sm ${
                  isDark
                    ? "text-neutral-400 hover:text-[#D4AF37]"
                    : "text-neutral-600 hover:text-[#D4AF37]"
                }`}
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className={`transition-colors text-sm ${
                  isDark
                    ? "text-neutral-400 hover:text-[#D4AF37]"
                    : "text-neutral-600 hover:text-[#D4AF37]"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              Connect With Us
            </h4>
            <div className="flex gap-3">
              <SocialIcon
                platform="whatsapp"
                href="https://wa.me/251900000000"
              />
              <SocialIcon
                platform="telegram"
                href="https://t.me/rutbaartistry"
              />
              <SocialIcon
                platform="instagram"
                href="https://instagram.com/rutbaartistry"
              />
              <SocialIcon
                platform="linkedin"
                href="https://linkedin.com/company/rutbaartistry"
              />
            </div>
            <p
              className={`text-sm mt-6 transition-colors duration-500 ${
                isDark ? "text-neutral-500" : "text-neutral-600"
              }`}
            >
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-500 ${
            isDark ? "border-white/10" : "border-black/10"
          }`}
        >
          <p
            className={`text-sm transition-colors duration-500 ${
              isDark ? "text-neutral-500" : "text-neutral-600"
            }`}
          >
            © {new Date().getFullYear()} RUTBA Artistry. All rights reserved.
          </p>
          <p
            className={`text-xs transition-colors duration-500 ${
              isDark ? "text-neutral-600" : "text-neutral-500"
            }`}
          >
            Crafted with ❤️ in Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
}
