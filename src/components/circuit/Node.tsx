'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type NodeVariant = 'via' | 'pad' | 'terminal' | 'test-point';

export interface NodeProps extends React.SVGProps<SVGGElement> {
  /** X coordinate in SVG viewBox */
  cx: number;
  /** Y coordinate in SVG viewBox */
  cy: number;
  /** Outer radius of node in px @default 6 */
  r?: number;
  /** Visual variant of the node */
  variant?: NodeVariant;
  /** Whether the node is currently active/energized */
  active?: boolean;
  /** Label text for test point / terminal (e.g. "TP1", "TX", "GND") */
  label?: string;
  /** Animate activation on viewport entry via ScrollTrigger */
  animateOnScroll?: boolean;
  /** ScrollTrigger trigger start position @default 'top 80%' */
  triggerStart?: string;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Node — Circuit Connection Point & Solder Pad Component.
 *
 * Renders an electronic terminal, via, or solder pad that dynamically scales
 * and pulses with copper/signal glow when activated.
 *
 * **Requirements: 10.3, 10.7, 10.8**
 */
export const Node = forwardRef<SVGGElement, NodeProps>(
  (
    {
      cx,
      cy,
      r = 6,
      variant = 'via',
      active = false,
      label,
      animateOnScroll = false,
      triggerStart = 'top 80%',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const groupRef = useRef<SVGGElement | null>(null);
    const ringRef = useRef<SVGCircleElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
      if (!animateOnScroll || prefersReducedMotion) return;

      const group = groupRef.current;
      if (!group) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          group,
          { scale: 0.5, opacity: 0, transformOrigin: `${cx}px ${cy}px` },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: group,
              start: triggerStart,
              once: true,
            },
          }
        );
      });

      return () => ctx.revert();
    }, [animateOnScroll, cx, cy, triggerStart, prefersReducedMotion]);

    useEffect(() => {
      if (!active || prefersReducedMotion) return;

      const ring = ringRef.current;
      if (!ring) return;

      const tween = gsap.to(ring, {
        scale: 1.25,
        opacity: 0.8,
        transformOrigin: `${cx}px ${cy}px`,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      return () => {
        tween.kill();
      };
    }, [active, cx, cy, prefersReducedMotion]);

    return (
      <g
        ref={(el) => {
          groupRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        className={cn(
          'circuit-node cursor-pointer transition-transform duration-300',
          active && 'node-active',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Outer copper ring / solder pad */}
        <circle
          ref={ringRef}
          cx={cx}
          cy={cy}
          r={r}
          fill={active ? 'var(--color-copper-bright)' : 'var(--color-copper)'}
          className="transition-colors duration-300"
        />

        {/* Inner substrate core (via hole) */}
        {variant !== 'pad' && (
          <circle
            cx={cx}
            cy={cy}
            r={r * 0.45}
            fill="var(--color-substrate)"
            stroke="var(--color-solder)"
            strokeWidth={0.75}
          />
        )}

        {/* Active LED center pulse */}
        {active && (
          <circle
            cx={cx}
            cy={cy}
            r={r * 0.25}
            fill="var(--color-signal-cyan)"
            className="animate-pulse"
          />
        )}

        {/* Optional Label (TP1, GND, etc.) */}
        {label && (
          <text
            x={cx}
            y={cy - r - 3}
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="8"
            fontFamily="var(--font-mono)"
            className="font-semibold tracking-wider uppercase select-none"
          >
            {label}
          </text>
        )}
      </g>
    );
  }
);

Node.displayName = 'Node';
