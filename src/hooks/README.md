# Custom Hooks

This directory contains custom React hooks for scroll tracking, navigation, and interactive effects for The Schematic Network portfolio.

## Overview

All hooks are designed with:

- **Performance-first**: Throttled event listeners, minimal DOM queries
- **SSR-safe**: Proper window/document checks
- **Clean architecture**: Proper cleanup on unmount
- **Complete JSDoc**: Full documentation with examples
- **Enterprise standards**: Following frontend-ui-ux-promax-expert guidelines

## Available Hooks

### Scroll & Navigation Hooks

#### `useScrollProgress()`

Tracks scroll percentage (0-100) and updates nav-store with throttled updates.

**Requirements:** 6.8, 17.2, 22.6

**Usage:**

```tsx
import { useScrollProgress } from '@/hooks';

function Page() {
  useScrollProgress(); // Initialize tracking
  return <main>...</main>;
}

// Access in other components
function Navbar() {
  const progress = useNavStore((state) => state.scrollProgress);
  return <div style={{ width: `${progress}%` }} />;
}
```

**Features:**

- Calculates based on `window.scrollY` and document height
- Updates nav-store `scrollProgress` state
- Throttled to 60fps (~16ms)
- Handles window resize
- SSR-safe

---

#### `useActiveSection(options?)`

Detects active section using IntersectionObserver and updates nav-store.

**Requirements:** 6.4, 17.5, 22.7

**Usage:**

```tsx
import { useActiveSection } from '@/hooks';

function Page() {
  useActiveSection({
    threshold: 0.5, // Section active when 50% visible
    rootMargin: '-80px 0px 0px 0px', // Account for navbar
    sections: ['hero', 'about', 'skills', 'projects', 'contact'],
  });

  return <main>...</main>;
}
```

**Features:**

- Observes sections: `#hero`, `#about`, `#skills`, `#projects`, `#contact`
- Uses IntersectionObserver for efficiency
- Configurable threshold and rootMargin
- Updates nav-store `activeSection`
- SSR-safe

---

#### `useScrollDirection(options?)`

Detects scroll direction (up/down) by tracking previous scroll position.

**Requirements:** 17.4

**Usage:**

```tsx
import { useScrollDirection } from '@/hooks';

function Navbar() {
  const scrollDirection = useScrollDirection({
    threshold: 10, // Min pixels to trigger
    throttleDelay: 16, // 60fps
  });

  const isVisible = scrollDirection !== 'down';

  return <nav className={isVisible ? 'translate-y-0' : '-translate-y-full'}>Navigation</nav>;
}
```

**Returns:** `'up' | 'down' | null`

**Features:**

- Tracks previous scroll position
- Configurable threshold (prevents jitter)
- Throttled updates
- Useful for showing/hiding navbar
- SSR-safe

---

#### `useLenis()`

Re-exports `useLenis` from LenisProvider for cleaner imports.

**Requirements:** 6.1, 6.6, 22.6

**Usage:**

```tsx
import { useLenis } from '@/hooks';

function ScrollToTop() {
  const lenis = useLenis();

  const handleClick = () => {
    lenis?.scrollTo(0, { duration: 1.5 });
  };

  return <button onClick={handleClick}>Top</button>;
}
```

**Features:**

- Simple re-export for cleaner imports
- Access Lenis instance for imperative control
- Type-safe API
- SSR-safe

---

#### `useLenisScroll()`

Provides utility functions for common Lenis scroll operations.

**Requirements:** 6.1, 6.6, 22.6

**Usage:**

```tsx
import { useLenisScroll } from '@/hooks';

function Navigation() {
  const { scrollToSection, scrollToTop, scrollToBottom } = useLenisScroll();

  return (
    <nav>
      <button onClick={scrollToTop}>Home</button>
      <button onClick={() => scrollToSection('#about', { offset: -80 })}>About</button>
      <button onClick={() => scrollToSection('#contact', { duration: 2 })}>Contact</button>
    </nav>
  );
}
```

**Returns:**

- `lenis`: Lenis instance
- `isReady`: Boolean indicating if Lenis is initialized
- `scrollToSection(target, options)`: Scroll to element/selector
- `scrollToTop(options)`: Scroll to top
- `scrollToBottom(options)`: Scroll to bottom
- `start()`: Resume smooth scroll
- `stop()`: Pause smooth scroll

**Features:**

- Wrapper with sensible defaults
- Cleaner API for common operations
- Type-safe options
- SSR-safe

---

## Performance Considerations

All hooks follow these performance best practices:

1. **Throttling**: Scroll listeners throttled to 60fps (16ms)
2. **Passive listeners**: All scroll events use `{ passive: true }`
3. **Minimal DOM queries**: Calculations cached where possible
4. **Proper cleanup**: All event listeners removed on unmount
5. **SSR safety**: All hooks check for `window` existence
6. **Shallow selectors**: Zustand stores use shallow comparison

## Architecture

```
hooks/
├── useScrollProgress.ts     # Scroll percentage tracking
├── useActiveSection.ts      # Section visibility detection
├── useScrollDirection.ts    # Scroll direction detection
├── useLenis.ts              # Lenis integration utilities
├── index.ts                 # Clean exports
└── README.md                # This file
```

## Integration with Stores

These hooks integrate with Zustand stores:

- **nav-store**: `scrollProgress`, `activeSection`
- Stores are automatically updated by hooks
- Components consume via selectors

## Testing

When testing components using these hooks:

1. Mock `window.scrollY` and `document.documentElement.scrollHeight`
2. Mock `IntersectionObserver` for `useActiveSection`
3. Mock Lenis instance for `useLenis` hooks
4. Use `@testing-library/react` for hook testing

## Future Hooks

Planned hooks for task 3.2:

- `useMagneticElement.ts` - GSAP-based magnetic pull effect
- `useTiltEffect.ts` - 3D tilt on hover
- `useCursorState.ts` - Custom cursor state management
- `useReducedMotion.ts` - Accessibility motion detection
