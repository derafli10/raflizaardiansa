'use client';

/**
 * Skeleton Primitive Component
 *
 * Elite PCB-inspired loading placeholder with shimmering trace pulses,
 * multiple geometric shapes (line, circle, card, button), and responsive layouts.
 *
 * @module components/ui/Skeleton
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CVA Skeleton Variants
 */
export const skeletonVariants = cva(
  ['relative overflow-hidden bg-substrate-raised border border-trace/40'],
  {
    variants: {
      shape: {
        /**
         * Line / Text row shape
         */
        line: 'h-4 w-full rounded-md',
        /**
         * Circle shape (avatars, status nodes, test points)
         */
        circle: 'rounded-full shrink-0 aspect-square',
        /**
         * Card container shape
         */
        card: 'w-full h-48 rounded-xl',
        /**
         * Button / action shape
         */
        button: 'h-11 w-32 rounded-lg',
      },
    },
    defaultVariants: {
      shape: 'line',
    },
  }
);

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  /**
   * Optional custom width (e.g. '60%', '200px')
   */
  width?: string | number;
  /**
   * Optional custom height (e.g. '24px')
   */
  height?: string | number;
}

/**
 * Skeleton Component
 *
 * @example
 * ```tsx
 * // Text lines skeleton
 * <div className="space-y-2">
 *   <Skeleton shape="line" className="w-3/4 h-5" />
 *   <Skeleton shape="line" className="w-1/2" />
 * </div>
 *
 * // Circle Avatar skeleton
 * <Skeleton shape="circle" className="w-12 h-12" />
 *
 * // Project Card skeleton
 * <Skeleton shape="card" className="h-64" />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape = 'line', width, height, style, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const inlineStyle = {
      width,
      height,
      ...style,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={inlineStyle}
        className={cn(
          skeletonVariants({ shape }),
          !prefersReducedMotion && 'animate-pulse',
          className
        )}
        {...props}
      >
        {/* Shimmer sweep effect */}
        {!prefersReducedMotion && (
          <span
            className="via-copper/10 pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';
