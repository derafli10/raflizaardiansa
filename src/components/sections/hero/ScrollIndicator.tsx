'use client';

import { ChevronDown } from 'lucide-react';
import { useLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface ScrollIndicatorProps {
  /** Target section DOM ID to scroll to @default 'about' */
  targetId?: string;
  /** Label text @default 'SCROLL TO EXPLORE' */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ScrollIndicator — Pulsating Bottom Navigation Cue.
 *
 * Renders an animated scroll down arrow with a glowing copper signal trace
 * leading to the next section (About). Smoothly scrolls using Lenis.
 *
 * **Requirements: 12.5, 12.6**
 */
export function ScrollIndicator({
  targetId = 'about',
  label = 'SCROLL TO EXPLORE',
  className,
}: ScrollIndicatorProps) {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, {
          offset: -60,
          duration: prefersReducedMotion ? 0 : 1.2,
        });
      } else {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Scroll down to ${targetId} section`}
      className={cn(
        'group text-text-tertiary absolut flex cursor-pointer flex-col items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] transition-colors select-none',
        'hover:text-copper focus-visible:ring-copper rounded-md p-2 focus:outline-none focus-visible:ring-2',
        className
      )}
    >
      <span className="group-hover:text-copper-bright font-semibold uppercase transition-colors">
        {label}
      </span>

      {/* Pulsing Solder / Chevron Arrow */}
      <div className="border-trace bg-substrate-raised/80 group-hover:border-copper relative flex h-6 w-6 items-center justify-center rounded-full border transition-colors">
        <ChevronDown
          className={cn(
            'text-copper h-3.5 w-3.5 transition-transform',
            !prefersReducedMotion && 'animate-bounce'
          )}
        />
        {/* Signal Glow Dot */}
        <span
          className="bg-signal-cyan shadow-signal-glow absolute -bottom-1 h-1 w-1 animate-pulse rounded-full"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

ScrollIndicator.displayName = 'ScrollIndicator';
