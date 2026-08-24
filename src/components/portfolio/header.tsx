"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Tools", href: "#tools" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-6">
          <Link href="#" className="group flex items-center gap-3" data-cursor="hover">
            <LogoMark />
            <span className="font-sarpanch text-sm sm:text-base font-semibold tracking-[0.18em] uppercase">
              Esknder Zinabie
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-[13px] font-medium tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors"
                data-cursor="hover"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-cursor="hover"
          >
            <span className="text-xs">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-neutral-950/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-[1600px] px-5 sm:px-8 py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl py-2 text-white/80 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="6"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
        />
        <text
          x="20"
          y="27"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="15"
          fontWeight="600"
          fill="white"
        >
          EZ
        </text>
      </svg>
    </span>
  );
}
