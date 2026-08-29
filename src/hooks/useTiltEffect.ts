/**
 * Tilt Effect Hook
 *
 * 3D tilt effect that rotates elements based on mouse position, creating
 * a depth effect. Uses CSS 3D transforms with hardware acceleration for
 * smooth 60fps performance.
 *
 * @module hooks/useTiltEffect
 */

import { useEffect, useRef } from 'react';

/**
 * Configuration options for tilt effect
 */
interface TiltOptions {
  /**
   * Tilt intensity in degrees
   * Higher values = more dramatic tilt
   * @default 10
   */
  intensity?: number;
}

/**
 * useTiltEffect Hook
 *
 * Creates a 3D tilt effect that rotates an element based on cursor position
 * relative to the element center. Adds subtle scale for depth perception.
 *
 * **Performance:**
 * - Hardware-accelerated 3D transforms (GPU)
 * - 60fps smooth transitions via CSS
 * - Uses transform and perspective only
 * - Automatic cleanup on unmount
 * - SSR-safe with proper checks
 *
 * **Behavior:**
 * 1. Tracks mouse position relative to element center
 * 2. Applies 3D rotation (rotateX, rotateY) based on position
 * 3. Adds subtle scale (1.02) for depth effect on hover
 * 4. Returns to flat state when cursor leaves
 * 5. Smooth CSS transitions handle animation
 *
 * @template T - HTML element type (must extend HTMLElement)
 * @param options - Configuration object
 * @param options.intensity - Tilt intensity in degrees (default: 10)
 * @returns React ref to attach to the target element
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * const tiltRef = useTiltEffect<HTMLDivElement>();
 * <div ref={tiltRef} className="card">
 *   3D Tilt Card
 * </div>
 *
 * // Custom intensity for dramatic effect
 * const tiltRef = useTiltEffect<HTMLDivElement>({
 *   intensity: 15
 * });
 * <div ref={tiltRef} className="hero-card">
 *   Dramatic Tilt
 * </div>
 *
 * // Subtle tilt for interactive cards
 * const tiltRef = useTiltEffect<HTMLButtonElement>({
 *   intensity: 5
 * });
 * <button ref={tiltRef}>Subtle 3D Button</button>
 * ```
 *
 * **CSS Requirements:**
 * Ensure the element has `transform-style: preserve-3d` and a transition:
 * ```css
 * .tilt-element {
 *   transform-style: preserve-3d;
 *   transition: transform 0.3s ease-out;
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective CSS 3D Transforms}
 */
export function useTiltEffect<T extends HTMLElement>(options: TiltOptions = {}) {
  const { intensity = 10 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    // SSR guard - only run in browser
    if (typeof window === 'undefined') return;

    const element = ref.current;
    if (!element) return;

    // Set initial transform style with hardware acceleration
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = 'transform 0.3s ease-out';
    element.style.willChange = 'transform';

    /**
     * Handle mouse move - calculate 3D rotation based on cursor position
     */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      // Get cursor position relative to element
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate center point
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation angles
      // Y-axis rotation based on X position (left/right tilt)
      // X-axis rotation based on Y position (top/bottom tilt)
      // Inverted for natural perspective (cursor up = card tilts up)
      const rotateX = ((y - centerY) / centerY) * intensity;
      const rotateY = ((centerX - x) / centerX) * intensity;

      // Apply 3D transform with perspective and subtle scale
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    /**
     * Handle mouse leave - return to flat state
     */
    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    // Attach event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup on unmount or dependency change
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);

      // Reset transform to avoid visual artifacts
      if (element) {
        element.style.transform = '';
        element.style.willChange = '';
      }
    };
  }, [intensity]);

  return ref;
}
