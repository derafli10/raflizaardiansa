'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CircuitPathProps extends React.SVGProps<SVGSVGElement> {
  /** SVG path data string connecting all section nodes */
  d?: string;
  /** Primary copper/cyan stroke color */
  activeColor?: string;
  /** Thickness of the trace line @default 2 */
  strokeWidth?: number;
  /** Additional CSS classes */
  className?: string;
}

// Default vertical circuit trace with 45-degree bends connecting 6 nodes (viewBox: 0 0 100 1000)
export const DEFAULT_NARRATIVE_PATH =
  'M 50 50 L 50 160 L 70 180 L 70 310 L 30 350 L 30 500 L 60 530 L 60 670 L 40 700 L 40 840 L 50 860 L 50 950';

/**
 * CircuitPath — Persistent SVG Backbone Path for Scroll Narrative.
 *
 * Renders the structural PCB circuit trace running vertically alongside or behind
 * the page sections, prepared for scrubbed DrawSVG illumination.
 *
 * **Requirements: 6.1, 6.2, 6.3**
 */
export const CircuitPath = forwardRef<SVGSVGElement, CircuitPathProps>(
  (
    {
      d = DEFAULT_NARRATIVE_PATH,
      activeColor = 'var(--color-copper-bright)',
      strokeWidth = 2,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 100 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
        role="presentation"
        className={cn('pointer-events-none h-full w-full select-none', className)}
        {...props}
      >
        <defs>
          <filter id="scroll-path-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient un-energized background trace */}
        <path
          d={d}
          stroke="var(--color-substrate-raised)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.35}
        />

        {/* Active energized trace path animated via DrawSVG */}
        <path
          id="scroll-narrative-trace"
          d={d}
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#scroll-path-glow)"
          className="transition-colors duration-300"
        />
      </svg>
    );
  }
);

CircuitPath.displayName = 'CircuitPath';
