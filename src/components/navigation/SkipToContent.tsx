'use client';

import { forwardRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface SkipToContentProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target element DOM ID to jump to @default 'main-content' */
  targetId?: string;
  /** Label text for skip link @default 'Skip to main content' */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkipToContent — Accessible Skip Link Component for Keyboard Navigation.
 *
 * Placed as the very first focusable element on the page. Stays visually hidden
 * offscreen until focused via keyboard Tab navigation, then smoothly scrolls
 * to the main content container using Lenis.
 *
 * **Requirements: 17.9, 28.4**
 */
export const SkipToContent = forwardRef<HTMLAnchorElement, SkipToContentProps>(
  (
    { targetId = 'main-content', label = 'Skip to main content', className, onClick, ...props },
    ref
  ) => {
    const lenis = useLenis();
    const prefersReducedMotion = useReducedMotion();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      e.preventDefault();

      const target = document.getElementById(targetId) || document.getElementById('hero');
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -40,
            duration: prefersReducedMotion ? 0 : 1.2,
          });
        } else {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
        target.focus({ preventScroll: true });
      }
    };

    return (
      <a
        ref={ref}
        href={`#${targetId}`}
        onClick={handleClick}
        className={cn(
          'sr-only z-[99999] focus:not-sr-only focus:fixed focus:top-4 focus:left-4',
          'border-copper bg-substrate text-copper-bright flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 font-mono text-xs font-bold tracking-wider select-none',
          'ring-copper ring-offset-substrate shadow-[0_0_20px_rgba(212,165,116,0.5)] ring-2 ring-offset-2 transition-all outline-none',
          className
        )}
        {...props}
      >
        {/* Terminal Indicator Solder Accent */}
        <span
          className="bg-signal-cyan shadow-signal-glow h-2 w-2 animate-pulse rounded-full"
          aria-hidden="true"
        />
        <span>{label}</span>
      </a>
    );
  }
);

SkipToContent.displayName = 'SkipToContent';
