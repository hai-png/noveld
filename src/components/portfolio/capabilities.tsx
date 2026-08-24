"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const CAPABILITIES: string[] = [
  "High-Resolution 4K/8K Exterior Renderings",
  "Atmospheric Interior CGI & Material Staging",
  "Cinematic 3D Video Walkthroughs & Flyovers",
  "Real-Time Unreal Engine 5 Interactive Tours",
  "Drone Aerial Photomontage & Masterplans",
  "Day-to-Dusk & Twilight Lighting Transformations",
  "Pre-Construction Marketing Visual Packages",
  "Architectural Competition Presentation Graphics",
];

export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="capabilities" ref={ref} className="reveal relative py-24 sm:py-32 lg:py-40 border-t border-white/5">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">03 — Services</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">Visualization Capabilities</h2>
        </div>

        <ul className="divide-y divide-white/5 border-y border-white/5">
          {CAPABILITIES.map((cap, i) => (
            <li key={cap}>
              <a href="#contact" className="group flex items-center justify-between gap-4 py-6 sm:py-7" data-cursor="hover">
                <div className="flex items-center gap-6 sm:gap-10 min-w-0">
                  <span className="font-sarpanch text-sm text-white/35 tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl text-white/70 group-hover:text-white transition-colors duration-300 truncate">
                    {cap}
                  </span>
                </div>
                <span className="shrink-0 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 text-white/40 group-hover:border-white group-hover:bg-white group-hover:text-neutral-950 transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
