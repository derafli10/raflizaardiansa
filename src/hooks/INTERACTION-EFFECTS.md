# Interaction Effects Hooks

Three custom React hooks for creating premium interaction effects with ultra-smooth 60fps animations.

## Overview

These hooks provide hardware-accelerated animations following the frontend-ui-ux-promax-expert standards:

- **useMagneticElement** - GSAP-based magnetic pull effect
- **useTiltEffect** - 3D tilt on hover with depth perception
- **useCursorState** - Custom cursor state management

All hooks are:

- ✅ Hardware-accelerated (GPU)
- ✅ 60fps smooth animations
- ✅ SSR-safe with proper checks
- ✅ Automatic cleanup on unmount
- ✅ Fully typed with TypeScript
- ✅ Documented with comprehensive JSDoc

---

## useMagneticElement

Creates a magnetic pull effect that attracts elements toward the cursor when within a specified radius.

### Features

- GSAP-powered smooth animations
- Configurable pull strength and radius
- Hardware-accelerated transforms only
- Automatic return to origin
- Performance optimized

### API

```typescript
function useMagneticElement<T extends HTMLElement>(options?: {
  strength?: number; // 0-1, default: 0.3
  radius?: number; // pixels, default: 100
}): RefObject<T>;
```

### Usage

```tsx
import { useMagneticElement } from '@/hooks';

// Basic usage with defaults
function MagneticButton() {
  const magneticRef = useMagneticElement<HTMLButtonElement>();

  return <button ref={magneticRef}>Hover me</button>;
}

// Custom configuration
function StrongMagneticCard() {
  const magneticRef = useMagneticElement<HTMLDivElement>({
    strength: 0.5, // Stronger pull
    radius: 150, // Larger effect area
  });

  return (
    <div ref={magneticRef} className="card">
      Strong magnetic pull
    </div>
  );
}

// Subtle effect
function SubtleMagnetic() {
  const magneticRef = useMagneticElement<HTMLAnchorElement>({
    strength: 0.1, // Gentle pull
    radius: 80, // Smaller area
  });

  return (
    <a ref={magneticRef} href="#">
      Subtle pull
    </a>
  );
}
```

### Parameters

- **strength** (optional): Pull strength multiplier (0-1)
  - `0.1` - Very subtle
  - `0.3` - Default (balanced)
  - `0.5` - Strong pull
  - Higher values = more dramatic effect

- **radius** (optional): Effect radius in pixels from element center
  - `80` - Small area
  - `100` - Default
  - `150` - Large area
  - Elements are pulled when cursor is within this distance

### Performance

- Uses GSAP for hardware-accelerated animations
- Transform only (no layout recalculations)
- GPU-accelerated with `force3D: true`
- 60fps smooth at all times
- Automatic animation cleanup

---

## useTiltEffect

Creates a 3D tilt effect that rotates elements based on mouse position, with subtle scale for depth.

### Features

- Pure CSS 3D transforms
- Smooth perspective-based rotation
- Subtle scale for depth perception
- Hardware-accelerated
- Natural mouse tracking

### API

```typescript
function useTiltEffect<T extends HTMLElement>(options?: {
  intensity?: number; // degrees, default: 10
}): RefObject<T>;
```

### Usage

```tsx
import { useTiltEffect } from '@/hooks';

// Basic usage with defaults
function TiltCard() {
  const tiltRef = useTiltEffect<HTMLDivElement>();

  return (
    <div ref={tiltRef} className="card">
      3D Tilt Card
    </div>
  );
}

// Dramatic tilt
function DramaticTilt() {
  const tiltRef = useTiltEffect<HTMLDivElement>({
    intensity: 15, // More dramatic
  });

  return (
    <div ref={tiltRef} className="hero-card">
      Dramatic tilt effect
    </div>
  );
}

// Subtle tilt
function SubtleTilt() {
  const tiltRef = useTiltEffect<HTMLButtonElement>({
    intensity: 5, // Very subtle
  });

  return <button ref={tiltRef}>Subtle 3D button</button>;
}
```

### Parameters

- **intensity** (optional): Tilt intensity in degrees
  - `5` - Very subtle, elegant
  - `10` - Default (balanced)
  - `15` - Dramatic effect
  - `20+` - Very dramatic (use sparingly)

### CSS Requirements

The hook automatically sets `transform-style: preserve-3d` and transitions, but ensure your CSS doesn't override them:

```css
/* Optional: Add to element for smoother transitions */
.tilt-element {
  transform-style: preserve-3d;
  transition: transform 0.3s ease-out;
}
```

### How It Works

1. Tracks mouse position relative to element center
2. Calculates rotation angles (rotateX, rotateY)
3. Applies 3D transform with perspective (1000px)
4. Adds subtle scale (1.02) for depth on hover
5. Returns to flat state when cursor leaves

### Performance

- Pure CSS 3D transforms (GPU)
- No JavaScript animation loops
- Hardware-accelerated
- 60fps smooth transitions
- Automatic cleanup on unmount

---

## useCursorState

Manages custom cursor visual states synchronized with the global app store.

### Features

- Global cursor state management
- Convenient helper functions
- Optimized selectors (no re-renders)
- Memoized callbacks
- SSR-safe

