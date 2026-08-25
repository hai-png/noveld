"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  Maximize2,
  X,
} from "lucide-react";
import type { Project, MediaItem } from "@/lib/projects";
import { posterFor } from "@/lib/projects";

// Prefix asset paths with the Next.js basePath (empty in dev, "/noveld" in prod)
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
function bp(src: string): string {
  if (!src.startsWith("/")) return src;
  return `${BASE_PATH}${src}`;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenLightbox?: (project: Project, start: number) => void;
}

export function ProjectCard({ project, index, onOpenLightbox }: ProjectCardProps) {
  const media = project.media;
  const poster = posterFor(project);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const next = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActive((v) => (v + 1) % media.length);
    },
    [media.length]
  );

  const prev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActive((v) => (v - 1 + media.length) % media.length);
    },
    [media.length]
  );

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const item = media[active];
    if (!item) return;
    const v = videoRefs.current[active];
    if (!v) return;
    if (item.isVideo && hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, hovered, media]);

  useEffect(() => {
    if (!hovered) {
      videoRefs.current.forEach((v) => v?.pause());
    }
  }, [hovered]);

  useEffect(() => {
    const nextIdx = (active + 1) % media.length;
    const item = media[nextIdx];
    if (item && !item.isVideo) {
      const img = new Image();
      img.src = item.src;
    }
  }, [active, media]);

  const openLightbox = () => onOpenLightbox?.(project, active);

  return (
    <article
      ref={cardRef}
      className="reveal group relative flex flex-col"
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-neutral-900 ring-1 ring-white/5 cursor-pointer"
        data-cursor="hover"
        onClick={openLightbox}
      >
        {media.map((item, i) => (
          <MediaSlide
            key={item.src}
            item={item}
            poster={poster?.src}
            isActive={i === active}
            isPrevious={i < active}
            onLoaded={() => setLoaded((m) => ({ ...m, [i]: true }))}
            videoRef={(el) => (videoRefs.current[i] = el)}
            loaded={loaded[i]}
          />
        ))}

        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 sm:p-5 pointer-events-none">
          <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 ring-1 ring-white/10">
            {project.categoryNumber} · {categoryLabel(project)}
          </span>
          <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] font-medium tabular-nums text-white/85 ring-1 ring-white/10">
            {String(active + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-2 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={prev}
              aria-label="Previous frame"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-950 hover:scale-105 transition-transform"
              data-cursor="hover"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next frame"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-950 hover:scale-105 transition-transform"
              data-cursor="hover"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={openLightbox}
            className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-950 hover:scale-[1.02] transition-transform"
            data-cursor="hover"
          >
            View
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {media.length >= 4 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {media.slice(0, 5).map((m, i) => (
              <button
                key={m.src}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                aria-label={`View frame ${i + 1}`}
                className={`relative h-12 w-9 overflow-hidden rounded-md ring-1 transition-all ${
                  i === active ? "ring-white scale-105" : "ring-white/30 opacity-70 hover:opacity-100"
                }`}
                data-cursor="hover"
              >
                {m.isVideo ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-white/85">
                    <Film className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <img src={bp(m.src)} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
              </button>
            ))}
            {media.length > 5 && (
              <span className="mt-1 inline-flex items-center justify-center rounded-md bg-black/55 backdrop-blur-md px-1 py-1 text-[9px] font-medium text-white/80 ring-1 ring-white/10">
                +{media.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 group-hover:opacity-0 transition-opacity">
          {hasVideo(project) && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white/85 ring-1 ring-white/15">
              <Film className="h-3 w-3" />
              {countVideos(project)}
            </span>
          )}
          {media.length > 1 && (
            <span className="inline-flex items-center justify-center h-7 px-2 rounded-full bg-black/55 backdrop-blur-md text-[11px] font-medium text-white/85 ring-1 ring-white/15">
              +{media.length - 1}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-2xl sm:text-3xl leading-tight tracking-tight text-white truncate">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-white/45">
            {project.scale} · {project.location}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-sarpanch text-sm font-medium text-white/85 tabular-nums">
            {project.year}
          </p>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/35">
            {media.length} {media.length === 1 ? "frame" : "frames"}
          </p>
        </div>
      </div>
    </article>
  );
}

interface MediaSlideProps {
  item: MediaItem;
  poster?: string;
  isActive: boolean;
  isPrevious: boolean;
  loaded?: boolean;
  onLoaded: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}

function MediaSlide({ item, poster, isActive, isPrevious, loaded, onLoaded, videoRef }: MediaSlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-out ${
        isActive
          ? "opacity-100 scale-100 pointer-events-auto"
          : isPrevious
          ? "opacity-0 -translate-x-4 scale-105 pointer-events-none"
          : "opacity-0 translate-x-4 scale-105 pointer-events-none"
      }`}
    >
      {item.isVideo ? (
        <video
          ref={videoRef}
          src={bp(item.src)}
          poster={poster ? bp(poster) : undefined}
          playsInline
          muted
          loop
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={bp(item.src)}
          alt={`${item.fileName}`}
          loading="lazy"
          decoding="async"
          onLoad={onLoaded}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${
            loaded ? "blur-0" : "blur-xl"
          }`}
        />
      )}
    </div>
  );
}

interface LightboxProps {
  project: Project;
  start: number;
  onClose: () => void;
}

export function Lightbox({ project, start, onClose }: LightboxProps) {
  const [active, setActive] = useState(start);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setActive((v) => (v + 1) % project.media.length);
      else if (e.key === "ArrowLeft") setActive((v) => (v - 1 + project.media.length) % project.media.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const item = project.media[active];
    if (item?.isVideo) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, project]);

  const item = project.media[active];
  const total = project.media.length;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — gallery`}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5 border-b border-white/5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            {project.categoryNumber} {categoryLabel(project)} · {project.scale}
          </p>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl text-white">{project.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
          data-cursor="hover"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <button
          onClick={() => setActive((v) => (v - 1 + total) % total)}
          className="absolute left-3 sm:left-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors z-10"
          aria-label="Previous"
          data-cursor="hover"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative max-h-full max-w-full w-full h-full flex items-center justify-center">
          {item.isVideo ? (
            <video
              ref={videoRef}
              src={bp(item.src)}
              poster={posterFor(project) ? bp(posterFor(project)!.src!) : undefined}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          ) : (
            <img
              src={bp(item.src)}
              alt={item.fileName}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          )}
        </div>

        <button
          onClick={() => setActive((v) => (v + 1) % total)}
          className="absolute right-3 sm:right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors z-10"
          aria-label="Next"
          data-cursor="hover"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-white/85 ring-1 ring-white/10">
            {item.isVideo && <Play className="h-3 w-3" />}
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto px-5 sm:px-8 lg:px-12 py-5 border-t border-white/5">
        {project.media.map((m, i) => (
          <button
            key={m.src}
            onClick={() => setActive(i)}
            className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-md ring-1 transition-all ${
              i === active ? "ring-white scale-105" : "ring-white/15 opacity-60 hover:opacity-100"
            }`}
            data-cursor="hover"
            aria-label={`Frame ${i + 1}`}
          >
            {m.isVideo ? (
              <span className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-white/90">
                <Play className="h-3.5 w-3.5" />
              </span>
            ) : (
              <img src={bp(m.src)} alt="" loading="lazy" className="h-full w-full object-cover" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function categoryLabel(p: Project): string {
  const parts = p.category.split("_").slice(1).join("_");
  if (!parts) return p.category;
  return parts
    .toLowerCase()
    .replace(/(^|_)([a-z])/g, (_m, _s, c) => " " + c.toUpperCase())
    .replace(" andrestaurant", " & Restaurant")
    .replace(" resort", " & Resort")
    .trim();
}

function hasVideo(p: Project): boolean {
  return p.media.some((m) => m.isVideo);
}

function countVideos(p: Project): number {
  return p.media.filter((m) => m.isVideo).length;
}
