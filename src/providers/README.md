# Providers

React context providers for global application concerns.

## Available Providers

### ThemeProvider

Manages theme state (dark/light mode) using the theme-store.

**Features:**

- Applies `data-theme` attribute to document root
- Listens for system preference changes
- Persists user preference to localStorage
- SSR-safe with proper hydration

**Usage:**

```tsx
import { ThemeProvider, useTheme } from '@/providers';

// In your root layout
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationMismatch>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// In any component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>
  );
}
```

### LenisProvider

Initializes Lenis smooth scroll and synchronizes with GSAP ticker.

**Features:**

- Device-optimized smooth scroll configuration
- Synchronized with GSAP in single RAF loop
- Respects `prefers-reduced-motion` setting
- Provides Lenis instance via context for imperative scrollTo

**Usage:**

```tsx
import { LenisProvider, useLenis } from '@/providers';

// In your root layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// In any component
function ScrollToSection() {
  const lenis = useLenis();

  const handleClick = () => {
    lenis?.scrollTo('#about', {
      offset: -80, // Account for fixed header
      duration: 1.2,
    });
  };

  return <button onClick={handleClick}>Scroll to About</button>;
}
```

### AnimationProvider

Registers GSAP plugins and initializes ScrollTrigger defaults.

**Features:**

- Registers all GSAP plugins (ScrollTrigger, DrawSVG, MotionPath, etc.)
- Calls `initScrollTriggerDefaults()` for device-optimized config
- Handles cleanup of all ScrollTriggers on unmount

**Usage:**

```tsx
import { AnimationProvider } from '@/providers';

// In your root layout
export default function RootLayout({ children }) {
  return (
    <html>
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

## Full Provider Composition

Here's the complete provider hierarchy for the root layout:

```tsx
import { spaceGrotesk, inter, jetbrainsMono } from '@/lib/fonts';
import { ThemeProvider, LenisProvider, AnimationProvider } from '@/providers';
import './globals.css';

export default function RootLayout({ children }) {
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

## Requirements Covered

- **Requirements 4.1-4.7**: Theme system with localStorage persistence and system preference detection
- **Requirements 22.1-22.7**: Lenis smooth scroll synchronized with GSAP ticker in single RAF loop

## Architecture Notes

**Provider Order Matters:**

1. **ThemeProvider** - First, as it only manipulates DOM attributes
2. **LenisProvider** - Second, initializes smooth scroll
3. **AnimationProvider** - Last, registers GSAP plugins and configures ScrollTrigger

**Why This Order?**

- ThemeProvider has no dependencies
- LenisProvider needs to run before ScrollTrigger is configured
- AnimationProvider syncs Lenis with GSAP ticker (requires Lenis to exist)

## SSR Considerations

All providers are client components (`'use client'`) because they:

- Access browser APIs (window, document)
- Use useEffect for initialization
- Manage client-side state

The providers are designed to be SSR-safe:

- Check for `typeof window === 'undefined'` before accessing browser APIs
- Return early or use fallback values during SSR
- Use `suppressHydrationMismatch` on `<html>` to prevent hydration errors from theme attribute
