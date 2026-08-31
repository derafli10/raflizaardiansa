'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavStore } from '@/stores/nav-store';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';
import { AudioToggle } from './AudioToggle';
import { ProgressBar } from './ProgressBar';
import { MobileMenu, NAV_ITEMS } from './MobileMenu';
import { SkipToContent } from './SkipToContent';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Navbar — Master Hardware-Themed Application Navigation Header.
 *
 * Implements full responsive navigation with:
 * - Skip to content accessible anchor
 * - Brand IC logo mark
 * - Active section tracking with circuit underline traces
 * - Theme and audio hardware controls
 * - Dynamic scroll progress indicator
 * - Hide on scroll down, reveal on scroll up behavior
 * - Transparent to solid background blur transition
 *
 * **Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8, 17.9, 17.10, 28.4**
 */
export function Navbar({ className }: NavbarProps) {
  const activeSection = useNavStore((state) => state.activeSection);
  const openMenu = useNavStore((state) => state.openMenu);
  const isMenuOpen = useNavStore((state) => state.isMenuOpen);

  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection({ threshold: 15 });
  const prefersReducedMotion = useReducedMotion();

  // Monitor section intersections across all 5 sections
  useActiveSection({
    threshold: 0.3,
    rootMargin: '-80px 0px 0px 0px',
  });

  // Track scroll position to transition background from transparent to solid blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar visibility based on scroll direction
  const isHidden = !isMenuOpen && scrollDirection === 'down' && isScrolled && !prefersReducedMotion;

  return (
    <>
      {/* 1. Skip to Content Link for Keyboard Accessibility */}
      <SkipToContent targetId="main-content" />

      {/* 2. Main Fixed Navigation Bar */}
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-100 transition-all duration-300',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          isScrolled
            ? 'bg-substrate/85 border-trace/70 border-b shadow-lg backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
          className
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          {/* Brand Logo & System Moniker */}
          <a
            href="#hero"
            aria-label="The Schematic Network - Rafliza Ardiansa"
            className={cn(
              'group flex items-center gap-3 select-none',
              'focus-visible:ring-copper focus-visible:ring-offset-substrate rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
            )}
          >
            {/* PCB Logo Icon Mark */}
            <div className="bg-substrate-raised border-copper/80 group-hover:border-copper-bright relative flex h-8 w-8 items-center justify-center rounded-md border shadow-[0_0_10px_rgba(212,165,116,0.2)] transition-colors">
              <span className="text-copper-bright font-mono text-xs font-black">RZ</span>
              {/* Solder Corner Accents */}
              <span className="bg-solder absolute -top-0.5 -left-0.5 h-1 w-1 rounded-full" />
              <span className="bg-solder absolute -top-0.5 -right-0.5 h-1 w-1 rounded-full" />
              <span className="bg-solder absolute -bottom-0.5 -left-0.5 h-1 w-1 rounded-full" />
              <span className="bg-solder absolute -right-0.5 -bottom-0.5 h-1 w-1 rounded-full" />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col font-mono">
              <span className="text-text-primary group-hover:text-copper-bright text-xs font-bold tracking-widest uppercase transition-colors sm:text-sm">
                Raph
              </span>
              <span className="text-text-tertiary text-[9px] tracking-wider uppercase">
                Network Node // 01
              </span>
            </div>
          </a>

          {/* Desktop Section Links */}
          <nav
            aria-label="Main Navigation"
            className="bg-substrate-raised/40 border-trace/60 hidden items-center gap-1 rounded-full border px-3 py-1.5 md:flex lg:gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                href={`#${item.id}`}
                step={item.step}
                isActive={activeSection === item.id}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Hardware Control Switches */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <AudioToggle />
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open mobile navigation menu"
              aria-expanded={isMenuOpen}
              className={cn(
                'border-trace bg-substrate-raised flex h-10 w-10 items-center justify-center rounded-lg border',
                'text-text-secondary hover:text-copper hover:border-copper/70 transition-colors',
                'focus-visible:ring-copper focus-visible:ring-offset-substrate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar across bottom border */}
        <ProgressBar />
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <MobileMenu />
    </>
  );
}

Navbar.displayName = 'Navbar';
