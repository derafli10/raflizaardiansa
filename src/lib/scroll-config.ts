import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes ScrollTrigger with device-optimized defaults.
 *
 * Configures GSAP ScrollTrigger based on device capabilities:
 * - Detects mobile devices and adjusts animation complexity
 * - Disables parallax effects on mobile for performance
 * - Configures proper refresh behavior for responsive layouts
 * - Simplifies or disables animations on touch devices
 *
 * This function should be called once during app initialization,
 * typically in a provider component or root layout.
 *
 * **Performance Strategy:**
 * - Mobile: Disable scrub animations (instant instead of smooth)
 * - Touch devices: Reduce animation duration to near-zero
 * - Desktop: Full animation capabilities enabled
 *
 * @example
 * ```tsx
 * // In AnimationProvider or root layout
 * 'use client';
 *
 * import { useEffect } from 'react';
 * import { initScrollTriggerDefaults } from '@/lib/scroll-config';
 *
 * export function AnimationProvider({ children }) {
 *   useEffect(() => {
 *     // Initialize on mount
 *     initScrollTriggerDefaults();
 *
 *     // Cleanup on unmount
 *     return () => {
 *       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
 *     };
 *   }, []);
 *
 *   return <>{children}</>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditional animation based on device
 * useEffect(() => {
 *   const isMobile = window.matchMedia('(max-width: 768px)').matches;
 *
 *   gsap.to('.parallax-element', {
 *     scrollTrigger: {
 *       trigger: '.section',
 *       start: 'top bottom',
 *       end: 'bottom top',
 *       scrub: isMobile ? false : 1, // Instant on mobile
 *     },
 *     y: isMobile ? 0 : 100, // No parallax on mobile
 *   });
 * }, []);
 * ```
 *
 * **Device Detection:**
 * - Mobile: Screen width ≤ 768px
 * - Touch: Primary input is touch (coarse pointer)
 *
 * **ScrollTrigger Config:**
 * - `ignoreMobileResize`: Prevents unnecessary recalculation on mobile address bar show/hide
 * - `autoRefreshEvents`: Triggers recalculation on visibility change and page load
 *
 * **Requirements: 22.1, 22.2, 22.3, 22.4, 22.5**
 *
 * @see https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.config()
 */
export function initScrollTriggerDefaults(): void {
  // SSR-safe: Only run in browser
  if (typeof window === 'undefined') {
    return;
  }

  // Detect device capabilities
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // Configure global ScrollTrigger settings
  ScrollTrigger.config({
    // Ignore mobile resize events (address bar show/hide)
    ignoreMobileResize: true,

    // Auto-refresh on these events
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  // Set default options for all ScrollTriggers
  ScrollTrigger.defaults({
    // Disable smooth scrub on mobile for performance
    // false = instant, 1 = smooth (1 second lag)
    scrub: isMobile ? false : 1,

    // Disable debug markers (set to true during development if needed)
    markers: false,
  });

  // Simplify animations on touch devices
  // This makes all GSAP animations nearly instant
  if (isTouch) {
    gsap.defaults({
      duration: 0, // Instant animations on touch devices
    });
  }
}

/**
 * Helper function to check if device is mobile.
 *
 * @returns `true` if viewport width is ≤ 768px
 *
 * @example
 * ```tsx
 * if (isMobileDevice()) {
 *   // Simplified animation for mobile
 *   gsap.to(element, { opacity: 1, duration: 0.3 });
 * } else {
 *   // Complex animation for desktop
 *   gsap.to(element, { opacity: 1, y: 50, duration: 1 });
 * }
 * ```
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

/**
 * Helper function to check if device has touch input.
 *
 * @returns `true` if primary input is touch (coarse pointer)
 *
 * @example
 * ```tsx
 * if (isTouchDevice()) {
 *   // Disable hover effects on touch
 *   return;
 * }
 *
 * // Enable hover animations for mouse users
 * element.addEventListener('mouseenter', () => {
 *   gsap.to(element, { scale: 1.05 });
 * });
 * ```
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Refreshes all ScrollTriggers.
 *
 * Useful after dynamic content changes or layout shifts.
 * Should be called sparingly as it recalculates all trigger positions.
 *
 * @example
 * ```tsx
 * // After loading images
 * const img = new Image();
 * img.onload = () => {
 *   refreshScrollTriggers();
 * };
 * ```
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}

/**
 * Kills all active ScrollTriggers.
 *
 * Use this for cleanup when unmounting components or
 * transitioning between pages.
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   // Setup animations
 *
 *   return () => {
 *     killAllScrollTriggers();
 *   };
 * }, []);
 * ```
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
