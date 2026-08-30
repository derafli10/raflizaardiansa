'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type SchematicSymbolType =
  'resistor' | 'capacitor' | 'inductor' | 'diode' | 'ic' | 'ground' | 'antenna';

export interface ComponentSymbolProps extends React.SVGProps<SVGGElement> {
  /** Type of electronic symbol to display */
  symbol: SchematicSymbolType;
  /** X center position in SVG viewBox @default 50 */
  x?: number;
  /** Y center position in SVG viewBox @default 50 */
  y?: number;
  /** Scale factor @default 1 */
  scale?: number;
  /** Optional schematic label (e.g. "R1 10k", "C1 100nF", "MCU", "GND") */
  label?: string;
  /** Whether the component is energized/active */
  active?: boolean;
  /** Morph transition duration when symbol type changes @default 0.6 */
  morphDuration?: number;
  /** Additional CSS classes */
  className?: string;
}

// Normalized SVG path data (all normalized around 0 0 center) for morphing
export const SYMBOL_PATHS: Record<SchematicSymbolType, string> = {
  // Resistor: zig-zag wave
  resistor: 'M -30 0 L -15 0 L -10 -10 L 0 10 L 10 -10 L 15 0 L 30 0',
  // Capacitor: two parallel plates with leads
  capacitor: 'M -30 0 L -6 0 M -6 -15 L -6 15 M 6 -15 L 6 15 M 6 0 L 30 0',
  // Inductor: 3 semi-circular coils
  inductor: 'M -30 0 L -18 0 A 6 6 0 0 1 -6 0 A 6 6 0 0 1 6 0 A 6 6 0 0 1 18 0 L 30 0',
  // Diode: triangle with cathode bar
  diode: 'M -30 0 L -10 0 M -10 -12 L 10 0 L -10 12 Z M 10 -12 L 10 12 M 10 0 L 30 0',
  // IC chip outline
  ic: 'M -20 -15 L 20 -15 L 20 15 L -20 15 Z M -20 -8 L -26 -8 M -20 0 L -26 0 M -20 8 L -26 8 M 20 -8 L 26 -8 M 20 0 L 26 0 M 20 8 L 26 8',
  // Ground GND: 3 stepped bars
  ground: 'M 0 -20 L 0 0 M -18 0 L 18 0 M -12 6 L 12 6 M -6 12 L 6 12',
  // Antenna: triangle radiating tower
  antenna: 'M 0 20 L 0 -5 M -12 -20 L 0 -5 L 12 -20 M -12 -20 L 12 -20',
};

/**
 * ComponentSymbol — Electronic Schematic Symbol with MorphSVG transitions.
 *
 * Renders schematic components (Resistors, Capacitors, ICs, Diodes, GND)
 * capable of smooth geometric morphing between shapes when transitioning sections.
 *
 * **Requirements: 10.5, 10.7, 10.8**
 */
export const ComponentSymbol = forwardRef<SVGGElement, ComponentSymbolProps>(
  (
    {
      symbol,
      x = 50,
      y = 50,
      scale = 1,
      label,
      active = false,
      morphDuration = 0.6,
      className,
      ...props
    },
    ref
  ) => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const prevSymbolRef = useRef<SchematicSymbolType>(symbol);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
      if (prefersReducedMotion) {
        prevSymbolRef.current = symbol;
        return;
      }

      if (prevSymbolRef.current !== symbol && pathRef.current) {
        gsap.registerPlugin(MorphSVGPlugin);

        const targetPath = SYMBOL_PATHS[symbol];
        if (targetPath) {
          gsap.to(pathRef.current, {
            morphSVG: targetPath,
            duration: morphDuration,
            ease: 'power3.inOut',
          });
        }
        prevSymbolRef.current = symbol;
      }
    }, [symbol, morphDuration, prefersReducedMotion]);

    const initialD = SYMBOL_PATHS[symbol] || SYMBOL_PATHS.resistor;

    return (
      <g
        ref={ref}
        transform={`translate(${x}, ${y}) scale(${scale})`}
        className={cn(
          'schematic-symbol transition-opacity duration-300 select-none',
          active ? 'opacity-100' : 'opacity-70',
          className
        )}
        {...props}
      >
        {/* Symbol path */}
        <path
          ref={pathRef}
          d={initialD}
          fill="none"
          stroke={active ? 'var(--color-copper-bright)' : 'var(--color-copper)'}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />

        {/* Terminal solder dots for connection points */}
        <circle cx="-30" cy="0" r="2.5" fill="var(--color-solder)" opacity={0.8} />
        <circle cx="30" cy="0" r="2.5" fill="var(--color-solder)" opacity={0.8} />

        {/* Label */}
        {label && (
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="8"
            fontFamily="var(--font-mono)"
            className="font-medium tracking-wider select-none"
          >
            {label}
          </text>
        )}
      </g>
    );
  }
);

ComponentSymbol.displayName = 'ComponentSymbol';
