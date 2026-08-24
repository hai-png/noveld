"use client";

const ITEMS = [
  "4K / 8K Stills",
  "Cinematic Walkthroughs",
  "Aerial Animation",
  "Unreal Engine 5 Tours",
  "Interior Visualization",
  "Exterior Visualization",
  "Drone Photomontage",
  "Day-to-Dusk Transitions",
  "BIM to Render",
  "Competition Graphics",
];

export function Marquee() {
  const list = [...ITEMS, ...ITEMS];
  return (
    <section aria-hidden className="relative border-y border-white/5 py-5 sm:py-6 overflow-hidden bg-neutral-950">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {list.map((item, i) => (
          <span key={`${item}-${i}`} className="group inline-flex items-center gap-6 px-8">
            <span className="font-display text-2xl sm:text-3xl text-white/40 group-hover:text-white transition-colors">
              {item}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/20" />
          </span>
        ))}
      </div>
    </section>
  );
}
