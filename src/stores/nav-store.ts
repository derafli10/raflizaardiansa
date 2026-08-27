/**
 * Navigation Store
 *
 * Manages navigation state including active section detection, mobile menu state,
 * and scroll progress tracking for the navigation bar.
 *
 * @module stores/nav-store
 */

import { create } from 'zustand';

/**
 * Navigation store state interface
 */
interface NavState {
  /**
   * Currently active section ID (e.g., 'hero', 'about', 'skills', 'projects', 'contact')
   */
  activeSection: string;

  /**
   * Mobile menu open/closed state
   */
  isMenuOpen: boolean;

  /**
   * Scroll progress as a percentage (0-100)
   */
  scrollProgress: number;

  /**
   * Set the currently active section
   * @param section - The section ID that is now active
   */
  setActiveSection: (section: string) => void;

  /**
   * Toggle the mobile menu open/closed state
   */
  toggleMenu: () => void;

  /**
   * Close the mobile menu
   */
  closeMenu: () => void;

  /**
   * Open the mobile menu
   */
  openMenu: () => void;

  /**
   * Update the scroll progress percentage
   * @param progress - Scroll progress value (0-100)
   */
  setScrollProgress: (progress: number) => void;
}

/**
 * Navigation store
 *
 * Manages navigation-related global state. No persistence needed as these
 * values should reset on page load.
 *
 * @example
 * ```tsx
 * const { activeSection, setActiveSection } = useNavStore();
 *
 * // Update active section
 * setActiveSection('about');
 *
 * // Use with shallow comparison for performance
 * const scrollProgress = useNavStore((state) => state.scrollProgress);
 * ```
 */
export const useNavStore = create<NavState>((set) => ({
  activeSection: 'hero',
  isMenuOpen: false,
  scrollProgress: 0,

  setActiveSection: (section: string) => {
    set({ activeSection: section });
  },

  toggleMenu: () => {
    set((state) => ({ isMenuOpen: !state.isMenuOpen }));
  },

  closeMenu: () => {
    set({ isMenuOpen: false });
  },

  openMenu: () => {
    set({ isMenuOpen: true });
  },

  setScrollProgress: (progress: number) => {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.max(0, Math.min(100, progress));
    set({ scrollProgress: clampedProgress });
  },
}));

/**
 * Shallow selector utilities for performance optimization
 */
export const navSelectors = {
  /**
   * Select only the active section value
   */
  activeSection: (state: NavState) => state.activeSection,

  /**
   * Select only the menu open state
   */
  isMenuOpen: (state: NavState) => state.isMenuOpen,

  /**
   * Select only the scroll progress value
   */
  scrollProgress: (state: NavState) => state.scrollProgress,

  /**
   * Select only the setActiveSection function
   */
  setActiveSection: (state: NavState) => state.setActiveSection,

  /**
   * Select only the toggleMenu function
   */
  toggleMenu: (state: NavState) => state.toggleMenu,

  /**
   * Select only the closeMenu function
   */
  closeMenu: (state: NavState) => state.closeMenu,

  /**
   * Select only the openMenu function
   */
  openMenu: (state: NavState) => state.openMenu,

  /**
   * Select only the setScrollProgress function
   */
  setScrollProgress: (state: NavState) => state.setScrollProgress,
};
