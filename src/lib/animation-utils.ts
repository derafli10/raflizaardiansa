import { gsap } from 'gsap';
import type React from 'react';

/**
 * Promotes element to GPU compositing layer temporarily during animation.
 *
 * Uses `will-change` CSS property to hint to the browser that the element
 * will be animated, allowing it to optimize rendering. Automatically removes
 * the hint after the specified duration to avoid memory overhead.
 *
 * @param element - The HTML element to promote
 * @param duration - Duration in seconds (0 = permanent until manually removed)
 *
 * @example
 * ```tsx
 * const handleAnimate = () => {
 *   const el = heroRef.current;
 *   if (!el) return;
 *
 *   // Promote for 1 second animation
 *   promoteLayer(el, 1);
 *
 *   gsap.to(el, {
 *     x: 100,
 *     opacity: 0.5,
 *     duration: 1
 *   });
 * };
 * ```
 *
 * **Requirements: 22.1, 22.2**
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
 */
export function promoteLayer(element: HTMLElement, duration: number = 0): void {
  element.style.willChange = 'transform, opacity';

  if (duration > 0) {
    setTimeout(() => {
      element.style.willChange = 'auto';
    }, duration * 1000);
  }
}

/**
 * Creates a GSAP context with automatic cleanup for React components.
 *
 * GSAP contexts scope animations to a specific element and provide automatic
 * cleanup when the component unmounts, preventing memory leaks.
 *
 * @param scope - React ref pointing to the container element
 * @param setup - Function that creates animations within the context
 * @returns Cleanup function to be called in useEffect return
 *
 * @example
 * ```tsx
 * const Hero = () => {
 *   const heroRef = useRef<HTMLElement>(null);
 *
 *   useEffect(() => {
 *     return createAnimationContext(heroRef, () => {
 *       gsap.from('.hero-title', {
 *         opacity: 0,
 *         y: 40,
 *         duration: 1
 *       });
 *
 *       gsap.from('.hero-text', {
 *         opacity: 0,
 *         y: 20,
 *         duration: 1,
 *         delay: 0.2
 *       });
 *     });
 *   }, []);
 *
 *   return <section ref={heroRef}>...</section>;
 * };
 * ```
 *
 * **Requirements: 22.3, 22.4**
 *
 * @see https://greensock.com/docs/v3/GSAP/gsap.context()
 */
export function createAnimationContext(
  scope: React.RefObject<HTMLElement>,
  setup: (ctx: gsap.Context) => void
): () => void {
  const ctx = gsap.context(setup, scope);
  return () => ctx.revert();
}

/**
 * Creates a safe ScrollTrigger animation with intelligent defaults.
 *
 * Wraps GSAP ScrollTrigger creation with defaults that ensure smooth
 * performance and proper cleanup. Always includes invalidateOnRefresh
 * to recalculate on window resize.
 *
 * @param config - ScrollTrigger configuration object
 * @returns GSAP Tween with ScrollTrigger attached
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   if (!sectionRef.current) return;
 *
 *   const tween = createScrollTrigger({
 *     trigger: sectionRef.current,
 *     start: 'top center',
 *     end: 'bottom center',
 *     scrub: 1,
 *     onEnter: () => console.log('Section entered'),
 *     animation: gsap.from('.fade-in', {
 *       opacity: 0,
 *       y: 50
 *     })
 *   });
 *
 *   return () => tween.kill();
 * }, []);
 * ```
 *
 * **Requirements: 22.4, 22.5**
 *
 * @see https://greensock.com/docs/v3/Plugins/ScrollTrigger
 */
export function createScrollTrigger(config: ScrollTrigger.Vars): gsap.core.Tween {
  return gsap.to(config.trigger || '', {
    scrollTrigger: {
      ...config,
      invalidateOnRefresh: true,
    },
  });
}

/**
 * Checks if the user has enabled reduced motion preference.
 *
 * SSR-safe function that detects the `prefers-reduced-motion` media query.
 * Components should use this to disable or simplify animations for users
 * who prefer reduced motion for accessibility reasons.
 *
 * @returns `true` if user prefers reduced motion, `false` otherwise
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   if (prefersReducedMotion()) {
 *     // Skip animations
 *     return;
 *   }
 *
 *   // Perform animations
 *   gsap.from('.animated', {
 *     opacity: 0,
 *     y: 20,
 *     duration: 1
 *   });
 * }, []);
 * ```
 *
 * @example
 * ```tsx
 * // Hook version for reactive updates
 * const useReducedMotion = () => {
 *   const [reduced, setReduced] = useState(false);
 *
 *   useEffect(() => {
 *     setReduced(prefersReducedMotion());
 *
 *     const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
 *     const handleChange = () => setReduced(mediaQuery.matches);
 *
 *     mediaQuery.addEventListener('change', handleChange);
 *     return () => mediaQuery.removeEventListener('change', handleChange);
 *   }, []);
 *
 *   return reduced;
 * };
 * ```
 *
 * **Requirements: 22.5**
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export function prefersReducedMotion(): boolean {
  // SSR-safe: return false on server
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
