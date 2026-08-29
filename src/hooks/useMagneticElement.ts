/**
 * Magnetic Element Hook
 *
 * GSAP-based magnetic pull effect that attracts elements toward the cursor
 * when within a specified radius. Ultra-smooth 60fps animations using
 * hardware-accelerated transforms only.
 *
 * @module hooks/useMagneticElement
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Configuration options for magnetic effect
 */
interface MagneticOptions {
  /**
   * Pull strength multiplier (0-1)
   * Higher values = stronger magnetic pull
   * @default 0.3
   */
  strength?: number;

  /**
   * Effect radius in pixels from element center
   * Elements are pulled when cursor is within this distance
   * @default 100
   */
  radius?: number;
}

/**
 * useMagneticElement Hook
 *
 * Creates a magnetic pull effect that smoothly attracts an element toward
 * the cursor position when within the specified radius. Uses GSAP for
 * hardware-accelerated transforms (translate only).
 *
 * **Performance:**
 * - Hardware-accelerated transforms (GPU)
 * - 60fps smooth animations
 * - Automatic cleanup on unmount
 * - SSR-safe with proper checks
 *
 * **Behavior:**
 * 1. Calculates distance from cursor to element center
 * 2. Applies pull effect with strength based on proximity
 * 3. Returns to original position when cursor leaves radius
 * 4. Smooth easing with GSAP power2.out
 *
 * @template T - HTML element type (must extend HTMLElement)
 * @param options - Configuration object
 * @param options.strength - Pull strength multiplier (0-1, default: 0.3)
 * @param options.radius - Effect radius in pixels (default: 100)
 * @returns React ref to attach to the target element
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * const magneticRef = useMagneticElement<HTMLDivElement>();
 * <div ref={magneticRef}>Hover me</div>
 *
 * // Custom strength and radius
 * const magneticRef = useMagneticElement<HTMLButtonElement>({
 *   strength: 0.5,
 *   radius: 150
 * });
 * <button ref={magneticRef}>Magnetic Button</button>
 *
 * // Weak pull for subtle effect
 * const magneticRef = useMagneticElement<HTMLAnchorElement>({
 *   strength: 0.1,
 *   radius: 80
 * });
 * <a ref={magneticRef}>Subtle pull</a>
 * ```
 *
 * @see {@link https://gsap.com/ GSAP Documentation}
 */
export function useMagneticElement<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    // SSR guard - only run in browser
    if (typeof window === 'undefined') return;

    const element = ref.current;
    if (!element) return;

    /**
     * Handle mouse move - calculate magnetic pull based on cursor distance
     */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate delta from cursor to element center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate euclidean distance
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < radius) {
        // Within radius - apply magnetic pull
        // Pull strength decreases linearly with distance
        const pull = 1 - distance / radius;

        gsap.to(element, {
          x: deltaX * strength * pull,
          y: deltaY * strength * pull,
          duration: 0.3,
          ease: 'power2.out',
          // Use will-change for better performance hint
          force3D: true,
        });
      } else {
        // Outside radius - return to origin
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true,
        });
      }
    };

    /**
     * Handle mouse leave - return to original position
     */
    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      });
    };

    // Attach event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup on unmount or dependency change
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);

      // Kill any running GSAP animations on this element
      gsap.killTweensOf(element);
    };
  }, [strength, radius]);

  return ref;
}
