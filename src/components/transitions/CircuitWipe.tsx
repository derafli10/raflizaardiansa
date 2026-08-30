'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import { EASINGS } from './variants';

export interface CircuitWipeProps {
  /** Controlled active state of the circuit wipe */
  isActive: boolean;
  /** Primary accent color ('copper' | 'cyan' | 'green') @default 'copper' */
  color?: 'copper' | 'cyan' | 'green';
  /** Additional CSS classes */
  className?: string;
  /** Callback fired when wipe finishes entrance */
  onEntered?: () => void;
  /** Callback fired when wipe finishes exit */
  onExited?: () => void;
}

const COLOR_STYLES = {
  copper: {
    bg: 'bg-substrate',
    border: 'border-copper',
    glow: 'rgba(212, 165, 116, 0.4)',
    trace: 'var(--color-copper)',
  },
  cyan: {
    bg: 'bg-substrate',
    border: 'border-signal-cyan',
    glow: 'rgba(6, 182, 212, 0.4)',
    trace: 'var(--color-signal-cyan)',
  },
  green: {
    bg: 'bg-substrate',
    border: 'border-signal-green',
    glow: 'rgba(16, 185, 129, 0.4)',
    trace: 'var(--color-signal-green)',
  },
};

/**
 * CircuitWipe — Animated Circuit Trace Transition Screen.
 *
 * Expands a PCB circuit wipe across the viewport during page/route transitions.
 * Features 45-degree angled perimeter traces, copper corner pads, and
 * hardware-accelerated clip-path wipe animation.
 *
 * **Requirements: 8.2, 8.3, 8.6**
 */
export function CircuitWipe({
  isActive,
  color = 'copper',
  className,
  onEntered,
  onExited,
}: CircuitWipeProps) {
  const prefersReducedMotion = useReducedMotion();
  const theme = COLOR_STYLES[color] || COLOR_STYLES.copper;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={onExited}>
      {isActive && (
        <motion.div
          key="circuit-wipe-overlay"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: EASINGS.circuit,
          }}
          onAnimationComplete={() => onEntered?.()}
          className={cn(
            'z-modal pointer-events-none fixed inset-0 flex origin-top items-center justify-center',
            theme.bg,
            className
          )}
          style={{
            boxShadow: `0 0 60px ${theme.glow}`,
          }}
        >
          {/* Decorative PCB Corner Accents */}
          <div className="border-substrate-raised pointer-events-none absolute inset-8 border">
            {/* Top-Left Corner */}
            <span
              className={cn('absolute -top-1 -left-1 h-6 w-6 border-t-2 border-l-2', theme.border)}
            />
            {/* Top-Right Corner */}
            <span
              className={cn('absolute -top-1 -right-1 h-6 w-6 border-t-2 border-r-2', theme.border)}
            />
            {/* Bottom-Left Corner */}
            <span
              className={cn(
                'absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2',
                theme.border
              )}
            />
            {/* Bottom-Right Corner */}
            <span
              className={cn(
                'absolute -right-1 -bottom-1 h-6 w-6 border-r-2 border-b-2',
                theme.border
              )}
            />

            {/* Center Scanline Signal Trace */}
            <div className="via-copper absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent to-transparent opacity-80" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

CircuitWipe.displayName = 'CircuitWipe';
