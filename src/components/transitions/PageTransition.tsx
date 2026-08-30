'use client';

import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import {
  fadeVariants,
  slideUpVariants,
  scaleVariants,
  circuitTraceVariants,
  EASINGS,
} from './variants';

export type TransitionType = 'fade' | 'slide' | 'scale' | 'circuit';

export interface PageTransitionProps {
  /** Content to animate on mount/unmount/route change */
  children: ReactNode;
  /** Unique key for AnimatePresence to detect view changes */
  transitionKey?: string | number;
  /** Type of transition animation @default 'fade' */
  type?: TransitionType;
  /** Duration of transition in seconds @default 0.35 */
  duration?: number;
  /** AnimatePresence mode @default 'wait' */
  mode?: 'wait' | 'sync' | 'popLayout';
  /** Additional CSS classes */
  className?: string;
}

const VARIANTS_MAP = {
  fade: fadeVariants,
  slide: slideUpVariants,
  scale: scaleVariants,
  circuit: circuitTraceVariants,
};

/**
 * PageTransition — AnimatePresence Page and View Wrapper.
 *
 * Provides smooth, hardware-accelerated transitions across pages, views, and route updates.
 * Automatically respects `prefers-reduced-motion` for instant accessible rendering.
 *
 * **Requirements: 8.1, 8.5, 8.6**
 */
export function PageTransition({
  children,
  transitionKey,
  type = 'fade',
  duration = 0.35,
  mode = 'wait',
  className,
}: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const selectedVariants = VARIANTS_MAP[type] || fadeVariants;

  if (prefersReducedMotion) {
    return <div className={cn('w-full', className)}>{children}</div>;
  }

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={transitionKey}
        variants={selectedVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration,
          ease: EASINGS.circuit,
        }}
        className={cn('w-full', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

PageTransition.displayName = 'PageTransition';
