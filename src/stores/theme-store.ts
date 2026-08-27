/**
 * Theme Store
 *
 * Manages the application theme state with three modes: system, dark, and light.
 * Persists user preference to localStorage and resolves the active theme based on
 * system preferences when in system mode.
 *
 * @module stores/theme-store
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Theme mode type - user's preference setting
 */
export type ThemeMode = 'system' | 'dark' | 'light';

/**
 * Resolved theme type - the actual theme being displayed
 */
export type ResolvedTheme = 'dark' | 'light';

/**
 * Theme store state interface
 */
interface ThemeState {
  /**
   * User's theme mode preference (system/dark/light)
   */
  mode: ThemeMode;

  /**
   * Currently resolved and active theme (dark/light)
   */
  resolved: ResolvedTheme;

  /**
   * Set the theme mode and update resolved theme accordingly
   * @param mode - The theme mode to set
   */
  setMode: (mode: ThemeMode) => void;

  /**
   * Internal method to update resolved theme based on system preference
   * @param resolved - The resolved theme value
   */
  setResolved: (resolved: ResolvedTheme) => void;
}

/**
 * Detects the system's color scheme preference
 * @returns 'dark' or 'light' based on system preference
 */
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') {
    return 'dark'; // Default for SSR
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Resolves the actual theme to display based on mode and system preference
 * @param mode - The current theme mode
 * @returns The resolved theme value
 */
const resolveTheme = (mode: ThemeMode): ResolvedTheme => {
  if (mode === 'system') {
    return getSystemTheme();
  }
  return mode as ResolvedTheme;
};

/**
 * Theme store with localStorage persistence
 *
 * Priority order for theme resolution:
 * 1. User toggle (if set)
 * 2. localStorage (if persisted)
 * 3. System preference
 * 4. Default to dark
 *
 * @example
 * ```tsx
 * const { mode, resolved, setMode } = useThemeStore();
 *
 * // Set theme mode
 * setMode('dark');
 *
 * // Use with shallow comparison for performance
 * const mode = useThemeStore((state) => state.mode);
 * ```
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      resolved: 'dark',

      setMode: (mode: ThemeMode) => {
        set({
          mode,
          resolved: resolveTheme(mode),
        });
      },

      setResolved: (resolved: ResolvedTheme) => {
        set({ resolved });
      },
    }),
    {
      name: 'tsn-theme',
      storage: createJSONStorage(() => {
        // SSR-safe localStorage access
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (state) => ({
        // Only persist the mode, not the resolved theme
        mode: state.mode,
      }),
      onRehydrateStorage: () => (state) => {
        // After hydration, resolve the theme based on persisted mode
        if (state) {
          state.resolved = resolveTheme(state.mode);
        }
      },
    }
  )
);

/**
 * Initialize theme system listeners for system preference changes
 * Should be called once in the app lifecycle (e.g., in a provider or layout effect)
 */
export const initThemeListener = () => {
  if (typeof window === 'undefined') return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const { mode, setResolved } = useThemeStore.getState();

    // Only update if in system mode
    if (mode === 'system') {
      setResolved(e.matches ? 'dark' : 'light');
    }
  };

  // Initial check
  handleChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener('change', handleChange);

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};

/**
 * Shallow selector utilities for performance optimization
 */
export const themeSelectors = {
  /**
   * Select only the mode value
   */
  mode: (state: ThemeState) => state.mode,

  /**
   * Select only the resolved theme value
   */
  resolved: (state: ThemeState) => state.resolved,

  /**
   * Select only the setMode function
   */
  setMode: (state: ThemeState) => state.setMode,
};
