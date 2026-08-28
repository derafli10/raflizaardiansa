/**
 * ThemeProvider Component
 *
 * Provides theme context to the application using the theme-store.
 * Handles theme initialization, system preference detection, and DOM attribute updates.
 *
 * **Architecture:**
 * - Wraps theme-store with React context for convenient access
 * - Applies data-theme attribute to document root
 * - Listens for system preference changes when in system mode
 * - SSR-safe with proper hydration handling
 *
 * **Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7**
 *
 * @module providers/ThemeProvider
 */

'use client';

import { useEffect } from 'react';
import { useThemeStore, initThemeListener } from '@/stores/theme-store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider component
 *
 * Manages theme state and applies it to the document element.
 * Must be a client component to access browser APIs.
 *
 * @example
 * ```tsx
 * // In root layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html suppressHydrationMismatch>
 *       <body>
 *         <ThemeProvider>
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const resolved = useThemeStore((state) => state.resolved);

  useEffect(() => {
    // Initialize theme system listener for system preference changes
    const cleanup = initThemeListener();

    return cleanup;
  }, []);

  useEffect(() => {
    // Apply theme to document root
    // Use data-theme attribute for CSS custom property switching
    const root = document.documentElement;
    root.setAttribute('data-theme', resolved);

    // Also set class for Tailwind dark mode (if needed)
    if (resolved === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [resolved]);

  return <>{children}</>;
}

/**
 * useTheme hook
 *
 * Convenient access to theme state and controls.
 * Wraps the Zustand store for a cleaner API.
 *
 * @returns Theme state and controls
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { mode, resolved, setMode } = useTheme();
 *
 *   return (
 *     <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
 *       Current: {resolved}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme() {
  const mode = useThemeStore((state) => state.mode);
  const resolved = useThemeStore((state) => state.resolved);
  const setMode = useThemeStore((state) => state.setMode);

  return {
    /** User's theme preference (system/dark/light) */
    mode,
    /** Currently active theme (dark/light) */
    theme: resolved,
    /** Alias for theme (compatibility with next-themes API) */
    resolvedTheme: resolved,
    /** Set theme mode */
    setTheme: setMode,
  };
}
