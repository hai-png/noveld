"use client";

import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { Marquee } from "@/components/portfolio/marquee";
import { About } from "@/components/portfolio/about";
import { TechToolset } from "@/components/portfolio/tech-toolset";
import { Capabilities } from "@/components/portfolio/capabilities";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { ContactCTA } from "@/components/portfolio/contact-cta";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <div className="noise-overlay" aria-hidden />
      <CustomCursor />

      <Header />

      {/* Hero — name, status, stats */}
      <Hero />

      {/* Discipline marquee */}
      <Marquee />

      {/* About — Professional Background bio */}
      <About />

      {/* Tech toolset — 10 tools with proficiency */}
      <TechToolset />

      {/* Capabilities — 8 services list */}
      <Capabilities />

      {/* Selected Work — 26 real archviz projects */}
      <ProjectGrid />

      {/* Contact CTA — proposal buttons + contact cards + file formats */}
      <ContactCTA />

      <Footer />
    </main>
  );
}
