/**
 * useScrollDirection Hook
 *
 * Detects scroll direction (up/down) by tracking previous scroll position.
 * Useful for showing/hiding navigation bars based on scroll behavior.
 *
 * **Architecture:**
 * - Tracks previous scroll position in ref
 * - Compares current vs previous to determine direction
 * - Returns 'up' | 'down' | null state
 * - Throttled updates for performance
 * - SSR-safe with window checks
 * - Cleans up event listeners on unmount
 *
 * **Performance:**
 * - Throttles scroll events to ~16ms (60fps)
 * - Minimal state updates
 * - No forced reflows
 *
 * **Requirements: 17.4**
 *
 * @module hooks/useScrollDirection
 */

'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Scroll direction type
 */
export type ScrollDirection = 'up' | 'down' | null;

/**
 * Hook options
 */
export interface UseScrollDirectionOptions {
  /**
   * Minimum scroll distance in pixels to trigger direction change
   * Prevents jittery updates from small scroll movements
   * @default 10
   */
  threshold?: number;

  /**
   * Throttle delay in milliseconds
   * @default 16 (~60fps)
   */
  throttleDelay?: number;
}

/**
 * Throttle function to limit execution rate
 *
 * @param func - Function to throttle
 * @param delay - Minimum delay between executions in milliseconds
 * @returns Throttled function
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func(...args);
    } else {
      // Schedule final call if throttled
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastCall = Date.now();
        func(...args);
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * useScrollDirection hook
 *
 * Detects whether user is scrolling up or down. Returns null initially
 * or when scroll position is at the top.
 *
 * @param options - Configuration options
 * @returns Current scroll direction ('up', 'down', or null)
 *
 * @example
 * ```tsx
 * // Hide navbar on scroll down, show on scroll up
 * function Navbar() {
 *   const scrollDirection = useScrollDirection();
 *   const isVisible = scrollDirection !== 'down';
 *
 *   return (
 *     <nav
 *       className={cn(
 *         'fixed top-0 transition-transform duration-300',
 *         isVisible ? 'translate-y-0' : '-translate-y-full'
 *       )}
 *     >
 *       Navigation Content
 *     </nav>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom threshold
 * function Navbar() {
 *   const scrollDirection = useScrollDirection({
 *     threshold: 20, // Need 20px scroll to trigger
 *   });
 *
 *   return <nav>...</nav>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Show floating action button only when scrolling up
 * function FloatingActionButton() {
 *   const scrollDirection = useScrollDirection();
 *   const [scrollY, setScrollY] = useState(0);
 *
 *   useEffect(() => {
 *     const handleScroll = () => setScrollY(window.scrollY);
 *     window.addEventListener('scroll', handleScroll);
 *     return () => window.removeEventListener('scroll', handleScroll);
 *   }, []);
 *
 *   const shouldShow = scrollY > 300 && scrollDirection === 'up';
 *
 *   return (
 *     <button
 *       className={cn(
 *         'fixed bottom-8 right-8 transition-opacity',
 *         shouldShow ? 'opacity-100' : 'opacity-0 pointer-events-none'
 *       )}
 *     >
 *       Back to Top
 *     </button>
 *   );
 * }
 * ```
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}): ScrollDirection {
  const { threshold = 10, throttleDelay = 16 } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const previousScrollY = useRef(0);
  const throttledUpdateRef = useRef<((...args: unknown[]) => void) | null>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    // Initialize previous scroll position
    previousScrollY.current = window.scrollY;

    // Update scroll direction
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - previousScrollY.current;

      // Check if scroll difference exceeds threshold
      if (Math.abs(diff) < threshold) {
        return; // Don't update for small movements
      }

      // Determine direction
      if (currentScrollY <= 0) {
        // At the top of the page
        setScrollDirection(null);
      } else if (diff > 0) {
        // Scrolling down
        setScrollDirection('down');
      } else {
        // Scrolling up
        setScrollDirection('up');
      }

      // Update previous position
      previousScrollY.current = currentScrollY;
    };

    // Create throttled version
    throttledUpdateRef.current = throttle(updateScrollDirection, throttleDelay);

    // Attach scroll listener
    window.addEventListener('scroll', throttledUpdateRef.current, {
      passive: true,
    });

    // Cleanup
    return () => {
      if (throttledUpdateRef.current) {
        window.removeEventListener('scroll', throttledUpdateRef.current);
      }
    };
  }, [threshold, throttleDelay]);

  return scrollDirection;
}
