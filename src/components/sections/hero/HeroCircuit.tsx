'use client';

import { forwardRef } from 'react';
import { CircuitBoard } from '@/components/circuit/CircuitBoard';
import { cn } from '@/lib/utils';

export interface HeroCircuitProps extends React.SVGProps<SVGSVGElement> {
  /** Additional CSS classes */
  className?: string;
  /** Whether traces animate into view @default true */
  animatedTraces?: boolean;
  /** Whether data packets stream @default true */
  animatedDataFlow?: boolean;
}

/**
 * HeroCircuit — Animated PCB Background Substrate for the Hero Section.
 *
 * Renders high-fidelity copper bus lines, MCU IC symbols, solder vias,
 * and continuous glowing cyan/copper data packets.
 *
 * **Requirements: 12.4, 10.1, 10.2, 10.3**
 */
export const HeroCircuit = forwardRef<SVGSVGElement, HeroCircuitProps>(
  ({ className, animatedTraces = true, animatedDataFlow = true, ...props }, ref) => {
    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden select-none',
          className
        )}
      >
        <CircuitBoard
          ref={ref}
          variant="hero"
          animatedTraces={animatedTraces}
          animatedDataFlow={animatedDataFlow}
          className="h-full w-full object-cover"
          {...props}
        />
        {/* Vignette mask */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,var(--color-substrate)_85%]" />
      </div>
    );
  }
);

HeroCircuit.displayName = 'HeroCircuit';
