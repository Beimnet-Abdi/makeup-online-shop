"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6 md:px-10 lg:px-14"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-colors duration-300 hover:border-cream/50"
          aria-label="HIWOT home"
        >
          <span className="font-serif text-xl leading-none tracking-wide text-cream transition-colors duration-300 group-hover:text-white">
            H
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex lg:gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-[13px] font-light tracking-[0.08em] text-cream/80 transition-colors duration-300 hover:text-cream after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-cream/70 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-cream transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-cream transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-cream transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-bg/98 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-serif text-3xl tracking-wide text-cream/90 transition-colors duration-300 hover:text-cream"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
