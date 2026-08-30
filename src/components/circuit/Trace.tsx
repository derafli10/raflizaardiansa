'use client';

import { forwardRef, useEffect, useRef, useId } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type TraceColor =
  'copper' | 'copper-bright' | 'signal-green' | 'signal-cyan' | 'signal-amber' | 'muted';

export interface TraceProps extends React.SVGProps<SVGPathElement> {
  /** SVG path definition */
  d: string;
  /** Color theme of the trace line */
  color?: TraceColor;
  /** Stroke thickness in px @default 1.5 */
  strokeWidth?: number | string;
  /** Animate drawing the trace from 0% to 100% */
  animated?: boolean;
  /** Animation duration in seconds @default 1.5 */
  duration?: number;
  /** Delay before animation in seconds @default 0 */
  delay?: number;
  /** GSAP easing @default 'power2.out' */
  ease?: string;
  /** Animate via ScrollTrigger when entering viewport @default false */
  scrollTrigger?: boolean;
  /** ScrollTrigger start position @default 'top 80%' */
  triggerStart?: string;
  /** Add copper / signal glow effect */
  glow?: boolean;
  /** Whether the trace is actively energized (highlighted) */
  active?: boolean;
  /** Callback on draw completion */
  onComplete?: () => void;
}

const COLOR_MAP: Record<TraceColor, { stroke: string; glow: string }> = {
  copper: {
    stroke: 'var(--color-copper)',
    glow: 'rgba(212, 165, 116, 0.4)',
  },
  'copper-bright': {
    stroke: 'var(--color-copper-bright)',
    glow: 'rgba(232, 184, 133, 0.6)',
  },
  'signal-green': {
    stroke: 'var(--color-signal-green)',
    glow: 'rgba(16, 185, 129, 0.5)',
  },
  'signal-cyan': {
    stroke: 'var(--color-signal-cyan)',
    glow: 'rgba(6, 182, 212, 0.5)',
  },
  'signal-amber': {
    stroke: 'var(--color-signal-amber)',
    glow: 'rgba(245, 158, 11, 0.5)',
  },
  muted: {
    stroke: 'var(--color-substrate-raised)',
    glow: 'transparent',
  },
};

/**
 * Trace — SVG Circuit Path Component with DrawSVG Animation.
 *
 * Renders an electronic PCB copper trace that can dynamically draw itself into view
 * via GSAP DrawSVGPlugin and ScrollTrigger. Supports glow layering and GPU compositing.
 *
 * **Requirements: 10.2, 10.7, 10.8**
 */
export const Trace = forwardRef<SVGPathElement, TraceProps>(
  (
    {
      d,
      color = 'copper',
      strokeWidth = 1.5,
      animated = false,
      duration = 1.5,
      delay = 0,
      ease = 'power2.out',
      scrollTrigger = false,
      triggerStart = 'top 80%',
      glow = false,
      active = false,
      className,
      onComplete,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<SVGPathElement | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const glowId = useId();

    const selectedColor = COLOR_MAP[color] || COLOR_MAP.copper;
    const strokeColor = active ? 'var(--color-copper-bright)' : selectedColor.stroke;

    useEffect(() => {
      if (!animated || prefersReducedMotion) return;

      const path = internalRef.current;
      if (!path) return;

      // Register DrawSVG if not yet active
      gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

      const ctx = gsap.context(() => {
        const tween = gsap.fromTo(
          path,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            duration,
            delay,
            ease,
            scrollTrigger: scrollTrigger
              ? {
                  trigger: path,
                  start: triggerStart,
                  once: true,
                }
              : undefined,
            onComplete,
          }
        );

        return () => {
          tween.kill();
        };
      });

      return () => ctx.revert();
    }, [
      animated,
      duration,
      delay,
      ease,
      scrollTrigger,
      triggerStart,
      prefersReducedMotion,
      onComplete,
    ]);

    return (
      <g className={cn('circuit-trace-group', className)}>
        {/* Optional Defs for SVG glow filter */}
        {glow && (
          <defs>
            <filter id={`trace-glow-${glowId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        {/* Ambient background shadow trace for depth */}
        <path
          d={d}
          fill="none"
          stroke="var(--color-substrate-raised)"
          strokeWidth={Number(strokeWidth) + 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.3}
          aria-hidden="true"
        />

        {/* Primary animated/static trace */}
        <path
          ref={(el) => {
            internalRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={glow ? `url(#trace-glow-${glowId})` : undefined}
          className={cn(
            'transition-colors duration-300',
            active && 'shadow-copper-glow',
            animated && !prefersReducedMotion && 'opacity-100'
          )}
          {...props}
        />
      </g>
    );
  }
);

Trace.displayName = 'Trace';
