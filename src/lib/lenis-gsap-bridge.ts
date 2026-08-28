import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

/**
 * Synchronizes Lenis smooth scroll with GSAP ScrollTrigger and ticker.
 *
 * This function creates the critical bridge between Lenis (smooth scroll library)
 * and GSAP's animation system. It ensures they work in a single RAF loop for
 * optimal performance and prevents animation jank or desynchronization.
 *
 * **What this does:**
 * 1. Syncs Lenis scroll events with ScrollTrigger updates
 * 2. Adds Lenis to GSAP's ticker for unified RAF loop
 * 3. Disables GSAP's lag smoothing to prevent conflicts
 *
 * **Performance Impact:**
 * - Single `requestAnimationFrame` loop instead of multiple
 * - Prevents scroll event listener overhead
 * - Ensures all animations stay in sync with scroll position
 *
 * @param lenis - Initialized Lenis instance
 * @returns Cleanup function to remove all synchronization
 *
 * @example
 * ```tsx
 * // In LenisProvider
 * useEffect(() => {
 *   const lenis = new Lenis({
 *     duration: 1.2,
 *     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
 *     smoothWheel: true,
 *   });
 *
 *   // Synchronize Lenis with GSAP
 *   const cleanup = syncLenisWithGSAP(lenis);
 *
 *   return () => {
 *     cleanup();
 *     lenis.destroy();
 *   };
 * }, []);
 * ```
 *
 * **Requirements: 22.1, 22.2, 22.3, 22.4, 22.5**
 *
 * @see https://lenis.studiofreight.com/
 * @see https://greensock.com/docs/v3/GSAP/gsap.ticker
 */
export function syncLenisWithGSAP(lenis: Lenis): () => void {
  // Sync Lenis scroll events with ScrollTrigger updates
  // This ensures ScrollTrigger recalculates trigger positions on scroll
  lenis.on('scroll', ScrollTrigger.update);

  // Create RAF callback for GSAP ticker
  // GSAP ticker provides time in seconds, Lenis expects milliseconds
  const rafCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  // Add Lenis to GSAP's ticker (single RAF loop)
  gsap.ticker.add(rafCallback);

  // Disable GSAP's lag smoothing to prevent conflicts with Lenis
  // Lenis handles its own smoothing, GSAP's would interfere
  gsap.ticker.lagSmoothing(0);

  // Return cleanup function
  return () => {
    // Remove scroll listener
    lenis.off('scroll', ScrollTrigger.update);

    // Remove from GSAP ticker
    gsap.ticker.remove(rafCallback);

    // Re-enable lag smoothing if needed for other animations
    gsap.ticker.lagSmoothing(500, 33);
  };
}

/**
 * Configuration options for Lenis initialization.
 *
 * These are optimized defaults based on the design specifications.
 * Adjust per-device in the provider based on performance needs.
 */
export const LENIS_DEFAULT_OPTIONS = {
  /** Animation duration in seconds (1.2s = smooth but not sluggish) */
  duration: 1.2,

  /** Easing function - smooth deceleration curve */
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  /** Scroll direction */
  orientation: 'vertical' as const,

  /** Gesture direction for touch devices */
  gestureOrientation: 'vertical' as const,

  /** Enable smooth wheel scrolling */
  smoothWheel: true,

  /** Wheel scroll sensitivity (1 = normal, higher = faster) */
  wheelMultiplier: 1,

  /** Touch scroll sensitivity (higher for better mobile experience) */
  touchMultiplier: 2,

  /** Disable infinite scroll */
  infinite: false,
} as const;

/**
 * Mobile-optimized Lenis configuration.
 *
 * Reduces smoothing and duration for better performance on mobile devices.
 * Use this on touch devices or screens ≤ 768px.
 */
