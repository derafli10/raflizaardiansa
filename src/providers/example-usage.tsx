/**
 * Provider Usage Examples
 *
 * Demonstrates how to use the three context providers in real components.
 * These are example components showing proper usage patterns.
 *
 * @module providers/example-usage
 */

'use client';

import { useTheme } from './ThemeProvider';
import { useLenis } from './LenisProvider';

/**
 * Example: Theme Toggle Component
 *
 * Shows how to use useTheme() hook to access and control theme.
 */
export function ExampleThemeToggle() {
  const { theme, mode, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <p>
        Mode: {mode} | Active: {theme}
      </p>
      <button
        onClick={() => setTheme('dark')}
        className="bg-substrate-900 text-copper-400 px-4 py-2"
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('light')}
        className="bg-substrate-100 text-copper-600 px-4 py-2"
      >
        Light
      </button>
      <button onClick={() => setTheme('system')} className="bg-substrate-500 px-4 py-2 text-white">
        System
      </button>
    </div>
  );
}

/**
 * Example: Smooth Scroll Navigation
 *
 * Shows how to use useLenis() hook for imperative scroll control.
 */
export function ExampleSmoothNav() {
  const lenis = useLenis();

  const scrollToSection = (selector: string) => {
    if (!lenis) {
      // Fallback to native scroll if Lenis is disabled
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Use Lenis for smooth scroll
    lenis.scrollTo(selector, {
      offset: -80, // Account for fixed header
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <nav className="flex gap-4">
      <button onClick={() => scrollToSection('#hero')} className="hover:text-copper-400">
        Hero
      </button>
      <button onClick={() => scrollToSection('#about')} className="hover:text-copper-400">
        About
      </button>
      <button onClick={() => scrollToSection('#projects')} className="hover:text-copper-400">
        Projects
      </button>
      <button onClick={() => scrollToSection('#contact')} className="hover:text-copper-400">
        Contact
      </button>
    </nav>
  );
}

/**
 * Example: Scroll to Top Button
 *
 * Shows programmatic scrolling with callbacks.
 */
export function ExampleScrollToTop() {
  const lenis = useLenis();

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, {
      duration: 1.5,
      onComplete: () => {
        // Scrolled to top successfully
      },
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="bg-copper-400 text-substrate-900 fixed right-8 bottom-8 h-12 w-12 rounded-full transition-transform hover:scale-110"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

/**
 * Example: Combined Theme + Scroll
 *
 * Shows using multiple providers together.
 */
export function ExampleCombinedUsage() {
  const { theme } = useTheme();
  const lenis = useLenis();

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl">Provider Status</h2>

      <div className="space-y-2">
        <p>
          <strong>Theme:</strong> {theme}
        </p>
        <p>
          <strong>Lenis:</strong> {lenis ? 'Initialized' : 'Disabled'}
        </p>
        <p>
          <strong>Smooth Scroll:</strong> {lenis ? 'Active' : 'Using native scroll'}
        </p>
      </div>

      {lenis && (
        <button
          onClick={() => lenis.scrollTo(500)}
          className="bg-copper-400 text-substrate-900 mt-4 px-6 py-2"
        >
          Scroll to 500px
        </button>
      )}
    </div>
  );
}
