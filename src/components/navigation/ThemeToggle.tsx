'use client';

import { forwardRef } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useThemeStore, type ThemeMode } from '@/stores/theme-store';
import { useMagneticElement } from '@/hooks/useMagneticElement';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import { EASINGS } from '../transitions/variants';

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Include 'system' in the toggle cycle @default true */
  cycleSystem?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ThemeToggle — Hardware PCB / Blueprint / System Theme Controller.
 *
 * Cycles between PCB Dark mode, Blueprint Light mode, and System preference.
 * Persists choice to localStorage via Zustand `theme-store` with key "tsn-theme".
 * Features smooth icon rotation animations, solder terminal styling, and magnetic hover physics.
 *
 * **Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 17.1**
 */
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ cycleSystem = false, className, ...props }, ref) => {
    const mode = useThemeStore((state) => state.mode);
    const resolved = useThemeStore((state) => state.resolved);
    const setMode = useThemeStore((state) => state.setMode);
    const prefersReducedMotion = useReducedMotion();

    const magneticRef = useMagneticElement<HTMLButtonElement>({
      strength: !prefersReducedMotion ? 0.25 : 0,
      radius: 50,
    });

    const handleCycle = () => {
      if (cycleSystem) {
        // Cycle: dark -> light -> system -> dark
        const nextMode: Record<ThemeMode, ThemeMode> = {
          dark: 'light',
          light: 'system',
          system: 'dark',
        };
        setMode(nextMode[mode] || 'dark');
      } else {
        // Standard binary toggle: dark <-> light
        setMode(resolved === 'dark' ? 'light' : 'dark');
      }
    };

    const isDark = resolved === 'dark';

    return (
      <button
        ref={(el) => {
          (magneticRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        type="button"
        onClick={handleCycle}
        aria-label={`Current theme: ${mode} (${resolved}). Click to toggle theme.`}
        title={`Theme: ${mode.toUpperCase()} [${resolved.toUpperCase()} ACTIVE]. Click to switch.`}
        className={cn(
          'group border-trace bg-substrate-raised relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-lg border select-none sm:h-6 sm:w-6',
          'text-text-secondary hover:text-copper hover:border-copper/70 min-h-[36px] min-w-[36px] transition-all duration-200',
          'focus-visible:ring-copper focus-visible:ring-offset-substrate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mode === 'system' ? (
            <motion.div
              key="system-mode-icon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: EASINGS.circuit,
              }}
              className="flex items-center justify-center"
            >
              <Laptop className="text-signal-cyan h-4 w-4" />
            </motion.div>
          ) : isDark ? (
            <motion.div
              key="dark-mode-icon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: EASINGS.circuit,
              }}
              className="flex items-center justify-center"
            >
              <Sun className="text-copper-bright h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </motion.div>
          ) : (
            <motion.div
              key="light-mode-icon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: EASINGS.circuit,
              }}
              className="flex items-center justify-center"
            >
              <Moon className="text-copper h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solder Via Corner Pad Accent */}
        <span
          className="bg-solder border-substrate absolute -top-1 -right-1 h-2 w-2 rounded-full border opacity-80"
          aria-hidden="true"
        />
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
