/**
 * Hooks Index
 *
 * Central export point for all custom React hooks.
 * Provides clean imports for scroll, navigation, and interaction hooks.
 *
 * @module hooks
 */

// Scroll hooks
export { useScrollProgress } from './useScrollProgress';
export { useScrollDirection } from './useScrollDirection';
export type { ScrollDirection, UseScrollDirectionOptions } from './useScrollDirection';

// Active section detection
export { useActiveSection } from './useActiveSection';
export type { SectionId, UseActiveSectionOptions } from './useActiveSection';

// Lenis integration
export { useLenis, useLenisScroll } from './useLenis';
export type { LenisScrollOptions, Lenis } from './useLenis';

// Interaction effects
export { useMagneticElement } from './useMagneticElement';
export { useTiltEffect } from './useTiltEffect';
export { useCursorState } from './useCursorState';

// Accessibility & Performance
export { useReducedMotion } from './useReducedMotion';
