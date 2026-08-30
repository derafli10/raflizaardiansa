'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionNodeProps extends Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  'onSelect'
> {
  /** Section identifier matching DOM element ID */
  id: string;
  /** Section index (1-based, e.g. 1 to 6) */
  index: number;
  /** Human-readable section label (e.g. "HERO", "ABOUT", "SKILLS") */
  label: string;
  /** Whether this section is currently active in the viewport */
  active?: boolean;
  /** Whether the user has scrolled past this section */
  passed?: boolean;
  /** Click callback to navigate to this section */
  onSelect?: (id: string) => void;
}

/**
 * SectionNode — Milestone Node Indicator for Scroll Narrative.
 *
 * Represents an individual section junction on the persistent circuit path.
 * Features copper solder pad styling, active signal pulse, and accessible click-to-scroll.
 *
 * **Requirements: 6.2, 6.4, 6.8**
 */
export const SectionNode = forwardRef<HTMLButtonElement, SectionNodeProps>(
  ({ id, index, label, active = false, passed = false, onSelect, className, ...props }, ref) => {
    const formattedIndex = String(index).padStart(2, '0');

    const handleClick = () => {
      onSelect?.(id);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-label={`Jump to section ${formattedIndex}: ${label}`}
        aria-current={active ? 'location' : undefined}
        className={cn(
          'group relative flex items-center gap-3 px-1 py-2 text-left transition-all duration-300',
          'focus-visible:ring-copper focus-visible:ring-offset-substrate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {/* Solder Via Node Pad */}
        <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
          {/* Outer active pulse ring */}
          {active && (
            <span
              className="bg-signal-cyan/20 absolute inset-0 animate-ping rounded-full"
              aria-hidden="true"
            />
          )}

          {/* Solder Pad Outer Ring */}
          <div
            className={cn(
              'flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300',
              active
                ? 'border-signal-cyan bg-signal-cyan/20 shadow-signal-glow scale-125'
                : passed
                  ? 'border-copper bg-copper/30'
                  : 'border-substrate-raised bg-substrate group-hover:border-copper/70'
            )}
          >
            {/* Center Via Core Dot */}
            <div
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                active
                  ? 'bg-signal-cyan'
                  : passed
                    ? 'bg-copper'
                    : 'bg-text-tertiary group-hover:bg-copper'
              )}
            />
          </div>
        </div>

        {/* Node Monospace Label & Step Identifier */}
        <div
          className={cn(
            'flex flex-col font-mono transition-all duration-300 select-none',
            active
              ? 'translate-x-0 opacity-100'
              : '-translate-x-1 opacity-40 group-hover:translate-x-0 group-hover:opacity-80'
          )}
        >
          <span className="text-text-tertiary text-[10px] tracking-widest">
            NODE_{formattedIndex}
          </span>
          <span
            className={cn(
              'text-xs font-semibold tracking-wider uppercase',
              active
                ? 'text-signal-cyan font-bold'
                : 'text-text-secondary group-hover:text-text-primary'
            )}
          >
            {label}
          </span>
        </div>
      </button>
    );
  }
);

SectionNode.displayName = 'SectionNode';
