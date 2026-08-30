'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { Trace } from './Trace';
import { Node } from './Node';
import { DataFlow } from './DataFlow';
import { ComponentSymbol } from './ComponentSymbol';

export type CircuitBoardVariant = 'hero' | 'skills' | 'full';

export interface CircuitBoardProps extends React.SVGProps<SVGSVGElement> {
  /** Circuit board layout preset variant @default 'hero' */
  variant?: CircuitBoardVariant;
  /** Whether traces should animate into view on scroll @default true */
  animatedTraces?: boolean;
  /** Whether data packets should stream continuously @default true */
  animatedDataFlow?: boolean;
  /** Active node identifier or highlight index */
  activeNode?: string | number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CircuitBoard — Master SVG Circuit Board Component.
 *
 * Layers 5 visual elements to create an authentic, living PCB infrastructure:
 * 1. Substrate grid mesh pattern with solder vias
 * 2. DrawSVG animated copper traces with 45° routing
 * 3. Electronic component schematic symbols (MCU, Resistors, Capacitors, GND)
 * 4. Continuous streaming DataFlow packet dots
 * 5. High-fidelity copper/signal glow filters
 *
 * **Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8**
 */
export const CircuitBoard = forwardRef<SVGSVGElement, CircuitBoardProps>(
  (
    {
      variant = 'hero',
      animatedTraces = true,
      animatedDataFlow = true,
      activeNode,
      className,
      ...props
    },
    ref
  ) => {
    const filterId = useId();
    const patternId = useId();

    return (
      <svg
        ref={ref}
        viewBox={variant === 'full' ? '0 0 1440 900' : '0 0 1000 600'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        className={cn('pointer-events-none h-full w-full overflow-hidden select-none', className)}
        {...props}
      >
        <defs>
          {/* Layer 5: Glow Effect Filters */}
          <filter id={`circuit-glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`signal-glow-${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.02   0 0 0 0 0.71   0 0 0 0 0.83  0 0 0 1 0"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Layer 1: Substrate Grid Pattern with Solder Dots */}
          <pattern
            id={`grid-pattern-${patternId}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill="var(--color-copper)" opacity="0.15" />
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--color-substrate-raised)"
              strokeWidth="0.5"
              opacity="0.25"
            />
          </pattern>
        </defs>

        {/* LAYER 1: Background Grid Pattern */}
        <rect width="100%" height="100%" fill={`url(#grid-pattern-${patternId})`} opacity={0.8} />

        {/* ========================================================================= */}
        {/* VARIANT: HERO                                                             */}
        {/* ========================================================================= */}
        {variant === 'hero' && (
          <g className="circuit-board-hero">
            {/* LAYER 2: Trace Paths */}
            {/* Main bus line from left MCU */}
            <Trace
              d="M 50 150 L 250 150 L 320 220 L 600 220 L 680 300 L 950 300"
              color="copper"
              strokeWidth={2}
              animated={animatedTraces}
              duration={1.8}
              glow
              active={activeNode === 'hero-bus-1'}
            />
            <Trace
              d="M 50 180 L 220 180 L 280 240 L 520 240 L 580 300 L 780 300 L 850 370 L 950 370"
              color="copper"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={2}
              delay={0.2}
            />
            <Trace
              d="M 200 50 L 200 120 L 260 180 L 450 180 L 500 230 L 500 480"
              color="copper"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={1.6}
              delay={0.4}
            />
            <Trace
              d="M 680 300 L 680 480 L 740 540 L 950 540"
              color="copper-bright"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={1.5}
              delay={0.5}
            />

            {/* LAYER 3: Component Symbols */}
            <ComponentSymbol symbol="ic" x={120} y={165} scale={1.2} label="MCU-CORE" active />
            <ComponentSymbol symbol="resistor" x={400} y={180} scale={0.9} label="R1 10k" />
            <ComponentSymbol symbol="capacitor" x={720} y={300} scale={0.9} label="C1 100nF" />
            <ComponentSymbol symbol="ground" x={500} y={510} scale={0.9} label="GND" />

            {/* LAYER 4: Data Flow Stream */}
            {animatedDataFlow && (
              <>
                <DataFlow
                  path="M 50 150 L 250 150 L 320 220 L 600 220 L 680 300 L 950 300"
                  color="cyan"
                  duration={3.5}
                  size={3.5}
                  packetCount={3}
                />
                <DataFlow
                  path="M 200 50 L 200 120 L 260 180 L 450 180 L 500 230 L 500 480"
                  color="copper"
                  duration={4}
                  delay={0.5}
                  size={3}
                  packetCount={2}
                />
              </>
            )}

            {/* LAYER 3: Nodes & Solder Vias */}
            <Node cx={50} cy={150} r={6} variant="terminal" label="VCC" active />
            <Node cx={250} cy={150} r={5} variant="via" />
            <Node cx={320} cy={220} r={5} variant="via" />
            <Node cx={600} cy={220} r={6} variant="test-point" label="TP1" active />
            <Node cx={680} cy={300} r={5} variant="via" />
            <Node cx={950} cy={300} r={6} variant="terminal" label="TX" active />
            <Node cx={950} cy={370} r={6} variant="terminal" label="RX" />
            <Node cx={200} cy={50} r={5} variant="pad" />
            <Node cx={950} cy={540} r={6} variant="terminal" label="GND" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* VARIANT: SKILLS (Network Topology Schematic)                              */}
        {/* ========================================================================= */}
        {variant === 'skills' && (
          <g className="circuit-board-skills">
            {/* Cross-linking bus traces between skill clusters */}
            <Trace
              d="M 150 150 L 350 150 L 500 300 L 650 300 L 850 150"
              color="signal-cyan"
              strokeWidth={1.8}
              animated={animatedTraces}
              duration={2}
              glow
            />
            <Trace
              d="M 150 450 L 350 450 L 500 300 L 650 300 L 850 450"
              color="signal-green"
              strokeWidth={1.8}
              animated={animatedTraces}
              duration={2}
              delay={0.2}
              glow
            />
            <Trace
              d="M 500 80 L 500 300 L 500 520"
              color="copper"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={1.6}
              delay={0.3}
            />

            {/* Component Symbols for 4 domains */}
            <ComponentSymbol symbol="antenna" x={500} y={80} scale={1} label="NETWORK" active />
            <ComponentSymbol symbol="ic" x={500} y={300} scale={1.3} label="CORE ROUTER" active />
            <ComponentSymbol symbol="diode" x={350} y={150} scale={0.9} label="SECURITY" />
            <ComponentSymbol symbol="inductor" x={650} y={300} scale={0.9} label="HARDWARE" />
            <ComponentSymbol symbol="ground" x={500} y={540} scale={0.9} label="GND" />

            {/* Continuous Data Flow Packets */}
            {animatedDataFlow && (
              <>
                <DataFlow
                  path="M 150 150 L 350 150 L 500 300 L 650 300 L 850 150"
                  color="cyan"
                  duration={3.2}
                  size={3.5}
                />
                <DataFlow
                  path="M 150 450 L 350 450 L 500 300 L 650 300 L 850 450"
                  color="green"
                  duration={3.6}
                  reverse
                  size={3.5}
                />
              </>
            )}

            {/* Nodes */}
            <Node cx={150} cy={150} r={7} variant="test-point" label="SEC" active />
            <Node cx={850} cy={150} r={7} variant="test-point" label="NET" active />
            <Node cx={150} cy={450} r={7} variant="test-point" label="SW" active />
            <Node cx={850} cy={450} r={7} variant="test-point" label="HW" active />
            <Node cx={500} cy={300} r={8} variant="terminal" active />
          </g>
        )}

        {/* ========================================================================= */}
        {/* VARIANT: FULL VIEWPORT BLUEPRINT SCHEMATIC                                 */}
        {/* ========================================================================= */}
        {variant === 'full' && (
          <g className="circuit-board-full">
            {/* Top perimeter bus */}
            <Trace
              d="M 60 80 L 1380 80"
              color="copper"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={2}
            />
            {/* Bottom perimeter bus */}
            <Trace
              d="M 60 820 L 1380 820"
              color="copper"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={2}
              delay={0.2}
            />
            {/* Left interconnects */}
            <Trace
              d="M 120 80 L 120 350 L 220 450 L 220 820"
              color="copper-bright"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={2.2}
              delay={0.3}
            />
            {/* Right interconnects */}
            <Trace
              d="M 1320 80 L 1320 350 L 1220 450 L 1220 820"
              color="copper-bright"
              strokeWidth={1.5}
              animated={animatedTraces}
              duration={2.2}
              delay={0.4}
            />
            {/* Center backbone */}
            <Trace
              d="M 300 450 L 600 450 L 720 330 L 840 450 L 1140 450"
              color="signal-cyan"
              strokeWidth={2}
              animated={animatedTraces}
              duration={2.5}
              glow
            />

            {/* Component Symbols */}
            <ComponentSymbol symbol="ic" x={720} y={330} scale={1.2} label="SOC-INFRA" active />
            <ComponentSymbol symbol="resistor" x={450} y={450} scale={0.9} label="R_BUS" />
            <ComponentSymbol symbol="capacitor" x={990} y={450} scale={0.9} label="C_BUS" />
            <ComponentSymbol symbol="ground" x={720} y={820} scale={1} label="CHASSIS_GND" />

            {/* Data Flow */}
            {animatedDataFlow && (
              <DataFlow
                path="M 300 450 L 600 450 L 720 330 L 840 450 L 1140 450"
                color="cyan"
                duration={4.5}
                size={4}
                packetCount={4}
              />
            )}

            {/* Nodes */}
            <Node cx={60} cy={80} r={6} variant="terminal" label="PWR+" />
            <Node cx={1380} cy={80} r={6} variant="terminal" label="PWR-" />
            <Node cx={60} cy={820} r={6} variant="terminal" label="GND" />
            <Node cx={1380} cy={820} r={6} variant="terminal" label="EARTH" />
            <Node cx={300} cy={450} r={6} variant="test-point" label="TP_IN" active />
            <Node cx={1140} cy={450} r={6} variant="test-point" label="TP_OUT" active />
          </g>
        )}
      </svg>
    );
  }
);

CircuitBoard.displayName = 'CircuitBoard';
