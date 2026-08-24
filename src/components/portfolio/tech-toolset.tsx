"use client";

import { useEffect, useRef } from "react";

type Level = "Expert" | "Advanced";

interface Tool {
  name: string;
  category: string;
  level: Level;
}

const TOOLS: Tool[] = [
  { name: "D5 Render", category: "Raytracing / DLSS", level: "Expert" },
  { name: "Unreal Engine 5", category: "Lumen / Nanite", level: "Advanced" },
  { name: "Autodesk Revit & BIM", category: "Modeling Pipeline", level: "Expert" },
  { name: "3ds Max & Corona Renderer", category: "Photoreal CGI", level: "Expert" },
  { name: "Twinmotion", category: "Real-Time Tours", level: "Advanced" },
  { name: "SketchUp Pro & Rhino 3D", category: "Conceptual Modeling", level: "Expert" },
  { name: "Adobe Photoshop", category: "Color Grading & Post", level: "Expert" },
  { name: "Premiere Pro & After Effects", category: "Cinematic Editing", level: "Advanced" },
  { name: "Chaos Vantage & V-Ray", category: "Real-Time + Offline GI", level: "Advanced" },
  { name: "Drone Aerial & Photomontage", category: "Site Integration", level: "Expert" },
];

export function TechToolset() {
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
    <section id="tools" ref={ref} className="reveal relative py-24 sm:py-32 lg:py-40 border-t border-white/5">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">02 — Pipeline</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">Technical Toolset</h2>
          </div>
          <p className="text-sm text-white/55 max-w-md leading-relaxed">
            Industry-standard tools across the full visualization pipeline — from BIM ingestion to final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const isExpert = tool.level === "Expert";
  return (
    <div
      className="group relative rounded-xl border border-white/8 bg-white/[0.015] p-5 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
      data-cursor="hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl sm:text-2xl text-white truncate">{tool.name}</h3>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/45">{tool.category}</p>
        </div>
        <span
          className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full ${
            isExpert ? "bg-white text-neutral-950" : "border border-white/20 text-white/70"
          }`}
        >
          {tool.level}
        </span>
      </div>
      <div className="mt-5 h-px w-full bg-white/8 overflow-hidden">
        <div
          className={`h-full transition-all duration-700 group-hover:w-full ${
            isExpert ? "w-[95%] bg-white" : "w-[75%] bg-white/45"
          }`}
        />
      </div>
    </div>
  );
}
