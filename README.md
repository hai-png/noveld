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
```

## Restoring project media (670MB)

The 233 real archviz media files (140 webp images + 93 mp4 videos) are excluded from git because of their size. To restore them locally:

```bash
# 1. Fetch the source site's JS bundle
curl -sL "https://noveld.com.et/assets/index-CXj8XKeF.js" -o /tmp/bundle.js

# 2. Parse the asset manifest from the bundle (extracts 27 projects → /tmp/bundle_parsed.json)
node scripts/parse_bundle.js

# 3. Download all 233 assets to public/projects/{CATEGORY}/{PROJECT_NAME}/ (~670MB)
node scripts/download_assets.js

# 4. Regenerate src/lib/projects.ts from the downloaded manifest
node scripts/gen_projects_ts.js
```

The scripts are idempotent — re-running them skips files already on disk.

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