export const LENIS_MOBILE_OPTIONS = {
  ...LENIS_DEFAULT_OPTIONS,

  /** Faster duration for mobile (less smooth but more responsive) */
  duration: 0.8,

  /** Increase touch sensitivity */
  touchMultiplier: 2.5,

  /** Slightly increase wheel multiplier for better feel */
  wheelMultiplier: 1.2,
} as const;

/**
 * Checks if Lenis should be disabled based on user preferences.
 *
 * Lenis smooth scroll should be disabled when:
 * - User prefers reduced motion (accessibility)
 * - Device doesn't support smooth scrolling well
 *
 * @returns `true` if Lenis should be disabled
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   if (shouldDisableLenis()) {
 *     // Skip Lenis initialization
 *     return;
 *   }
 *
 *   const lenis = new Lenis(LENIS_DEFAULT_OPTIONS);
 *   // ... setup
 * }, []);
 * ```
 *
 * **Requirements: 22.5**
 */
export function shouldDisableLenis(): boolean {
  // SSR-safe check
  if (typeof window === 'undefined') {
    return true;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return prefersReducedMotion;
}

/**
 * Gets appropriate Lenis configuration based on device capabilities.
 *
 * Automatically detects mobile devices and returns optimized settings.
 *
 * @returns Lenis configuration object
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   if (shouldDisableLenis()) return;
 *
 *   const options = getLenisConfig();
 *   const lenis = new Lenis(options);
 *
 *   const cleanup = syncLenisWithGSAP(lenis);
 *
 *   return () => {
 *     cleanup();
 *     lenis.destroy();
 *   };
 * }, []);
 * ```
 */
export function getLenisConfig() {
  if (typeof window === 'undefined') {
    return LENIS_DEFAULT_OPTIONS;
  }

  // Detect mobile device
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // Return mobile config for touch devices or small screens
  if (isMobile || isTouch) {
    return LENIS_MOBILE_OPTIONS;
  }

  return LENIS_DEFAULT_OPTIONS;
}

/**
 * Type-safe Lenis instance check.
 *
 * @param lenis - Potential Lenis instance
 * @returns Type guard for Lenis instance
 */
export function isLenisInstance(lenis: unknown): lenis is Lenis {
  return (
    lenis !== null &&
    typeof lenis === 'object' &&
    'raf' in lenis &&
    'scrollTo' in lenis &&
    'on' in lenis &&
    'off' in lenis
  );
}

/**
 * Safely scrolls to a target using Lenis if available, falls back to native.
 *
 * This utility provides a safe way to programmatically scroll with Lenis,
 * with automatic fallback to native smooth scroll if Lenis is unavailable.
 *
 * @param lenis - Lenis instance (can be null)
 * @param target - Scroll target (CSS selector, element, or number in pixels)
 * @param options - Scroll options
 *
 * @example
 * ```tsx
 * const lenis = useLenis();
 *
 * const scrollToProjects = () => {
 *   safeLenisScrollTo(lenis, '#section-projects', {
 *     offset: -80, // Account for fixed header
 *     duration: 1.5,
 *   });
 * };
 * ```
 */
export function safeLenisScrollTo(
  lenis: Lenis | null,
  target: string | HTMLElement | number,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
    onComplete?: () => void;
  }
): void {
  // If Lenis is available, use it
  if (isLenisInstance(lenis)) {
    lenis.scrollTo(target, options);
    return;
  }

  // Fallback to native smooth scroll
  let scrollTarget: Element | null = null;

  if (typeof target === 'string') {
    scrollTarget = document.querySelector(target);
  } else if (target instanceof HTMLElement) {
    scrollTarget = target;
  } else if (typeof target === 'number') {
    // Scroll to Y position
    window.scrollTo({
      top: target + (options?.offset || 0),
      behavior: options?.immediate ? 'auto' : 'smooth',
    });
    options?.onComplete?.();
    return;
  }

  if (scrollTarget) {
    scrollTarget.scrollIntoView({
      behavior: options?.immediate ? 'auto' : 'smooth',
      block: 'start',
    });
    options?.onComplete?.();
  }
}
