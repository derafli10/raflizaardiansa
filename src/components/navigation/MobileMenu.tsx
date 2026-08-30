'use client';

import { useCallback } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useNavStore } from '@/stores/nav-store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLenis } from '@/hooks/useLenis';
import { ThemeToggle } from './ThemeToggle';
import { AudioToggle } from './AudioToggle';
import { cn } from '@/lib/utils';
import { EASINGS } from '../transitions/variants';

export interface NavItem {
  id: string;
  label: string;
  step: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Hero', step: '01' },
  { id: 'about', label: 'About', step: '02' },
  { id: 'skills', label: 'Skills', step: '03' },
  { id: 'projects', label: 'Projects', step: '04' },
  { id: 'contact', label: 'Contact', step: '05' },
];

export interface MobileMenuProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * MobileMenu — Accessible Fullscreen Responsive Navigation Overlay.
 *
 * Appears below 768px viewport width with:
 * - Built-in WCAG focus trap via Headless UI Dialog
 * - Circuit trace framing & corner solder pads
 * - Slide-in and staggered link entrance animations
 * - Integrated Theme and Audio controllers
 * - Accessible keyboard navigation & automatic focus restore
 *
 * **Requirements: 17.7, 17.8**
 */
export function MobileMenu({ className }: MobileMenuProps) {
  const isMenuOpen = useNavStore((state) => state.isMenuOpen);
  const closeMenu = useNavStore((state) => state.closeMenu);
  const activeSection = useNavStore((state) => state.activeSection);
  const setActiveSection = useNavStore((state) => state.setActiveSection);

  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  const handleLinkClick = useCallback(
    (id: string) => {
      closeMenu();

      const target = document.getElementById(id);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -70,
            duration: prefersReducedMotion ? 0 : 1.2,
          });
        } else {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
        setActiveSection(id);
      }
    },
    [closeMenu, lenis, prefersReducedMotion, setActiveSection]
  );

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <Dialog static open={isMenuOpen} onClose={closeMenu} className="z-modal relative">
          <div className="z-modal fixed inset-0 overflow-hidden">
            <DialogPanel className="h-full w-full">
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -30 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  ease: EASINGS.circuit,
                }}
                className={cn(
                  'bg-substrate/95 flex h-full w-full flex-col justify-between p-6 backdrop-blur-2xl sm:p-8',
                  className
                )}
                aria-label="Mobile Navigation Menu"
              >
                {/* Circuit Corner Solder Accents */}
                <span
                  className="border-copper pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2"
                  aria-hidden="true"
                />
                <span
                  className="border-copper pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2"
                  aria-hidden="true"
                />
                <span
                  className="border-copper pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2"
                  aria-hidden="true"
                />
                <span
                  className="border-copper pointer-events-none absolute right-4 bottom-4 h-4 w-4 border-r-2 border-b-2"
                  aria-hidden="true"
                />

                {/* Header Bar */}
                <div className="border-trace flex items-center justify-between border-b pb-4">
                  <div className="flex flex-col font-mono">
                    <span className="text-copper-bright text-xs font-bold tracking-widest uppercase">
                      Schematic Menu
                    </span>
                    <span className="text-text-tertiary text-[10px]">SIGNAL_ROUTER // V1.0</span>
                  </div>

                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close navigation menu"
                    className="border-trace text-text-secondary hover:text-copper hover:border-copper focus-visible:ring-copper rounded-lg border p-2 transition-colors focus:outline-none focus-visible:ring-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Section Navigation Links */}
                <nav className="my-auto flex flex-col gap-2.5" aria-label="Mobile Section Links">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => handleLinkClick(item.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : index * 0.05 + 0.1,
                          duration: 0.3,
                          ease: EASINGS.circuit,
                        }}
                        className={cn(
                          'group flex min-h-[48px] items-center justify-between rounded-xl border p-4 text-left font-mono transition-all',
                          'focus-visible:ring-copper focus-visible:ring-offset-substrate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                          isActive
                            ? 'border-copper bg-copper/10 text-copper-bright shadow-copper-glow'
                            : 'border-trace/60 bg-substrate-raised/40 text-text-secondary hover:border-copper/60 hover:text-text-primary'
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-copper text-xs tracking-widest">{item.step}</span>
                          <span className="text-base font-bold tracking-wider uppercase">
                            {item.label}
                          </span>
                        </div>

                        {isActive && (
                          <span className="bg-signal-cyan shadow-signal-glow h-2 w-2 animate-pulse rounded-full" />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Bottom Controls Bar */}
                <div className="border-trace flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <AudioToggle />
                  </div>

                  <span className="text-text-tertiary font-mono text-[10px]">
                    PORT // 443 SECURE
                  </span>
                </div>
              </motion.div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

MobileMenu.displayName = 'MobileMenu';
