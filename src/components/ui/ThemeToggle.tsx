"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme();

  // Support both context API styles (`theme === "dark"` or boolean `isDark`)
  const activeIsDark = isDark ?? theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full border transition-all duration-300 backdrop-blur-sm",
        activeIsDark
          ? "bg-white/5 border-white/20 hover:border-white/40 text-white"
          : "bg-black/5 border-black/20 hover:border-black/40 text-[#1C1613]",
      )}
      aria-label={activeIsDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: activeIsDark ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {activeIsDark ? (
          <Moon className="w-4 h-4 text-[#F5F2EB]" />
        ) : (
          <Sun className="w-4 h-4 text-[#1C1613]" />
        )}
      </motion.div>
    </motion.button>
  );
}
