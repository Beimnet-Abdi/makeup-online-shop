"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          {
            "bg-gradient-to-r from-[#E6C594] via-[#F3D2B1] to-[#E2B2A2] text-[#1C1613] border border-white/40 shadow-[0_4px_20px_rgba(230,197,148,0.25)] hover:brightness-105 hover:shadow-[0_6px_25px_rgba(230,197,148,0.4)]":
              variant === "primary",
            "bg-transparent text-[#F5F2EB] border border-[#E6C594]/60 hover:bg-[#E6C594]/10 hover:border-[#E6C594]":
              variant === "secondary",
            "bg-transparent text-[#F5F2EB] border border-white/20 hover:border-white/50 hover:bg-white/5":
              variant === "outline",
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
