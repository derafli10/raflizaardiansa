/**
 * useScrollProgress Hook
 *
 * Tracks scroll percentage (0-100) and updates nav-store with throttled updates
 * for performance optimization. Calculates scroll progress based on window.scrollY
 * and total scrollable document height.
 *
 * **Architecture:**
 * - Uses throttled scroll listener to minimize reflow calculations
 * - Clamps progress between 0-100
 * - Updates Zustand nav-store for global access
 * - SSR-safe with window checks
 * - Cleans up event listeners on unmount
 *
 * **Performance:**
 * - Throttles scroll events to ~16ms (60fps)
 * - Avoids unnecessary store updates
 * - Minimal DOM queries
 *
 * **Requirements: 6.8, 17.2, 22.6**
 *
 * @module hooks/useScrollProgress
 */

'use client';

import { useEffect, useRef } from 'react';
import { useNavStore } from '@/stores/nav-store';

/**
 * Throttle function to limit execution rate
 *
 * @param func - Function to throttle
 * @param delay - Minimum delay between executions in milliseconds
 * @returns Throttled function
 */
function throttle<T extends (...args: any[]) => void>(
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
 * Calculate scroll progress percentage
 *
 * @returns Scroll progress from 0 to 100
 */
function calculateScrollProgress(): number {
  // SSR safety check
  if (typeof window === 'undefined') return 0;

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Calculate total scrollable distance
  const scrollableDistance = documentHeight - windowHeight;

  // Avoid division by zero for non-scrollable pages
  if (scrollableDistance <= 0) return 0;

  // Calculate and clamp progress
  const progress = (scrollTop / scrollableDistance) * 100;
  return Math.max(0, Math.min(100, progress));
}

/**
 * useScrollProgress hook
 *
 * Monitors scroll position and updates global scroll progress state.
 * Automatically throttles updates for optimal performance.
 *
 * @example
 * Call this hook to track scroll progress and update the nav store
 *
 * @example
 * Access progress value from store: useNavStore((state) => state.scrollProgress)
 */
export function useScrollProgress(): void {
  const setScrollProgress = useNavStore((state) => state.setScrollProgress);
  const throttledUpdateRef = useRef<((...args: any[]) => void) | null>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    // Update scroll progress
    const updateScrollProgress = () => {
      const progress = calculateScrollProgress();
      setScrollProgress(progress);
    };

    // Create throttled version (60fps = ~16ms)
    throttledUpdateRef.current = throttle(updateScrollProgress, 16);

    // Initial calculation
    updateScrollProgress();

    // Attach scroll listener
    window.addEventListener('scroll', throttledUpdateRef.current, {
      passive: true,
    });

    // Handle window resize (changes scrollable height)
    window.addEventListener('resize', throttledUpdateRef.current, {
      passive: true,
    });

    // Cleanup
    return () => {
      if (throttledUpdateRef.current) {
        window.removeEventListener('scroll', throttledUpdateRef.current);
        window.removeEventListener('resize', throttledUpdateRef.current);
      }
    };
  }, [setScrollProgress]);
}
