"use client";

import { CATEGORIES, type CategoryId } from "@/lib/projects";

interface FilterBarProps {
  active: "all" | CategoryId;
  onChange: (id: "all" | CategoryId) => void;
  counts: Record<string, number>;
}

export function FilterBar({ active, onChange, counts }: FilterBarProps) {
  const cats: { id: "all" | CategoryId; label: string }[] = [
    { id: "all", label: "All Projects" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div
      id="work"
      className="sticky top-16 sm:top-20 z-20 -mx-px border-y border-white/5 bg-neutral-950/85 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="hide-scrollbar flex items-center gap-2 sm:gap-3 overflow-x-auto py-4">
          {cats.map((cat) => {
            const isActive = active === cat.id;
            const count = counts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] font-medium tracking-[0.08em] transition-all duration-300 ${
                  isActive
                    ? "bg-white text-neutral-950 border-white"
                    : "border-white/12 text-white/65 hover:border-white/40 hover:text-white"
                }`}
                data-cursor="hover"
              >
                <span
                  className={`inline-flex h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? "bg-neutral-950" : "bg-white/30 group-hover:bg-white"
                  }`}
                />
                {cat.label}
                <span className={`text-[10px] tabular-nums ${isActive ? "text-neutral-500" : "text-white/35"}`}>
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
