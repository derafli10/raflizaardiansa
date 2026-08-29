import { useId, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

export interface SchematicPatternProps extends SVGProps<SVGSVGElement> {
  /**
   * Pattern scale size
   * @default 240
   */
  size?: number;
  /**
   * Overall pattern opacity
   * @default 0.1
   */
  patternOpacity?: number;
}

/**
 * SchematicPattern Component
 *
 * Engineering schematic background pattern featuring authentic electronic symbols:
 * - Resistor (zigzag trace)
 * - Capacitor (parallel conductive plates)
 * - Ground symbol (⏚ chassis ground)
 * - IC Chip (DIP package with pin leads)
 * - Test points (TP1 / TP2)
 *
 * @example
 * ```tsx
 * <SchematicPattern className="absolute inset-0 z-base" patternOpacity={0.08} />
 * ```
 */
export function SchematicPattern({
  size = 240,
  patternOpacity = 0.1,
  className,
  ...props
}: SchematicPatternProps) {
  const id = useId();
  const patternId = `schematic-pattern-${id}`;

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      className={cn(
        'text-copper pointer-events-none absolute inset-0 h-full w-full select-none',
        className
      )}
      {...props}
    >
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
          <g
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: patternOpacity }}
          >
            {/* 1. Resistor Symbol (Zigzag) */}
            <g transform="translate(20, 30)">
              <path d="M 0 15 L 15 15 L 20 5 L 30 25 L 40 5 L 50 25 L 55 15 L 70 15" />
              <circle cx="0" cy="15" r="2" fill="currentColor" />
              <circle cx="70" cy="15" r="2" fill="currentColor" />
              <text
                x="35"
                y="38"
                textAnchor="middle"
                fontSize="8"
                fontFamily="var(--font-mono)"
                fill="currentColor"
                stroke="none"
              >
                R1 10k
              </text>
            </g>

            {/* 2. Capacitor Symbol (Parallel Plates) */}
            <g transform="translate(140, 25)">
              <path d="M 0 20 L 25 20" />
              <path d="M 25 8 L 25 32" strokeWidth="1.8" />
              <path d="M 33 8 L 33 32" strokeWidth="1.8" />
              <path d="M 33 20 L 58 20" />
              <circle cx="0" cy="20" r="2" fill="currentColor" />
              <circle cx="58" cy="20" r="2" fill="currentColor" />
              <text
                x="29"
                y="42"
                textAnchor="middle"
                fontSize="8"
                fontFamily="var(--font-mono)"
                fill="currentColor"
                stroke="none"
              >
                C1 100nF
              </text>
            </g>

            {/* 3. Integrated Circuit (IC Chip Package) */}
            <g transform="translate(25, 120)">
              {/* Chip Body */}
              <rect
                x="15"
                y="10"
                width="50"
                height="50"
                rx="3"
                fill="var(--color-substrate)"
                strokeWidth="1.5"
              />
              {/* Pin 1 Index Notch */}
              <path d="M 36 10 A 4 4 0 0 0 44 10" />
              {/* Left Pin Leads */}
              <path d="M 0 20 L 15 20 M 0 35 L 15 35 M 0 50 L 15 50" />
              {/* Right Pin Leads */}
              <path d="M 65 20 L 80 20 M 65 35 L 80 35 M 65 50 L 80 50" />
              {/* Chip Identifier */}
              <text
                x="40"
                y="38"
                textAnchor="middle"
                fontSize="8"
                fontFamily="var(--font-mono)"
                fill="currentColor"
                stroke="none"
                fontWeight="bold"
              >
                U1 MCU
              </text>
            </g>

            {/* 4. Ground Symbol (Chassis / Earth Ground) */}
            <g transform="translate(160, 140)">
              <path d="M 25 0 L 25 20" />
              <path d="M 10 20 L 40 20" strokeWidth="1.8" />
              <path d="M 15 26 L 35 26" strokeWidth="1.6" />
              <path d="M 20 32 L 30 32" strokeWidth="1.4" />
              <text
                x="25"
                y="44"
                textAnchor="middle"
                fontSize="8"
                fontFamily="var(--font-mono)"
                fill="currentColor"
                stroke="none"
              >
                GND
              </text>
            </g>

            {/* 5. Interconnecting Bus / Trace Lines */}
            <path
              d="M 90 45 L 110 45 L 125 145 L 160 145"
              strokeDasharray="3 3"
              strokeOpacity="0.5"
            />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

SchematicPattern.displayName = 'SchematicPattern';
