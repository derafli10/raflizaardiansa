'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type DataFlowColor = 'copper' | 'cyan' | 'green' | 'amber';

export interface DataFlowProps extends Omit<React.SVGProps<SVGGElement>, 'path'> {
  /** SVG path 'd' string or CSS selector / SVGPathElement target to follow */
  path: string | SVGPathElement;
  /** Color theme of the data packets @default 'cyan' */
  color?: DataFlowColor;
  /** Radius of the primary data packet dot @default 3 */
  size?: number;
  /** Duration in seconds for one full transit along the path @default 3 */
  duration?: number;
  /** Delay before animation starts in seconds @default 0 */
  delay?: number;
  /** Stagger delay between packet pulses in seconds @default 0.3 */
  stagger?: number;
  /** Number of data packet dots flowing along the path @default 3 */
  packetCount?: number;
  /** Reverse transit direction @default false */
  reverse?: boolean;
  /** Enable continuous loop @default true */
  loop?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const PACKET_COLORS: Record<DataFlowColor, { fill: string; glow: string }> = {
  copper: {
    fill: 'var(--color-copper-bright)',
    glow: 'rgba(232, 184, 133, 0.8)',
  },
  cyan: {
    fill: 'var(--color-signal-cyan)',
    glow: 'rgba(6, 182, 212, 0.9)',
  },
  green: {
    fill: 'var(--color-signal-green)',
    glow: 'rgba(16, 185, 129, 0.9)',
  },
  amber: {
    fill: 'var(--color-signal-amber)',
    glow: 'rgba(245, 158, 11, 0.9)',
  },
};

/**
 * DataFlow — Animated Data Packet Stream Component.
 *
 * Transits glowing data packet dots along SVG circuit paths in continuous loops
 * using GSAP MotionPathPlugin.
 *
 * **Requirements: 10.4, 10.7, 10.8**
 */
export const DataFlow = forwardRef<SVGGElement, DataFlowProps>(
  (
    {
      path,
      color = 'cyan',
      size = 3,
      duration = 3,
      delay = 0,
      stagger = 0.25,
      packetCount = 3,
      reverse = false,
      loop = true,
      className,
      ...props
    },
    ref
  ) => {
    const groupRef = useRef<SVGGElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const selectedColor = PACKET_COLORS[color] || PACKET_COLORS.cyan;

    useEffect(() => {
      if (prefersReducedMotion) return;

      const group = groupRef.current;
      if (!group) return;

      const dots = group.querySelectorAll('.data-packet-dot');
      if (!dots.length) return;

      gsap.registerPlugin(MotionPathPlugin);

      const ctx = gsap.context(() => {
        dots.forEach((dot, index) => {
          gsap.to(dot, {
            motionPath: {
              path: typeof path === 'string' ? path : path,
              align: typeof path === 'string' ? undefined : path,
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: reverse ? 1 : 0,
              end: reverse ? 0 : 1,
            },
            duration,
            delay: delay + index * stagger,
            repeat: loop ? -1 : 0,
            ease: 'none',
          });
        });
      }, group);

      return () => ctx.revert();
    }, [path, duration, delay, stagger, reverse, loop, prefersReducedMotion]);

    if (prefersReducedMotion) {
      return null;
    }

    return (
      <g
        ref={(el) => {
          groupRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        className={cn('data-flow-stream pointer-events-none select-none', className)}
        {...props}
      >
        {Array.from({ length: packetCount }).map((_, i) => {
          const packetRadius = Math.max(1, size - i * 0.6);
          const opacity = Math.max(0.3, 1 - i * 0.25);

          return (
            <circle
              key={i}
              className="data-packet-dot"
              r={packetRadius}
              fill={selectedColor.fill}
              opacity={opacity}
              style={{
                filter: `drop-shadow(0 0 4px ${selectedColor.glow})`,
              }}
            />
          );
        })}
      </g>
    );
  }
);

DataFlow.displayName = 'DataFlow';
