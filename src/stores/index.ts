/**
 * Store Index
 *
 * Central export point for all Zustand stores and their utilities.
 * Provides type-safe access to global state management.
 *
 * @module stores
 */

// Theme Store
export {
  useThemeStore,
  initThemeListener,
  themeSelectors,
  type ThemeMode,
  type ResolvedTheme,
} from './theme-store';

// Navigation Store
export { useNavStore, navSelectors } from './nav-store';

// Application Store
export { useAppStore, appSelectors, type CursorState } from './app-store';

// Audio Store (Optional)
export { useAudioStore, audioSelectors } from './audio-store';