### API

```typescript
function useCursorState(): {
  cursorState: CursorState;
  setDot: () => void;
  setGrow: () => void;
  setBlend: () => void;
  setView: () => void;
  resetCursor: () => void;
  setCursorState: (state: CursorState) => void;
};

type CursorState = 'dot' | 'grow' | 'blend' | 'view';
```

### Cursor States

- **dot** - Default 8px circle (normal cursor)
- **grow** - 48px expanded state (links, buttons)
- **blend** - 64px with mix-blend-mode (text hover)
- **view** - 64px with "VIEW" label (project cards)

### Usage

```tsx
import { useCursorState } from '@/hooks';

// Basic button with grow cursor
function InteractiveButton() {
  const { setGrow, resetCursor } = useCursorState();

  return (
    <button onMouseEnter={setGrow} onMouseLeave={resetCursor}>
      Hover me
    </button>
  );
}

// Project card with VIEW cursor
function ProjectCard() {
  const { setView, resetCursor } = useCursorState();

  return (
    <div onMouseEnter={setView} onMouseLeave={resetCursor} className="project-card">
      View Project
    </div>
  );
}

// Text with blend mode cursor
function TextHighlight() {
  const { setBlend, resetCursor } = useCursorState();

  return (
    <span onMouseEnter={setBlend} onMouseLeave={resetCursor}>
      Highlighted Text
    </span>
  );
}

// Read current state
function CursorDebug() {
  const { cursorState } = useCursorState();
  return <div>Current: {cursorState}</div>;
}

// Generic setter for dynamic states
function DynamicCursor() {
  const { setCursorState, resetCursor } = useCursorState();

  const handleHover = (type: 'link' | 'card') => {
    setCursorState(type === 'link' ? 'grow' : 'view');
  };

  return (
    <div onMouseEnter={() => handleHover('link')} onMouseLeave={resetCursor}>
      Dynamic Cursor
    </div>
  );
}
```

### Helper Functions

- **setDot()** - Set to default dot state
- **setGrow()** - Expand for interactive elements
- **setBlend()** - Blend mode for text
- **setView()** - Show VIEW label for cards
- **resetCursor()** - Reset to dot (alias for setDot)
- **setCursorState(state)** - Generic setter

### Performance

- Selectors optimized with shallow comparison
- Callbacks memoized with `useCallback`
- No unnecessary re-renders
- Global state via Zustand (no prop drilling)

### Integration

The cursor component should subscribe to `cursorState` and render the appropriate visual:

```tsx
function CustomCursor() {
  const cursorState = useAppStore((state) => state.cursorState);

  return (
    <div className={`cursor cursor-${cursorState}`}>
      {cursorState === 'view' && <span>VIEW</span>}
    </div>
  );
}
```

---

## Combined Usage

You can combine these hooks for rich interactions:

```tsx
import { useMagneticElement, useTiltEffect, useCursorState } from '@/hooks';

function PremiumCard() {
  // Magnetic pull
  const magneticRef = useMagneticElement<HTMLDivElement>({
    strength: 0.2,
    radius: 120,
  });

  // 3D tilt (on nested element)
  const tiltRef = useTiltEffect<HTMLDivElement>({
    intensity: 8,
  });

  // Custom cursor
  const { setView, resetCursor } = useCursorState();

  return (
    <div ref={magneticRef}>
      <div ref={tiltRef} onMouseEnter={setView} onMouseLeave={resetCursor} className="card">
        Premium interaction card
      </div>
    </div>
  );
}
```

**Note:** Since React only allows one ref per element, nest elements when combining `useMagneticElement` and `useTiltEffect`.

---

## Performance Guidelines

All hooks follow these performance best practices:

### Hardware Acceleration

- ✅ Transform and opacity only (no layout properties)
- ✅ GPU-accelerated with `will-change` hints
- ✅ 60fps smooth at all times

### Memory Management

- ✅ Automatic cleanup on unmount
- ✅ Event listeners properly removed
- ✅ GSAP animations killed on cleanup

### SSR Safety

- ✅ Browser-only code guarded with `typeof window === 'undefined'`
- ✅ Safe to use in Next.js server components (via client components)

### Optimization

- ✅ Memoized callbacks
- ✅ Optimized selectors
- ✅ No unnecessary re-renders

---

## Requirements Coverage

These hooks satisfy the following design requirements:

- **3.1-3.8**: Interaction effects architecture
- **7.1-7.8**: Animation performance standards
- Hardware-accelerated transforms only
- Clean event listener cleanup
- SSR-safe implementation
- Complete JSDoc documentation

---

## Examples

See `interaction-effects-examples.tsx` for complete working examples of all hooks.

---

## Related

- **App Store**: `@/stores/app-store` - Global cursor state
- **Animation Utils**: `@/lib/animation-utils` - GSAP utilities
- **GSAP**: Direct dependency for magnetic effects

---

## Notes

- These hooks are designed for desktop interactions
- Mobile devices should have reduced motion alternatives
- Use with `useReducedMotion` hook (task 3.3) for accessibility
- Test performance on lower-end devices

---

**Created**: Task 3.2 - The Schematic Network spec
**Status**: ✅ Complete
