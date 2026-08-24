"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SOCIALS = [
  { label: "Telegram", href: "https://t.me/EsknderArchviz" },
  { label: "Email", href: "mailto:ethiohagerai@gmail.com" },
];

const NAV = [
  { label: "About", href: "#about" },
  { label: "Tools", href: "#tools" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center">
                <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
                  <rect x="1" y="1" width="38" height="38" rx="6" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
                  <text x="20" y="27" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontWeight="600" fill="white">EZ</text>
                </svg>
              </span>
              <span className="font-sarpanch text-base font-semibold tracking-[0.18em] uppercase">
                Esknder Zinabie
              </span>
            </div>
            <p className="mt-6 max-w-md text-white/55 leading-relaxed">
              Lead 3D Architectural Visualizer & CG Artist. Transforming
              architectural blueprints, CAD designs, and BIM models into
              photorealistic 4K/8K imagery, cinematic animations, and real-time
              interactive walkthroughs.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-white/65 hover:text-white hover:border-white/35 transition-colors"
                  data-cursor="hover"
                >
                  {s.label}
                  <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-8">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">Navigate</h4>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-base text-white/75 hover:text-white transition-colors"
                    data-cursor="hover"
                  >
                    <span className="h-px w-4 bg-white/30 group-hover:w-8 group-hover:bg-white transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:col-start-11">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">Based in</h4>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              <li>Addis Ababa, Ethiopia</li>
              <li>Remote Worldwide</li>
              <li className="pt-2">
                <a
                  href="mailto:ethiohagerai@gmail.com"
                  className="text-white/85 hover:text-white transition-colors break-all"
                  data-cursor="hover"
                >
                  ethiohagerai@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            © 2024 Esknder Zinabie. All rights reserved.
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            Architectural Visualization · Addis Ababa
          </p>
        </div>
      </div>
    </footer>
  );
}
