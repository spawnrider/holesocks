"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LEVELS = [
  { href: "/catalogue?level=1", label: "Léger" },
  { href: "/catalogue?level=2", label: "Aéré" },
  { href: "/catalogue?level=3", label: "Catastrophe" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out ${
        scrolled
          ? "h-[52px] bg-creme/95 backdrop-blur-sm border-b border-charbon/10 shadow-sm"
          : "h-[72px] bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-display tracking-wide transition-all duration-200 ${
            scrolled ? "text-2xl text-charbon" : "text-3xl text-charbon"
          }`}
        >
          HOLESOCKS
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {LEVELS.map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                className="font-ui font-semibold text-sm uppercase tracking-wider text-charbon hover:text-terra transition-colors duration-150"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <Link
          href="/catalogue"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-charbon text-creme font-ui font-bold text-sm uppercase tracking-wider rounded hover:bg-terra transition-colors duration-150"
        >
          Explorer
        </Link>

        {/* Mobile — simple link */}
        <Link
          href="/catalogue"
          className="md:hidden font-ui font-bold text-sm uppercase tracking-wider text-charbon"
          aria-label="Voir le catalogue"
        >
          Catalogue →
        </Link>
      </nav>
    </header>
  );
}
