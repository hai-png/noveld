"use client";

import { useMemo, useState } from "react";
import { PROJECTS, type CategoryId, type Project } from "@/lib/projects";
import { ProjectCard, Lightbox } from "./project-card";
import { FilterBar } from "./filter-bar";

function formatCategoryLabel(id: CategoryId): string {
  const parts = id.split("_").slice(1).join("_");
  if (!parts) return id;
  return parts
    .toLowerCase()
    .replace(/(^|_)([a-z])/g, (_m, _s, c) => " " + c.toUpperCase())
    .replace(" andrestaurant", " & Restaurant")
    .replace(" resort", " & Resort")
    .trim();
}

export function ProjectGrid() {
  const [active, setActive] = useState<"all" | CategoryId>("all");
  const [lightbox, setLightbox] = useState<{ project: Project; start: number } | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PROJECTS.length };
    for (const p of PROJECTS) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className="relative">
      <FilterBar active={active} onChange={setActive} counts={counts} />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20">
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              04 — Selected Work · {String(filtered.length).padStart(2, "0")}{" "}
              {filtered.length === 1 ? "Entry" : "Entries"}
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
              {active === "all" ? "Selected Work" : formatCategoryLabel(active)}
            </h2>
          </div>
          <p className="text-sm text-white/55 max-w-md leading-relaxed">
            Hover any frame to step through the gallery. Videos autoplay on
            hover; click View to open the full gallery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpenLightbox={(project, start) => setLightbox({ project, start })}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-white/40">No entries in this category yet.</div>
        )}
      </div>

      {lightbox && (
        <Lightbox
          key={lightbox.project.id}
          project={lightbox.project}
          start={lightbox.start}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
