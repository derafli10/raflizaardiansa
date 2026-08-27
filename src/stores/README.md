# Zustand State Stores

This directory contains all Zustand state stores for The Schematic Network application. Stores are organized by domain following the design specification.

## Store Overview

### 1. Theme Store (`theme-store.ts`)

Manages application theme with three modes and localStorage persistence.

**State:**

- `mode`: `'system' | 'dark' | 'light'` - User's theme preference
- `resolved`: `'dark' | 'light'` - Actually displayed theme

**Actions:**

- `setMode(mode)` - Set theme mode
- `setResolved(resolved)` - Internal method to update resolved theme
- `initThemeListener()` - Initialize system preference listener

**Persistence:** localStorage key `'tsn-theme'`

**Example:**

```tsx
import { useThemeStore, themeSelectors } from '@/stores';

// Full store access
const { mode, resolved, setMode } = useThemeStore();

// Optimized shallow selector (prevents unnecessary re-renders)
const mode = useThemeStore(themeSelectors.mode);
const setMode = useThemeStore(themeSelectors.setMode);

// Set theme
setMode('dark');
```

### 2. Navigation Store (`nav-store.ts`)

Manages navigation state including active sections and mobile menu.

**State:**

- `activeSection`: `string` - Currently active section ID
- `isMenuOpen`: `boolean` - Mobile menu state
- `scrollProgress`: `number` - Scroll percentage (0-100)

**Actions:**

- `setActiveSection(section)` - Set active section
- `toggleMenu()` - Toggle mobile menu
- `closeMenu()` - Close mobile menu
- `openMenu()` - Open mobile menu
- `setScrollProgress(progress)` - Update scroll progress

**Persistence:** None (resets on page load)

**Example:**

```tsx
import { useNavStore, navSelectors } from '@/stores';

// Full store access
const { activeSection, setActiveSection, isMenuOpen, toggleMenu } = useNavStore();

// Optimized shallow selectors
const activeSection = useNavStore(navSelectors.activeSection);
const scrollProgress = useNavStore(navSelectors.scrollProgress);
```

### 3. Application Store (`app-store.ts`)

Manages global application state including loading and cursor.

**State:**

- `isLoaded`: `boolean` - App fully loaded state
- `isPreloaderComplete`: `boolean` - Boot sequence complete
- `cursorState`: `'dot' | 'grow' | 'blend' | 'view'` - Custom cursor state

**Actions:**

- `setLoaded(loaded)` - Set loaded state
- `setPreloaderComplete(complete)` - Set preloader complete
- `setCursorState(state)` - Set cursor state
- `resetCursor()` - Reset cursor to default

**Persistence:** None (resets on page load)

**Example:**

```tsx
import { useAppStore, appSelectors } from '@/stores';

// Full store access
const { cursorState, setCursorState, resetCursor } = useAppStore();

// Optimized shallow selectors
const cursorState = useAppStore(appSelectors.cursorState);
const isLoaded = useAppStore(appSelectors.isLoaded);

// Update cursor on hover
<button onMouseEnter={() => setCursorState('grow')} onMouseLeave={resetCursor}>
  Click me
</button>;
```

### 4. Audio Store (`audio-store.ts`) - Optional

Manages audio settings with localStorage persistence.

**State:**

- `isMuted`: `boolean` - Global mute state
- `volume`: `number` - Master volume (0-1)
- `isAmbientPlaying`: `boolean` - Ambient sound playing

**Actions:**

- `toggleMute()` - Toggle mute
- `setMuted(muted)` - Set mute explicitly
- `setVolume(volume)` - Set volume level
- `toggleAmbient()` - Toggle ambient sound
- `setAmbientPlaying(playing)` - Set ambient explicitly

**Persistence:** localStorage key `'tsn-audio'` (mute and volume only)

**Example:**

```tsx
import { useAudioStore, audioSelectors } from '@/stores';

// Full store access
const { isMuted, volume, toggleMute, setVolume } = useAudioStore();

// Optimized shallow selectors
const isMuted = useAudioStore(audioSelectors.isMuted);
const volume = useAudioStore(audioSelectors.volume);

// Volume control
<input
  type="range"
  min="0"
  max="1"
  step="0.1"
  value={volume}
  onChange={(e) => setVolume(parseFloat(e.target.value))}
/>;
```

## Performance Optimization

All stores export **shallow selectors** to prevent unnecessary re-renders. Use them when you only need specific values:

```tsx
// ❌ Bad - causes re-render on any state change
const { mode, resolved, setMode } = useThemeStore();

// ✅ Good - only re-renders when mode changes
const mode = useThemeStore(themeSelectors.mode);
const setMode = useThemeStore(themeSelectors.setMode);
```

## SSR Considerations

Both `theme-store.ts` and `audio-store.ts` handle SSR properly:

- localStorage access is wrapped in SSR-safe checks
- Returns no-op storage implementation during server rendering
- Properly hydrates state on client side

## Architecture Principles

- **Domain-Driven Slicing:** Each store manages a single domain
- **No Derived State:** Compute derived values in selectors/components
- **Selective Persistence:** Only persist what's necessary
- **Type Safety:** Full TypeScript interfaces with JSDoc documentation
- **Performance First:** Shallow selectors prevent unnecessary re-renders
