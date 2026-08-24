"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-44 pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            Available for Projects
          </span>
        </div>

        <h1 className="mt-8 sm:mt-12 font-display font-medium leading-[0.85] tracking-[-0.02em] text-[16vw] sm:text-[14vw] lg:text-[11.5vw] xl:text-[160px]">
          <span className="block">Esknder</span>
          <span className="block text-stroke text-stroke-fillable">Zinabie</span>
        </h1>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-display text-2xl sm:text-3xl text-white/85 leading-snug">
              Lead 3D Architectural Visualizer & CG Artist
            </p>
            <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-white/45">
              Addis Ababa, Ethiopia / Remote Worldwide
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="mailto:ethiohagerai@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-950 hover:scale-[1.02] transition-transform"
              data-cursor="hover"
            >
              Email
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="https://t.me/EsknderArchviz"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 hover:bg-white/5 transition-colors"
              data-cursor="hover"
            >
              Telegram
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl">
          <StatBlock value="6+" label="Years Experience" />
          <StatBlock value="120+" label="Projects Delivered" />
          <StatBlock value="45+" label="Cinematic Reels" />
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white tabular-nums leading-none">
        {value}
      </p>
      <p className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/45">
        {label}
      </p>
    </div>
  );
}
