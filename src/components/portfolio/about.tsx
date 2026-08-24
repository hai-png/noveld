"use client";

import { useEffect, useRef } from "react";

export function About() {
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="reveal relative py-24 sm:py-32 lg:py-40 border-t border-white/5">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">01 — Profile</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight">
              Professional Background
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
              Lead 3D Architectural Visualizer with over 6 years of specialized
              experience transforming architectural blueprints, CAD designs,
              and BIM models into photorealistic 4K/8K imagery, cinematic
              animations, and real-time interactive walkthroughs. Partnering
              with architects, developers, interior designers, and commercial
              studios worldwide to bring unbuilt spaces to life.
            </p>
            <p className="mt-6 text-base sm:text-lg text-white/55 leading-relaxed">
              Collaborating with leading architectural firms, property
              developers, interior designers, and commercial developers to
              bring architectural visions to life before the ground is broken.
              Every visualization is crafted with strict attention to lighting
              physics, material tactile quality, and architectural proportions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
