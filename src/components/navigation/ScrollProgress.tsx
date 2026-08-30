'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useNavStore } from '@/stores/nav-store';
import { cn } from '@/lib/utils';

export type ScrollProgressColor = 'copper' | 'cyan' | 'green';

export interface ScrollProgressProps {
  /** Accent color for the progress bar @default 'copper' */
  color?: ScrollProgressColor;
  /** Thickness/height in pixels @default 2 */
  height?: number;
  /** Show numerical percentage readout badge @default false */
  showPercentage?: boolean;
  /** Show telemetry status prefix (e.g. "DATA_SYNC // 42%") @default false */
  showTelemetry?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const COLOR_MAP: Record<ScrollProgressColor, { gradient: string; glow: string; text: string }> = {
  copper: {
    gradient: 'from-copper to-copper-bright',
    glow: 'rgba(212, 165, 116, 0.6)',
    text: 'text-copper-bright',
  },
  cyan: {
    gradient: 'from-signal-cyan to-signal-cyan',
    glow: 'rgba(6, 182, 212, 0.6)',
    text: 'text-signal-cyan',
  },
  green: {
    gradient: 'from-signal-green to-signal-green',
    glow: 'rgba(16, 185, 129, 0.6)',
    text: 'text-signal-green',
  },
};

/**
 * ScrollProgress — Dynamic Horizontal Scroll Progress Indicator.
 *
 * Tracks page scroll percentage via `useScrollProgress` hook and illuminates
 * a metallic copper/signal trace bar across the viewport or navigation header.
 *
 * **Requirements: 17.2, 6.8**
 */
export function ScrollProgress({
  color = 'copper',
  height = 2,
  showPercentage = false,
  showTelemetry = false,
  className,
}: ScrollProgressProps) {
  // Sync window scroll progress with nav store
  useScrollProgress();

  const scrollProgress = useNavStore((state) => state.scrollProgress);
  const theme = COLOR_MAP[color] || COLOR_MAP.copper;

  return (
    <div
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll narrative progress"
      style={{ height: `${height}px` }}
      className={cn(
        'bg-substrate-raised/40 pointer-events-none relative w-full overflow-hidden select-none',
        className
      )}
    >
      {/* Hardware-Accelerated Progress Bar Fill */}
      <div
        className={cn(
          'h-full w-full origin-left bg-gradient-to-r transition-transform duration-100 ease-out',
          theme.gradient
        )}
        style={{
          transform: `scaleX(${scrollProgress / 100}) translateZ(0)`,
          boxShadow: `0 0 8px ${theme.glow}`,
        }}
      />

      {/* Numerical Progress / Telemetry Readout */}
      {(showPercentage || showTelemetry) && (
        <div
          className={cn(
            'absolute -top-6 right-2 font-mono text-[10px] font-semibold tracking-wider uppercase tabular-nums',
            theme.text
          )}
        >
          {showTelemetry ? `DATA_SYNC // ${scrollProgress}%` : `${scrollProgress}%`}
        </div>
      )}
    </div>
  );
}

ScrollProgress.displayName = 'ScrollProgress';
