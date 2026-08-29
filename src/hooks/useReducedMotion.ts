/**
 * useReducedMotion Hook
 *
 * Detects user's prefers-reduced-motion preference for accessibility.
 * Returns true when user has requested reduced motion, allowing components
 * to disable animations and transitions.
 *
 * **Architecture:**
 * - Monitors prefers-reduced-motion media query
 * - Listens for changes to user preference
 * - Returns boolean state
 * - SSR-safe with window checks
 * - Cleans up listener on unmount
 *
 * **Accessibility:**
 * - Respects user system preferences
 * - Enables accessible navigation for users with vestibular disorders
 * - Complies with WCAG 2.1 Success Criterion 2.3.3
 *
 * **Requirements: 11.7, 28.5**
 *
 * @module hooks/useReducedMotion
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * useReducedMotion hook
 *
 * Detects whether the user has requested reduced motion via their
 * operating system or browser settings. When true, animations should
 * be disabled or minimized.
 *
 * @returns Boolean indicating if reduced motion is preferred
 *
 * @example
 * ```tsx
 * // Conditionally disable animations
 * function AnimatedCard() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   return (
 *     <motion.div
 *       animate={{ opacity: 1, y: 0 }}
 *       initial={{ opacity: 0, y: 20 }}
 *       transition={{
 *         duration: prefersReducedMotion ? 0 : 0.5,
 *       }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Disable GSAP animations
 * function Hero() {
 *   const prefersReducedMotion = useReducedMotion();
 *   const elementRef = useRef<HTMLDivElement>(null);
 *
 *   useEffect(() => {
 *     if (!elementRef.current || prefersReducedMotion) return;
 *
 *     gsap.to(elementRef.current, {
 *       opacity: 1,
 *       duration: 1,
 *     });
 *   }, [prefersReducedMotion]);
 *
 *   return <div ref={elementRef}>Hero Content</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditional animation classes
 * function Button() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   return (
 *     <button
 *       className={cn(
 *         'px-4 py-2',
 *         !prefersReducedMotion && 'transition-transform hover:scale-105'
 *       )}
 *     >
 *       Click Me
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Disable smooth scrolling
 * function ScrollToTop() {
 *   const prefersReducedMotion = useReducedMotion();
 *   const lenis = useLenis();
 *
 *   const handleClick = () => {
 *     lenis?.scrollTo(0, {
 *       duration: prefersReducedMotion ? 0 : 1.5,
 *     });
 *   };
 *
 *   return <button onClick={handleClick}>Top</button>;
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  // SSR-safe: lazy initialization to get initial value from media query
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // SSR safety check
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false; // Default to animations enabled during SSR
    }

    // Get initial value from media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  });

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    // Create media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers: addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers: addListener (deprecated)
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback cleanup
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
