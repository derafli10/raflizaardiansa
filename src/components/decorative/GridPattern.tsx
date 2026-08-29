import { useId, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

export interface GridPatternProps extends SVGProps<SVGSVGElement> {
  /**
   * Width/height of grid cell in pixels
   * @default 32
   */
  size?: number;
  /**
   * Stroke opacity between 0 and 1
   * @default 0.15
   */
  strokeOpacity?: number;
  /**
   * Include intersection solder/test point dots
   * @default true
   */
  showDots?: boolean;
  /**
   * Apply radial gradient vignette mask for gentle edge fading
   * @default true
   */
  maskRadial?: boolean;
}

/**
 * GridPattern Component
 *
 * SVG-based engineering grid background with intersection nodes and PCB aesthetic.
 *
 * @example
 * ```tsx
 * <GridPattern size={40} maskRadial className="absolute inset-0 z-base" />
 * ```
 */
export function GridPattern({
  size = 32,
  strokeOpacity = 0.15,
  showDots = true,
  maskRadial = true,
  className,
  ...props
}: GridPatternProps) {
  const id = useId();
  const patternId = `grid-pattern-${id}`;
  const maskId = `grid-mask-${id}`;

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      className={cn('pointer-events-none absolute inset-0 h-full w-full select-none', className)}
      {...props}
    >
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
          {/* Subtle PCB Grid Lines */}
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-trace"
            style={{ opacity: strokeOpacity }}
          />

          {/* Solder / Test Point Intersection Node */}
          {showDots && (
            <circle
              cx="0"
              cy="0"
              r="1.5"
              fill="currentColor"
              className="text-copper"
              style={{ opacity: strokeOpacity * 1.5 }}
            />
          )}
        </pattern>

        {maskRadial && (
          <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        mask={maskRadial ? `url(#${maskId})` : undefined}
      />
    </svg>
  );
}

GridPattern.displayName = 'GridPattern';
