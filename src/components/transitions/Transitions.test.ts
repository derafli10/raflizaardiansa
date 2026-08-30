import { describe, it, expect } from 'vitest';
import {
  PageTransition,
  CircuitWipe,
  fadeVariants,
  slideUpVariants,
  slideDownVariants,
  scaleVariants,
  circuitTraceVariants,
  glitchSignalLostVariants,
  staggerContainerVariants,
  staggerItemVariants,
  getAccessibleTransition,
} from './index';

describe('Page Transition Components & Variants', () => {
  it('should export PageTransition and CircuitWipe with displayNames', () => {
    expect(PageTransition.displayName).toBe('PageTransition');
    expect(CircuitWipe.displayName).toBe('CircuitWipe');
  });

  it('should export complete initial, animate, and exit states on all variants', () => {
    const variantsList = [
      fadeVariants,
      slideUpVariants,
      slideDownVariants,
      scaleVariants,
      circuitTraceVariants,
      glitchSignalLostVariants,
      staggerContainerVariants,
      staggerItemVariants,
    ];

    variantsList.forEach((variant) => {
      expect(variant).toHaveProperty('initial');
      expect(variant).toHaveProperty('animate');
      expect(variant).toHaveProperty('exit');
    });
  });

  it('should provide zero duration when reduced motion is preferred', () => {
    const reduced = getAccessibleTransition(true);
    expect(reduced).toEqual({ duration: 0 });

    const normal = getAccessibleTransition(false, 0.5);
    expect(normal.duration).toBe(0.5);
  });
});
