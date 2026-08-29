'use client';

/**
 * CircuitTrace Decorative Component
 *
 * SVG-based PCB circuit path decoration with 45-degree angled traces,
 * solder via pads, and optional hardware-accelerated data packet flow animation.
 *
 * @module components/decorative/CircuitTrace
 */

import { forwardRef, type SVGProps } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type CircuitTraceVariant =
  'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br' | 'horizontal' | 'vertical' | 'bus';

export interface CircuitTraceProps extends SVGProps<SVGSVGElement> {
  /**
   * Shape/direction variant of the circuit trace
   * @default 'corner-tl'
   */
  variant?: CircuitTraceVariant;
  /**
   * Include animated data packet pulse along trace
   * @default false
   */
  animated?: boolean;
  /**
   * Show circular via/solder terminal points
   * @default true
   */
  showNodes?: boolean;
}

/**
 * CircuitTrace Component
 *
 * @example
 * ```tsx
 * // Corner circuit accent
 * <CircuitTrace variant="corner-tl" className="w-24 h-24 text-copper" />
 *
 * // Animated bus trace
 * <CircuitTrace variant="bus" animated className="w-full h-16 text-copper" />
 * ```
 */
export const CircuitTrace = forwardRef<SVGSVGElement, CircuitTraceProps>(
  ({ variant = 'corner-tl', animated = false, showNodes = true, className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const isAnimated = animated && !prefersReducedMotion;

    return (
      <svg
        ref={ref}
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('text-copper pointer-events-none select-none', className)}
        {...props}
      >
        {variant === 'corner-tl' && (
          <>
            <path
              d="M 10 90 L 10 30 L 30 10 L 90 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isAnimated && 'circuit-trace-animated opacity-80')}
            />
            {showNodes && (
              <>
                <circle cx="10" cy="90" r="3" fill="currentColor" />
                <circle cx="10" cy="90" r="1.5" fill="var(--color-substrate)" />
                <circle cx="90" cy="10" r="3" fill="currentColor" />
                <circle cx="90" cy="10" r="1.5" fill="var(--color-substrate)" />
              </>
            )}
          </>
        )}

        {variant === 'corner-tr' && (
          <>
            <path
              d="M 90 90 L 90 30 L 70 10 L 10 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isAnimated && 'circuit-trace-animated opacity-80')}
            />
            {showNodes && (
              <>
                <circle cx="90" cy="90" r="3" fill="currentColor" />
                <circle cx="90" cy="90" r="1.5" fill="var(--color-substrate)" />
                <circle cx="10" cy="10" r="3" fill="currentColor" />
                <circle cx="10" cy="10" r="1.5" fill="var(--color-substrate)" />
              </>
            )}
          </>
        )}

        {variant === 'corner-bl' && (
          <>
            <path
              d="M 10 10 L 10 70 L 30 90 L 90 90"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isAnimated && 'circuit-trace-animated opacity-80')}
            />
            {showNodes && (
              <>
                <circle cx="10" cy="10" r="3" fill="currentColor" />
                <circle cx="10" cy="10" r="1.5" fill="var(--color-substrate)" />
                <circle cx="90" cy="90" r="3" fill="currentColor" />
                <circle cx="90" cy="90" r="1.5" fill="var(--color-substrate)" />
              </>
            )}
          </>
        )}

        {variant === 'corner-br' && (
          <>
            <path
              d="M 90 10 L 90 70 L 70 90 L 10 90"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isAnimated && 'circuit-trace-animated opacity-80')}
            />
            {showNodes && (
              <>
                <circle cx="90" cy="10" r="3" fill="currentColor" />
                <circle cx="90" cy="10" r="1.5" fill="var(--color-substrate)" />
                <circle cx="10" cy="90" r="3" fill="currentColor" />
                <circle cx="10" cy="90" r="1.5" fill="var(--color-substrate)" />
              </>
            )}
          </>
        )}

        {variant === 'horizontal' && (
          <>
            <path
              d="M 10 50 L 40 50 L 55 35 L 90 35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={cn(isAnimated && 'circuit-trace-animated opacity-80')}
            />
            {showNodes && (
              <>
                <circle cx="10" cy="50" r="3" fill="currentColor" />
                <circle cx="10" cy="50" r="1.5" fill="var(--color-substrate)" />
                <circle cx="90" cy="35" r="3" fill="currentColor" />
                <circle cx="90" cy="35" r="1.5" fill="var(--color-substrate)" />
              </>
            )}
          </>
        )}

        {variant === 'vertical' && (
          <>
            <path
              d="M 50 10 L 50 40 L 35 55 L 35 90"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={cn(isAnimated && 'circuit-trace-animated opacity-80')}
            />
            {showNodes && (
              <>
                <circle cx="50" cy="10" r="3" fill="currentColor" />
                <circle cx="50" cy="10" r="1.5" fill="var(--color-substrate)" />
                <circle cx="35" cy="90" r="3" fill="currentColor" />
                <circle cx="35" cy="90" r="1.5" fill="var(--color-substrate)" />
              </>
            )}
          </>
        )}

        {variant === 'bus' && (
          <>
            <path
              d="M 10 30 L 30 30 L 45 45 L 90 45"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            <path
              d="M 10 50 L 90 50"
              stroke="currentColor"
              strokeWidth="1.5"
              className={cn(isAnimated && 'circuit-trace-animated')}
            />
            <path
              d="M 10 70 L 30 70 L 45 55 L 90 55"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            {showNodes && (
              <>
                <circle cx="10" cy="50" r="3" fill="currentColor" />
                <circle cx="10" cy="50" r="1.5" fill="var(--color-substrate)" />
                <circle cx="90" cy="50" r="3" fill="currentColor" />
                <circle cx="90" cy="50" r="1.5" fill="var(--color-substrate)" />
              </>
            )}
          </>
        )}
      </svg>
    );
  }
);

CircuitTrace.displayName = 'CircuitTrace';
