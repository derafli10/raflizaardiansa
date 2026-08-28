/**
 * AnimationProvider Component
 *
 * Registers GSAP plugins and initializes global animation configuration.
 * Sets up ScrollTrigger defaults based on device capabilities.
 *
 * **Architecture:**
 * - Registers all required GSAP plugins (ScrollTrigger, DrawSVG, etc.)
 * - Calls initScrollTriggerDefaults() for device-optimized configuration
 * - Client-side only component for browser API access
 * - Handles cleanup of ScrollTriggers on unmount
 *
 * **Performance:**
 * - Configures GPU-accelerated animations
 * - Disables/simplifies animations on mobile for better performance
 * - Respects accessibility preferences (reduced motion)
 *
 * **Requirements: 4.1-4.7, 22.1-22.7**
 *
 * @module providers/AnimationProvider
 */

'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { initScrollTriggerDefaults } from '@/lib/scroll-config';

interface AnimationProviderProps {
  children: React.ReactNode;
}

/**
 * AnimationProvider component
 *
 * Must be a client component to register GSAP plugins.
 * Should be placed after LenisProvider in the provider hierarchy.
 *
 * @example
 * ```tsx
 * // In root layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ThemeProvider>
 *           <LenisProvider>
 *             <AnimationProvider>
 *               {children}
 *             </AnimationProvider>
 *           </LenisProvider>
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  useEffect(() => {
    // Register all GSAP plugins
    gsap.registerPlugin(
      ScrollTrigger,
      DrawSVGPlugin,
      MotionPathPlugin,
      TextPlugin,
      MorphSVGPlugin,
      SplitText
    );

    // Initialize ScrollTrigger with device-optimized defaults
    initScrollTriggerDefaults();

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
