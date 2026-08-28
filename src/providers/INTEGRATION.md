# Provider Integration Guide

## Quick Start

Update your `src/app/layout.tsx` to use the new providers:

```tsx
import type { Metadata } from 'next';
import { spaceGrotesk, inter, jetbrainsMono } from '@/lib/fonts';
import { ThemeProvider, LenisProvider, AnimationProvider } from '@/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rafli Zaardiansa — Network, Hardware, Software & Cyber Security',
  description:
    'Engineering the invisible infrastructure that keeps the world connected. Portfolio of Rafli Zaardiansa, specializing in network engineering, hardware design, software development, and cybersecurity.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationMismatch
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <LenisProvider>
            <AnimationProvider>{children}</AnimationProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## What Was Created

### 1. ThemeProvider (`src/providers/ThemeProvider.tsx`)

**Purpose:** Manages application theme (dark/light mode) with system preference detection.

**Key Features:**

- Wraps the existing `theme-store` Zustand store
- Applies `data-theme` attribute to `<html>` element
- Listens for system preference changes via `prefers-color-scheme`
- Persists user preference to localStorage
- Provides `useTheme()` hook for component access

**Exports:**

- `ThemeProvider` - React component
- `useTheme()` - Hook returning `{ mode, theme, resolvedTheme, setTheme }`

### 2. LenisProvider (`src/providers/LenisProvider.tsx`)

**Purpose:** Initializes Lenis smooth scroll and synchronizes with GSAP ticker.

**Key Features:**

- Creates Lenis instance with device-optimized configuration
- Syncs Lenis with GSAP ticker via `syncLenisWithGSAP()`
- Single `requestAnimationFrame` loop for all animations
- Respects `prefers-reduced-motion` accessibility setting
- Provides Lenis instance via React context
- Proper cleanup on unmount

**Exports:**

- `LenisProvider` - React component
- `useLenis()` - Hook returning Lenis instance or null

**Usage Example:**

```tsx
const lenis = useLenis();

// Smooth scroll to section
lenis?.scrollTo('#about', {
  offset: -80,
  duration: 1.2,
});
```

### 3. AnimationProvider (`src/providers/AnimationProvider.tsx`)

**Purpose:** Registers GSAP plugins and initializes ScrollTrigger defaults.

**Key Features:**

- Registers all GSAP plugins:
  - ScrollTrigger
  - DrawSVGPlugin
  - MotionPathPlugin
  - TextPlugin
  - MorphSVGPlugin
  - SplitText
- Calls `initScrollTriggerDefaults()` for device optimization
- Handles cleanup of all ScrollTriggers on unmount
- Client-side only component

**Exports:**

- `AnimationProvider` - React component

## Provider Hierarchy

**Critical: Order matters!**

```
ThemeProvider          (1st - No dependencies)
  └─> LenisProvider    (2nd - Smooth scroll init)
      └─> AnimationProvider  (3rd - GSAP + ScrollTrigger setup)
          └─> Your App Content
```

**Why This Order?**

1. **ThemeProvider** only manipulates DOM attributes - no dependencies
2. **LenisProvider** must run before GSAP ScrollTrigger is configured
3. **AnimationProvider** registers plugins and syncs Lenis with GSAP

## Requirements Satisfied

✅ **Requirement 4.1**: Theme system with three modes (system/dark/light)  
✅ **Requirement 4.2**: Resolve theme in priority order  
✅ **Requirement 4.3**: Persist preference to localStorage  
✅ **Requirement 4.4**: Apply via data-theme attribute  
✅ **Requirement 4.5**: 300ms theme transition (handled by CSS)  
✅ **Requirement 4.6**: Accessible keyboard navigation (theme-store)  
✅ **Requirement 4.7**: Listen for system preference changes

✅ **Requirement 22.1**: Initialize Lenis smooth scroll  
✅ **Requirement 22.2**: Synchronize Lenis with GSAP ticker  
✅ **Requirement 22.3**: Call ScrollTrigger.update on Lenis scroll  
✅ **Requirement 22.4**: Set gsap.ticker.lagSmoothing(0)  
✅ **Requirement 22.5**: Single requestAnimationFrame loop  
✅ **Requirement 22.6**: Expose Lenis via React context  
✅ **Requirement 22.7**: Cleanup on unmount

## Additional Files

- **`index.ts`** - Barrel export for clean imports
- **`README.md`** - Detailed provider documentation
- **`example-usage.tsx`** - Working examples of hook usage
- **`INTEGRATION.md`** - This file

## Next Steps

1. Update `src/app/layout.tsx` with the provider hierarchy
2. Remove the hardcoded `data-theme="dark"` from the `<html>` tag
3. Add `suppressHydrationMismatch` to `<html>` element
4. Test theme toggling in components using `useTheme()`
5. Test smooth scrolling using `useLenis()`

## Notes

- All providers are SSR-safe (check for `typeof window === 'undefined'`)
- All providers handle cleanup properly
- Lenis auto-disables when `prefers-reduced-motion: reduce` is set
- Mobile devices get optimized Lenis configuration (shorter duration, higher sensitivity)
- TypeScript compilation passes with no errors
