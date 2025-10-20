# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an EPK (Electronic Press Kit) website for Huckleberryfinn, a legendary Korean indie rock band. The site showcases their 2025 re-recording of their 2001 second album "나를 닮은 사내" (The Man Who Resembles Me), along with information about their 21st Yellow Concert and a mentorship project for emerging musicians.

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
- **Body text:** Pretendard Variable (Korean web font)
- **Headlines:** Cafe24 Ssurround (display font)
- Fonts should be loaded via `next/font/local` from `public/fonts/`

### Component Structure

```
/app
  /_components/          # Section components
    section-intro.js
    section-narrative.js
    section-music.js
    section-concert.js
    section-future.js
    section-presskit.js
  layout.js              # Root layout with font loading
  page.js                # Main landing page
  globals.css

/components
  /ui/                   # Reusable UI components
    Heading.js
    Button.js
  /features/             # Feature-specific components
    CustomAudioPlayer.js
    PressKitDownloader.js
  /layout/
    Footer.js

/public
  /images/               # Optimized images (use next/image)
  /audio/                # Audio files for music section
  /fonts/                # Local font files (.woff2)
  /presskit/             # Downloadable press kit files (.zip)
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

- Use Framer Motion for all animations
- Common patterns:
  - `whileInView` for scroll-triggered animations
  - `AnimatePresence` for enter/exit animations (modals, tooltips)
  - `useScroll` + `useTransform` for scroll-based effects
  - `variants` for coordinated multi-element animations
- Keep animations smooth (60fps target)
- Use `ease: 'easeOut'` for natural motion

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
