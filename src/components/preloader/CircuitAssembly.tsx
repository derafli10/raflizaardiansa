'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface CircuitAssemblyProps extends React.SVGProps<SVGSVGElement> {
  /** Size of the logo SVG in pixels @default 120 */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CircuitAssembly — Schematic Network Logo Mark SVG.
 *
 * Renders the geometric circuit-board logo composed of structural traces,
 * central IC chip, and solder pads. All paths have IDs for targeted
 * DrawSVG animation orchestration from the BootSequence timeline.
 *
 * **Requirements: 5.3**
 */
export const CircuitAssembly = forwardRef<SVGSVGElement, CircuitAssemblyProps>(
  ({ size = 120, className, ...props }, ref) => {
    const filterId = useId();

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        className={cn('select-none', className)}
        {...props}
      >
        <defs>
          <filter id={`logo-glow-${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: Outer circuit traces radiating from center */}
        <g className="logo-outer-traces">
          {/* Top trace */}
          <path
            id="logo-trace-top"
            d="M 60 10 L 60 30"
            stroke="var(--color-copper)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Bottom trace */}
          <path
            id="logo-trace-bottom"
            d="M 60 90 L 60 110"
            stroke="var(--color-copper)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Left trace */}
          <path
            id="logo-trace-left"
            d="M 10 60 L 30 60"
            stroke="var(--color-copper)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Right trace */}
          <path
            id="logo-trace-right"
            d="M 90 60 L 110 60"
            stroke="var(--color-copper)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Diagonal traces */}
          <path
            id="logo-trace-tl"
            d="M 25 25 L 38 38"
            stroke="var(--color-copper-dim)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-trace-tr"
            d="M 95 25 L 82 38"
            stroke="var(--color-copper-dim)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-trace-bl"
            d="M 25 95 L 38 82"
            stroke="var(--color-copper-dim)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-trace-br"
            d="M 95 95 L 82 82"
            stroke="var(--color-copper-dim)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Layer 2: Terminal solder pads at trace endpoints */}
        <g className="logo-terminals">
          <circle id="logo-pad-top" cx="60" cy="10" r="3" fill="var(--color-solder)" />
          <circle id="logo-pad-bottom" cx="60" cy="110" r="3" fill="var(--color-solder)" />
          <circle id="logo-pad-left" cx="10" cy="60" r="3" fill="var(--color-solder)" />
          <circle id="logo-pad-right" cx="110" cy="60" r="3" fill="var(--color-solder)" />
          <circle id="logo-pad-tl" cx="25" cy="25" r="2.5" fill="var(--color-solder)" />
          <circle id="logo-pad-tr" cx="95" cy="25" r="2.5" fill="var(--color-solder)" />
          <circle id="logo-pad-bl" cx="25" cy="95" r="2.5" fill="var(--color-solder)" />
          <circle id="logo-pad-br" cx="95" cy="95" r="2.5" fill="var(--color-solder)" />
        </g>

        {/* Layer 3: Central IC chip body */}
        <g className="logo-ic-chip" filter={`url(#logo-glow-${filterId})`}>
          <rect
            id="logo-ic-body"
            x="35"
            y="35"
            width="50"
            height="50"
            rx="4"
            stroke="var(--color-copper-bright)"
            strokeWidth="2"
            fill="var(--color-substrate-raised)"
          />
          {/* IC pin stubs — top row */}
          <path
            id="logo-ic-pin-t1"
            d="M 47 35 L 47 30"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-t2"
            d="M 60 35 L 60 30"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-t3"
            d="M 73 35 L 73 30"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* IC pin stubs — bottom row */}
          <path
            id="logo-ic-pin-b1"
            d="M 47 85 L 47 90"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-b2"
            d="M 60 85 L 60 90"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-b3"
            d="M 73 85 L 73 90"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* IC pin stubs — left row */}
          <path
            id="logo-ic-pin-l1"
            d="M 35 47 L 30 47"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-l2"
            d="M 35 60 L 30 60"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-l3"
            d="M 35 73 L 30 73"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* IC pin stubs — right row */}
          <path
            id="logo-ic-pin-r1"
            d="M 85 47 L 90 47"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-r2"
            d="M 85 60 L 90 60"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            id="logo-ic-pin-r3"
            d="M 85 73 L 90 73"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Layer 4: IC orientation notch & center die */}
        <circle id="logo-ic-notch" cx="42" cy="42" r="2" fill="var(--color-copper-dim)" />
        <rect
          id="logo-ic-die"
          x="50"
          y="50"
          width="20"
          height="20"
          rx="2"
          fill="var(--color-copper)"
          opacity="0.3"
        />
      </svg>
    );
  }
);

CircuitAssembly.displayName = 'CircuitAssembly';
