"use client";

import { ArrowUpRight, Mail, MessageCircle, MapPin, FileText } from "lucide-react";
import Link from "next/link";

const FILE_FORMATS = [
  ".RVT (Revit)",
  ".SKP (SketchUp)",
  ".FBX",
  ".DWG (AutoCAD)",
  ".3DS / .MAX",
  ".BLEND",
  "PDF Plans",
];

export function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/5 bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-amber-500/12 blur-[120px] animate-float-1" />
        <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-emerald-500/12 blur-[120px] animate-float-2" />
        <div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-sky-500/10 blur-[100px] animate-float-3" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
          Available for new commissions — 2024 onwards
        </p>

        <h2 className="mt-6 font-display font-medium text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[110px] leading-[0.85] tracking-[-0.02em]">
          <span className="block">Ready to visualize</span>
          <span className="block text-stroke text-stroke-fillable">your next milestone?</span>
        </h2>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl text-white/85 leading-snug">Let&apos;s Build Your Vision</p>
            <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed max-w-md">
              Whether you have a complete Revit BIM model or initial 2D CAD
              floorplans, I produce renders that win pitches and secure sales.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="mailto:ethiohagerai@gmail.com?subject=Project%20Proposal%20Request"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-950 hover:scale-[1.02] transition-transform"
                data-cursor="hover"
              >
                Request Proposal
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="https://t.me/EsknderArchviz"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 hover:bg-white/5 transition-colors"
                data-cursor="hover"
              >
                Start Your Visualization Project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 self-start">
            <ContactCard
              icon={<MessageCircle className="h-4 w-4" />}
              label="Direct Chat (Instant)"
              value="@EsknderArchviz"
              href="https://t.me/EsknderArchviz"
            />
            <ContactCard
              icon={<Mail className="h-4 w-4" />}
              label="Email Inquiry"
              value="ethiohagerai@gmail.com"
              href="mailto:ethiohagerai@gmail.com"
            />

            <div className="sm:col-span-2 rounded-xl border border-white/8 bg-white/[0.015] p-6 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-white/45" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                    Location &amp; Availability
                  </p>
                  <p className="mt-2 text-base text-white/85">
                    Addis Ababa, Ethiopia / Remote Worldwide
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 text-white/45" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                    Accepted File Formats
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {FILE_FORMATS.map((fmt) => (
                      <span
                        key={fmt}
                        className="inline-flex items-center rounded-md border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/70"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

function ContactCard({ icon, label, value, href }: ContactCardProps) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group rounded-xl border border-white/8 bg-white/[0.015] p-5 hover:bg-white/[0.04] hover:border-white/15 transition-all"
      data-cursor="hover"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/65 group-hover:text-white transition-colors">
          {icon}
        </span>
        <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-1.5 text-base sm:text-lg text-white/85 group-hover:text-white transition-colors break-all">
        {value}
      </p>
    </Link>
  );
}
