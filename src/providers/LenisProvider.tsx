/**
 * LenisProvider Component
 *
 * Initializes and provides Lenis smooth scroll context to the application.
 * Synchronizes Lenis with GSAP ticker for unified animation loop.
 *
 * **Architecture:**
 * - Creates Lenis instance with device-optimized configuration
 * - Syncs with GSAP ticker via lenis-gsap-bridge
 * - Provides Lenis instance via React context for imperative scrollTo calls
 * - Handles proper cleanup on unmount
 * - Respects prefers-reduced-motion accessibility setting
 *
 * **Performance:**
 * - Single requestAnimationFrame loop for all animations
 * - Device-specific configurations for optimal smoothness
 * - Automatic disabling on reduced motion preference
 *
 * **Requirements: 4.1-4.7, 22.1-22.7**
 *
 * @module providers/LenisProvider
 */

'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { syncLenisWithGSAP, shouldDisableLenis, getLenisConfig } from '@/lib/lenis-gsap-bridge';

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

interface LenisProviderProps {
  children: React.ReactNode;
}

/**
 * LenisProvider component
 *
 * Must be a client component to access browser APIs and create Lenis instance.
 * Should be placed high in the component tree, typically in root layout.
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
export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in strict mode
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Check if Lenis should be disabled (reduced motion, SSR)
    if (shouldDisableLenis()) {
      return;
    }

    // Get device-optimized configuration
    const config = getLenisConfig();

    // Create Lenis instance
    const lenisInstance = new Lenis(config);

    // Synchronize with GSAP ticker
    const cleanup = syncLenisWithGSAP(lenisInstance);
    cleanupRef.current = cleanup;

    // Store instance in state - using queueMicrotask to avoid synchronous setState
    queueMicrotask(() => {
      setLenis(lenisInstance);
    });

    // Cleanup function
    return () => {
      isInitializedRef.current = false;

      // Remove GSAP synchronization
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      // Destroy Lenis instance
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>;
}

/**
 * useLenis hook
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
export function useLenis(): Lenis | null {
  const context = useContext(LenisContext);

  if (context === undefined) {
    throw new Error('useLenis must be used within LenisProvider');
  }

  return context.lenis;
}
