import type { Variants, Transition, Easing } from 'motion/react';

/**
 * Standard hardware-accelerated cubic bezier easing definitions
 */
export const EASINGS: Record<
  'circuit' | 'signal' | 'smooth' | 'linear',
  [number, number, number, number]
> = {
  circuit: [0.16, 1, 0.3, 1], // fluid responsive ease-out
  signal: [0.34, 1.56, 0.64, 1], // bouncy spring ease
  smooth: [0.4, 0, 0.2, 1], // standard smooth transition
  linear: [0, 0, 1, 1],
};

/**
 * Generates an accessible motion transition respecting reduced motion
 */
export function getAccessibleTransition(
  prefersReducedMotion: boolean,
  duration = 0.4,
  ease: Easing | Easing[] = EASINGS.circuit
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return {
    duration,
    ease,
  };
}

/**
 * Standard Fade Transition Variants
 */
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide Up Transition Variants
 */
export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

/**
 * Slide Down Transition Variants
 */
export const slideDownVariants: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
};

/**
 * Scale Transition Variants (e.g. Modals, Cards, Popups)
 */
export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Stagger Container Variants
 */
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/**
 * Stagger Child Item Variants
 */
export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASINGS.circuit,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Circuit Trace Border Wipe Variants
 */
export const circuitTraceVariants: Variants = {
  initial: {
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    opacity: 0,
  },
  animate: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASINGS.circuit,
    },
  },
  exit: {
    clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * 404 / Signal Lost Glitch Variants
 */
export const glitchSignalLostVariants: Variants = {
  initial: { opacity: 0, filter: 'hue-rotate(90deg) blur(4px)' },
  animate: {
    opacity: 1,
    filter: 'hue-rotate(0deg) blur(0px)',
    transition: {
      duration: 0.6,
      ease: EASINGS.signal,
    },
  },
  exit: {
    opacity: 0,
    filter: 'hue-rotate(180deg) blur(8px)',
    transition: {
      duration: 0.3,
    },
  },
};
