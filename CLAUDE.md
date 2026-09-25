# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an EPK (Electronic Press Kit) website for Huckleberryfinn, a legendary Korean indie rock band.

**Current site (since 2026-09): 정규 8집 〈모두가 아는 이야기〉** — release date 2026-10-23 12:00 KST. Two pre-release singles: 〈박쥐〉 (A Bat In The Sun, 2026-08-21, MV on YouTube) and 〈멜랑콜리아〉 (Melancholia, 2026-09-29 12:00 KST, 124 bpm). Tied to a Tumblbug campaign (https://tumblbug.com/hbf8th, 2026-09-17 ~ 10-11) and the 22nd Yellow Concert (the official poster spells it "22th") (Seoul 상상마당 10-31, Busan 오방가르드 12-05). Source material lives in `docs/8집/`.

**Legacy:** the previous site promoted the 2025 re-recording of the 2001 second album "나를 닮은 사내". Those sections (`app/_components/Section*.tsx`, `app/data/tracks.ts` etc.) are kept in the repo but are no longer mounted from `app/page.tsx`.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Additional Libraries:** react-intersection-observer, lottie-react
- **Deployment:** Vercel

## Project Setup

### Initial Setup (if not already done)
```bash
# Create Next.js project
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install dependencies
npm install framer-motion react-intersection-observer lottie-react react-icons
```

### Development Commands
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture & Design System

### Color Palette (defined in tailwind.config.js)
- **hbf-yellow:** #F3A847 (primary brand color)
- **hbf-yellow-light:** #F7BC74
- **hbf-charcoal:** #2A2A2A (primary text/dark backgrounds)
- **hbf-charcoal-light:** #4F4F4F
- **hbf-bluegray:** #8B9AAB
- **hbf-white:** #FDFBF6 (off-white background)

### Typography
- **Body text:** system Korean sans stack (see Shared behaviours below)
- **Headlines:** Cafe24 Ssurround (display font)
- Fonts should be loaded via `next/font/local` from `public/fonts/`

### 8th-album palette & type (in `app/globals.css` `@theme`)
- `ink / ink-2 / ink-3`: near-black navy backgrounds
- `cobalt / teal / coral`: colour fields from the album art
- `bulb / bulb-hot`: warm accent for primary CTAs and highlights
- `cream`: text on dark
- Display: Nanum Myeongjo (`.font-serif-kr`). Latin accents: Instrument Serif (`.font-serif-latin`). Body: Pretendard.

### Date-dependent copy
- All release/funding dates live in `lib/timeline.ts`. Components read the clock with `useNow()` (`lib/useNow.ts`), which renders the build time first so SSR and hydration always match, then switches to the real clock.
- After 10-11 the funding CTAs, Tumblbug discount prices and "Support" button switch off automatically; after 09-29 / 10-23 the "Out now" copy switches on.

### Shared behaviours
- Scroll locks go through `lib/scrollLock.ts` (locks `<html>`, reference-counted). Never set `body.style.overflow` directly.
- Motion preferences and the site-wide pause live in `lib/motionPrefs.ts` (see Animation Guidelines).
- Fonts: body text uses the system Korean sans stack (a Korean web font cost ~7s of main-thread work on throttled mobile). Display serif is Nanum Myeongjo 700/800 only via next/font.

### Layout rules
- `html`/`body` use `overflow-x: clip`, not `hidden`. `hidden` turns body into a scroll container and silently breaks every `position: sticky`.
- The header appears once `#hero-end` (bottom of the hero) reaches the top of the viewport.
- Never put `mix-blend-mode` on text over the painting; contrast comes from the scrims.

### Component Structure

```
/app
  /_components/album8/   # 8집 sections, mounted in app/page.tsx
    hero/                # "붉은 실 / The Thread" pinned hero (250svh desktop, 200svh mobile)
      index.tsx          # stage, scroll camera keyframes, beats, CTAs, date-aware status
      art-space.ts       # painting-space coordinates (0..1), clampCam, thread path
      HeroThread.tsx     # live SVG thread in art space (idle 124bpm sway, cursor pluck, bead)
      HeroCanvas.tsx     # WebGL layer, desktop fine-pointer only, loaded after LCP
      gl/                # zero-dependency WebGL1 renderer + cubist displacement shader
      heroStatus.ts      # D-day copy that switches after 09-29, 10-11, 10-23 (KST)
    Ticker.tsx           # marquee of key dates
    SectionSingles.tsx   # 박쥐 (MV facade) / 멜랑콜리아 (BPM pulse, lyrics, countdown)
    SectionStory.tsx     # scroll-linked word reveal + sticky crossfading photos
    SectionAlbum.tsx     # CSS jewel case + spinning disc from cover, specs, 9-slot tracklist
    SectionConcert.tsx   # 22nd Yellow Concert Seoul / Busan
    SectionFunding.tsx   # Tumblbug reward rail
    SectionBand.tsx      # B&W-to-colour band photo, member cards
    SectionPress.tsx     # downloadable assets, copyable press text, contact
  /_components/Section*.tsx   # legacy 2집 sections (unmounted)
  /data/album8.ts        # all 8집 copy, dates, rewards, assets
  layout.tsx             # metadata, fonts, grain overlay, CursorGlow
  page.tsx
  globals.css

/components
  /ui/        SectionLabel, Lightbox, Heading, Button
  /features/  Countdown, CursorGlow, TiltCard, ScrambleText, RevealText, ...
  /motion/    Reveal, AnchorScroll, MotionProvider
  /layout/    Header, Footer

/public/images/8th_album/   album-cover.jpg = the ALBUM cover (light bulb, "모두가 아는 이야기", 1254px — Tumblbug's first story image).
                            single-melancholia.jpg = the 〈멜랑콜리아〉 SINGLE cover (face with red thread, 3000px).
                            single-bat.jpg, story photos, og-album.jpg (from the album cover), cd-mockup.jpg (unused).
/public/images/8th_album/hero/   melancholia-2400.jpg + melancholia-tex-{2048,1600}.webp — the hero artwork is the
                            〈멜랑콜리아〉 single cover, credited in the hero ("Artwork · 2nd Single 〈멜랑콜리아〉").
/public/images/yellowconcert/poster-2026.jpg
/public/images/profile/     ASCII-named copies (band-3, lee-kiyong, ...). next/image fails on Korean/space filenames.
```

## Key Implementation Details

### Section 1: Intro
- Full-screen hero with staggered text animations
- Background uses `hbf-yellow` with canvas texture overlay
- Framer Motion variants for sequential animation (staggerChildren: 0.4)

### Section 2: Narrative
- Two-column layout (image left, text right) on desktop
- **Key Feature:** Scroll-triggered image transition from B&W to color
  - Uses `useScroll` and `useTransform` from Framer Motion
  - Transition occurs between 30%-70% of section scroll progress
  - Two absolutely positioned images with opacity transformation

### Section 3: Music
- Custom audio player with visual feedback
- Lottie animation plays during audio playback
- Producer's notes displayed in modal/tooltip (use AnimatePresence)
- Must handle audio state to prevent multiple tracks playing simultaneously

### Section 4: Concert
- Dark section (`bg-hbf-charcoal text-hbf-white`)
- Poster image with concert info and CTA buttons
- Elements animate from left/right using `whileInView`
- CTA buttons have hover/tap scale effects

### Section 5: The Future
- Mentorship project information
- Interactive benefit highlights with hover tooltips
- CTA links to mailto: or external application form

### Section 6: Press Kit
- Functional download section
- List of downloadable assets (press release, photos, artwork, logos)
- Each item uses `<a>` tag with `download` attribute
- "Download All" button for .zip bundle

### Footer
- Copyright notice and SNS icon links (YouTube, Instagram, Facebook)
- Use react-icons or custom SVG icons

## Asset Optimization

- **Images:** Use `next/image` for automatic WebP conversion and lazy loading
- **Audio:** Load on-demand when user clicks play (not on page load)
- **Fonts:** Store as `.woff2` files, optimize with `next/font` subsetting
- All static assets go in `/public` directory

## Accessibility Requirements

- Use semantic HTML (`<section>`, `<h1>`-`<h6>`, `<nav>`, `<button>`)
- All images must have meaningful `alt` attributes
- Ensure keyboard navigation works (Tab/Enter for all interactive elements)
- Apply `focus-visible` styles to focusable elements
- Maintain WCAG AA color contrast ratios
- Audio controls must be keyboard accessible

## Animation Guidelines

All motion goes through one small system. Do not hand-roll `initial`/`whileInView`/`transition` in sections.

- **Tokens** — `lib/motion.ts`: one easing (`EASE_OUT`, expo-out), three durations, one rise distance (24px), one stagger, one viewport trigger (`VIEWPORT`, once at 12%).
- **Entrances** — `components/motion/Reveal.tsx`: `<Reveal>`, `<RevealGroup>` + `<RevealItem>`. Opacity + small vertical translate only (compositor-only). No horizontal slides, no blur filters.
- **Preferences** — `lib/motionPrefs.ts` (`useMotionPrefs()`): `reduced` (live OS setting), `paused` (site-wide pause switch, mirrored to `html[data-motion="paused"]`), `fine` pointer. Derived: `ambient` (loops may run), `scrollFx` (decorative scroll motion may run), `pointerFx` (cursor effects may run). Every JS-driven effect reads these; `MotionConfig reducedMotion="user"` covers framer transforms.
- **CSS loops** — add class `motion-loop` to any infinite CSS animation. The pause switch and reduced motion target that class only; one-shot entrances (hero intro) always finish and are never frozen.
- **Anchors** — `components/motion/AnchorScroll.tsx` handles every `href="#…"`: jumps across the pinned hero instead of scrolling through it, instant under reduced motion, syncs the hash and focus.
- **Scroll-linked text** — `RevealText` writes one CSS variable per paragraph (`--p`); words derive opacity in CSS (`.reveal-word`). Never give per-word elements `will-change` or their own motion values.
- **Performance rules** — animate only `transform`/`opacity`; crossfade two layers instead of animating `filter`; measure rects on pointer-enter, not per move; use IntersectionObserver instead of scroll listeners that read layout.
- **Hero** — the CSS rest crop (`.hero-artbox` in globals.css) is the exact CSS form of `camAt(0)`; keep them in sync if camera keyframes change.

## Bilingual Content

The site supports both Korean and English content. Content for each section is defined in [/docs/prd.md](docs/prd.md). When implementing sections:
- Default language is Korean
- English content should be available (implementation method TBD - could use i18n or simple toggle)
- Both versions of text are provided in the PRD

## Reference Documentation

- **PRD (Product Requirements):** [/docs/prd.md](docs/prd.md) - Full content for all sections
- **Technical Spec:** [/docs/spec.md](docs/spec.md) - Detailed implementation specifications
- **Press Release:** [/docs/press_release.md](docs/press_release.md) - Project background and context

## Development Workflow

1. Implement one section at a time, starting with simpler sections (Intro, Contact)
2. Build reusable UI components (`Button`, `Heading`) first
3. Test animations in isolation before integrating into sections
4. Optimize images and assets before deployment
5. Test accessibility with keyboard navigation and screen readers
6. Verify responsive behavior at mobile, tablet, and desktop breakpoints

## Deployment

- Deploy to Vercel by connecting the GitHub repository
- Vercel will auto-detect Next.js and configure build settings
- Set up CI/CD pipeline for automatic deployments on push to main branch
