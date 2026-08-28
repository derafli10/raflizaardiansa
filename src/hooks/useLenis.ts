/**
 * useLenis Hook
 *
 * Re-exports useLenis from LenisProvider for cleaner imports and provides
 * additional utility functions for common Lenis operations.
 *
 * **Architecture:**
 * - Re-exports core useLenis hook from LenisProvider
 * - Provides wrapper utilities for common scroll operations
 * - Type-safe Lenis API access
 * - SSR-safe with null checks
 *
 * **Usage:**
 * Import from hooks directory for cleaner imports:
 * ```ts
 * import { useLenis } from '@/hooks/useLenis';
 * ```
 *
 * Instead of:
 * ```ts
 * import { useLenis } from '@/providers/LenisProvider';
 * ```
 *
 * **Requirements: 6.1, 6.6, 22.6**
 *
 * @module hooks/useLenis
 */

'use client';

import Lenis from 'lenis';
import { useLenis as useLenisCore } from '@/providers/LenisProvider';

/**
 * Re-export core useLenis hook from LenisProvider
 *
 * Access Lenis instance for imperative scroll control.
 *
 * @returns Lenis instance or null if disabled/not initialized
 *
 * @example
 * ```tsx
 * function ScrollToTop() {
 *   const lenis = useLenis();
 *
 *   const handleClick = () => {
 *     lenis?.scrollTo(0, { duration: 1.5 });
 *   };
 *
 *   return <button onClick={handleClick}>Scroll to Top</button>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function SmoothLink({ href, children }) {
 *   const lenis = useLenis();
 *
 *   const handleClick = (e) => {
 *     e.preventDefault();
 *     lenis?.scrollTo(href, {
 *       offset: -80, // Account for fixed header
 *       duration: 1.2,
 *     });
 *   };
 *
 *   return <a href={href} onClick={handleClick}>{children}</a>;
 * }
 * ```
 */
export { useLenisCore as useLenis };

/**
 * Lenis scroll options
 */
export interface LenisScrollOptions {
  /**
   * Scroll offset in pixels (e.g., -80 for fixed header)
   */
  offset?: number;

  /**
   * Duration in seconds
   */
  duration?: number;

  /**
   * Easing function name
   */
  easing?: (t: number) => number;

  /**
   * Whether to force scroll even if target is already in view
   */
  force?: boolean;

  /**
   * Whether to lock scroll during animation
   */
  lock?: boolean;

  /**
   * Callback when scroll completes
   */
  onComplete?: () => void;
}

/**
 * useLenisScroll Hook
 *
 * Provides utility functions for common Lenis scroll operations
 * with sensible defaults.
 *
 * @returns Object with scroll utility functions
 *
 * @example
 * ```tsx
 * function Navigation() {
 *   const { scrollToSection, scrollToTop } = useLenisScroll();
 *
 *   return (
 *     <nav>
 *       <button onClick={scrollToTop}>Home</button>
 *       <button onClick={() => scrollToSection('#about')}>About</button>
 *       <button onClick={() => scrollToSection('#projects')}>Projects</button>
 *     </nav>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom options
 * function CustomScroll() {
 *   const { scrollToSection } = useLenisScroll();
 *
 *   const handleClick = () => {
 *     scrollToSection('#contact', {
 *       offset: -100,
 *       duration: 2,
 *       onComplete: () => console.log('Scrolled to contact'),
 *     });
 *   };
 *
 *   return <button onClick={handleClick}>Contact</button>;
 * }
 * ```
 */
export function useLenisScroll() {
  const lenis = useLenisCore();

  /**
   * Scroll to a specific element or selector
   *
   * @param target - CSS selector or element
   * @param options - Scroll options
   */
  const scrollToSection = (target: string | HTMLElement, options: LenisScrollOptions = {}) => {
    if (!lenis) return;

    lenis.scrollTo(target, {
      offset: options.offset ?? -80, // Default 80px offset for navbar
      duration: options.duration ?? 1.2,
      easing: options.easing,
      force: options.force,
      lock: options.lock,
      onComplete: options.onComplete,
    });
  };

  /**
   * Scroll to top of page
   *
   * @param options - Scroll options
   */
  const scrollToTop = (options: LenisScrollOptions = {}) => {
    if (!lenis) return;

    lenis.scrollTo(0, {
      duration: options.duration ?? 1.5,
      easing: options.easing,
      force: options.force,
      lock: options.lock,
      onComplete: options.onComplete,
    });
  };

  /**
   * Scroll to bottom of page
   *
   * @param options - Scroll options
   */
  const scrollToBottom = (options: LenisScrollOptions = {}) => {
    if (!lenis) return;
    if (typeof document === 'undefined') return;

    const documentHeight = document.documentElement.scrollHeight;

    lenis.scrollTo(documentHeight, {
      duration: options.duration ?? 1.5,
      easing: options.easing,
      force: options.force,
      lock: options.lock,
      onComplete: options.onComplete,
    });
  };

  /**
   * Start smooth scroll (if paused)
   */
  const start = () => {
    if (!lenis) return;
    lenis.start();
  };

  /**
   * Stop/pause smooth scroll
   */
  const stop = () => {
    if (!lenis) return;
    lenis.stop();
  };

  /**
   * Check if Lenis is initialized
   */
  const isReady = !!lenis;

  return {
    lenis,
    isReady,
    scrollToSection,
    scrollToTop,
    scrollToBottom,
    start,
    stop,
  };
}

/**
 * Type export for Lenis instance
 */
export type { Lenis };
