'use client';

/**
 * Badge Primitive Component
 *
 * Elite PCB-inspired badge component with Class Variance Authority (CVA),
 * category color-coding (skill, status, tag), and smooth slide background fill animation on hover.
 *
 * @module components/ui/Badge
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * CVA Badge Variants definition
 */
export const badgeVariants = cva(
  [
    'inline-flex items-center justify-center font-mono font-medium tracking-wide',
    'relative overflow-hidden group select-none transition-all duration-300 rounded-full border',
  ],
  {
    variants: {
      variant: {
        /**
         * Skill Variant
         * Cyan-hued signal badge for technical skills and proficiencies
         */
        skill: [
          'bg-signal-cyan/10 text-signal-cyan border-signal-cyan/30',
          'hover:border-signal-cyan hover:shadow-[0_0_12px_rgba(6,182,212,0.35)]',
        ],
        /**
         * Status Variant (Active/Success default)
         * Signal LED indicator styling
         */
        status: [
          'bg-signal-green/10 text-signal-green border-signal-green/30',
          'hover:border-signal-green hover:shadow-[0_0_12px_rgba(34,197,94,0.35)]',
        ],
        /**
         * Tag Variant
         * Copper metallic token badge for technology tags and metadata
         */
        tag: [
          'bg-substrate-raised text-copper border-trace',
          'hover:border-copper hover:text-copper-bright hover:shadow-[0_0_12px_rgba(212,165,116,0.3)]',
        ],
        /**
         * Outline / Neutral Variant
         */
        outline: [
          'bg-transparent text-text-secondary border-trace',
          'hover:text-text-primary hover:border-text-secondary hover:bg-substrate-raised/50',
        ],
      },
      statusType: {
        active:
          'bg-signal-green/10 text-signal-green border-signal-green/30 hover:border-signal-green',
        warning:
          'bg-signal-amber/10 text-signal-amber border-signal-amber/30 hover:border-signal-amber',
        error: 'bg-signal-red/10 text-signal-red border-signal-red/30 hover:border-signal-red',
        info: 'bg-signal-cyan/10 text-signal-cyan border-signal-cyan/30 hover:border-signal-cyan',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px] leading-none gap-1',
        md: 'px-2.5 py-1 text-xs leading-none gap-1.5',
        lg: 'px-3.5 py-1.5 text-sm leading-none gap-2',
      },
    },
    defaultVariants: {
      variant: 'tag',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /**
   * Optional leading icon or LED indicator
   */
  icon?: ReactNode;
  /**
   * Show animated pulse LED dot for status badges
   */
  pulseDot?: boolean;
}

/**
 * Badge Component
 *
 * @example
 * ```tsx
 * // Skill Badge
 * <Badge variant="skill">TypeScript</Badge>
 *
 * // Status Badge with pulse LED
 * <Badge variant="status" pulseDot>Active</Badge>
 *
 * // Tag Badge with icon
 * <Badge variant="tag" icon={<Terminal className="w-3 h-3" />}>Next.js</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'tag',
      statusType,
      size = 'md',
      icon,
      pulseDot = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            statusType: variant === 'status' ? statusType : undefined,
            size,
          }),
          className
        )}
        {...props}
      >
        {/* Slide background fill animation on hover */}
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-current/15 transition-transform duration-300 ease-out group-hover:translate-x-0"
          aria-hidden="true"
        />

        {/* Pulse LED dot if requested */}
        {pulseDot && (
          <span className="relative mr-0.5 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
        )}

        {/* Icon */}
        {icon && <span className="relative z-10 shrink-0">{icon}</span>}

        {/* Content */}
        <span className="relative z-10 truncate">{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
