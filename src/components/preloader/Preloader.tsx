'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import { CircuitAssembly } from './CircuitAssembly';
import { useBootSequence } from './BootSequence';

const SESSION_KEY = 'schematic-network-boot-complete';

export interface PreloaderProps {
  /** Additional CSS classes for the preloader container */
  className?: string;
}

/**
 * Preloader — Master Boot Sequence Overlay Component.
 *
 * Displays a 3.5-second device boot sequence animation on first visit per session.
 * Checks `sessionStorage` to skip on subsequent page loads. On completion, sets
 * `isPreloaderComplete` in Zustand app-store and `isLoaded` for hero stagger.
 *
 * The overlay renders as a fixed, full-viewport panel above all content, which
 * is unmounted after the animation finishes.
 *
 * **Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 26.1**
 */
export function Preloader({ className }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setPreloaderComplete = useAppStore((s) => s.setPreloaderComplete);
  const setLoaded = useAppStore((s) => s.setLoaded);
  const prefersReducedMotion = useReducedMotion();

  const [isDismissed, setIsDismissed] = useState(false);

  // Check if session has already booted or user prefers reduced motion
  const [alreadyBooted] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return Boolean(sessionStorage.getItem(SESSION_KEY));
    } catch {
      return false;
    }
  });

  const shouldSkip = alreadyBooted || prefersReducedMotion;
  const isVisible = !shouldSkip && !isDismissed;

  const handleBootComplete = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage may be blocked in private browsing
    }

    setPreloaderComplete(true);
    setLoaded(true);

    // Allow exit wipe animation to finish before unmounting DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 200);
  }, [setPreloaderComplete, setLoaded]);

  // Synchronize app store when skipped
  useEffect(() => {
    if (shouldSkip) {
      setPreloaderComplete(true);
      setLoaded(true);
    }
  }, [shouldSkip, setPreloaderComplete, setLoaded]);

  // Hook up the GSAP boot timeline
  useBootSequence({
    containerRef: isVisible ? containerRef : { current: null },
    onComplete: handleBootComplete,
  });

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'preloader-overlay bg-substrate fixed inset-0 z-[10000] flex flex-col items-center justify-center',
        className
      )}
      aria-live="polite"
      aria-label="Loading boot sequence"
    >
      {/* Logo wrapper for pulse and scale transforms */}
      <div className="preloader-logo-wrapper flex flex-col items-center gap-6">
        <CircuitAssembly size={140} />

        {/* Brand wordmark */}
        <div className="flex flex-col items-center gap-1 font-mono">
          <span className="text-copper-bright text-lg font-bold tracking-[0.25em] uppercase">
            The Schematic Network
          </span>
          <span className="text-text-tertiary text-xs tracking-[0.4em] uppercase">
            Rafli Zaardiansa
          </span>
        </div>
      </div>

      {/* Status text */}
      <p className="preloader-status-text text-signal-cyan mt-8 font-mono text-sm tracking-widest uppercase select-none">
        Initializing System...
      </p>

      {/* Progress bar */}
      <div className="preloader-progress-bar bg-substrate-raised mt-6 h-[2px] w-48 overflow-hidden rounded-full">
        <div className="preloader-progress-fill bg-copper-bright h-full origin-left scale-x-0 rounded-full" />
      </div>

      {/* Boot log decorative lines */}
      <div className="text-text-tertiary/50 mt-8 flex flex-col items-center gap-1 font-mono text-[10px] tracking-wider select-none">
        <span>[OK] Loading PCB substrate...</span>
        <span>[OK] Initializing copper traces...</span>
        <span>[OK] Calibrating signal integrity...</span>
      </div>
    </div>
  );
}

Preloader.displayName = 'Preloader';
