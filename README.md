# Esknder Zinabie — Architectural Visualization Portfolio

Personal portfolio for **Esknder Zinabie**, Lead 3D Architectural Visualizer & CG Artist based in Addis Ababa, Ethiopia.

> Photorealistic 4K/8K imagery, cinematic walkthroughs, and real-time interactive tours for architects, developers, and interior designers worldwide.

## Page sections

1. **Hero** — Available-for-Projects badge, name (text-stroke on "Zinabie"), title, Email + Telegram CTAs, stats (6+ Years / 120+ Projects / 45+ Reels)
2. **Marquee** — archviz discipline tags
3. **About** — Professional Background bio
4. **Tech Toolset** — 10 tools with Expert/Advanced badges + proficiency bars (D5 Render, Unreal Engine 5, Revit, 3ds Max + Corona, Twinmotion, SketchUp, Photoshop, Premiere, Vantage + V-Ray, Drone)
5. **Capabilities** — 8 services (4K/8K stills, walkthroughs, UE5 tours, drone photomontage, etc.)
6. **Selected Work** — 26 real archviz projects across 10 categories with image/video carousels + lightbox
7. **Contact CTA** — Request Proposal + Start Your Visualization Project buttons, contact cards, accepted file formats
8. **Footer** — brand, socials, nav, location

## Tech stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4 with custom design system (Playfair Display + Inter + Sarpanch fonts)
- **Custom features**: dot+outline cursor with hover-grow, noise overlay, marquee, float animations, text-stroke hero, IntersectionObserver-based reveal animations
- **Video**: autoplay-on-hover in card grid, full HTML5 controls in lightbox, keyboard navigation (← → arrows, Esc to close)
- **Git LFS**: All media files (`*.webp`, `*.mp4`, `*.mov`, `*.webm`, `*.jpg`, `*.jpeg`, `*.png`) are tracked via Git LFS

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, dark theme
│   ├── globals.css             # full custom design system (@layer components)
│   └── page.tsx                # page composition
├── lib/
│   └── projects.ts            # 26 real projects + 233 media items (auto-generated)
└── components/
    └── portfolio/
        ├── custom-cursor.tsx
        ├── header.tsx          # EZ monogram + 4-link nav
        ├── hero.tsx            # name, status, stats, CTAs
        ├── marquee.tsx
        ├── about.tsx           # Professional Background bio
        ├── tech-toolset.tsx    # 10-tool grid with proficiency bars
        ├── capabilities.tsx    # 8-service hover list
        ├── filter-bar.tsx      # sticky pill filters with counts
        ├── project-card.tsx    # card carousel + lightbox
        ├── project-grid.tsx    # grid state container
        ├── contact-cta.tsx     # proposal buttons + contact cards + file formats
        └── footer.tsx
public/
└── projects/                   # 670MB of real archviz media (Git LFS)
    ├── 01_APARTMENT/
    ├── 02_MIXED_USE/
    ├── ... (10 categories, 26 projects, 233 files)
scripts/
├── parse_bundle.js             # Extract asset manifest from source bundle
├── download_assets.js          # Download all 233 media files
└── gen_projects_ts.js          # Generate src/lib/projects.ts from manifest
```

## Restoring project media

The 233 real archviz media files (140 webp images + 93 mp4 videos, ~670MB) are committed via **Git LFS**. After cloning:

```bash
git lfs install     # one-time per machine
git clone https://github.com/hai-png/noveld.git
cd noveld
# LFS files auto-download on clone; if not, run:
git lfs pull
```

To re-fetch the media from the original source (if needed):

```bash
curl -sL "https://noveld.com.et/assets/index-CXj8XKeF.js" -o /tmp/bundle.js
node scripts/parse_bundle.js
node scripts/download_assets.js
node scripts/gen_projects_ts.js
```

## Development

```bash
bun install          # if first run
bun run dev          # start dev server (port 3000)
bun run lint         # ESLint check
```

The dev server runs automatically in the Z.ai sandbox. The only user-visible route is `/`.

## Contact

- **Email**: ethiohagerai@gmail.com
- **Telegram**: @EsknderArchviz
- **Location**: Addis Ababa, Ethiopia / Remote Worldwide

## License

© 2024 Esknder Zinabie. All rights reserved.
