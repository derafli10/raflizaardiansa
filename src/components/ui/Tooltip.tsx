'use client';

/**
 * Tooltip Primitive Component
 *
 * Elite PCB-inspired accessible tooltip component supporting multi-directional
 * positioning (top, bottom, left, right), fade & translate entrance animations,
 * and keyboard/focus accessibility.
 *
 * @module components/ui/Tooltip
 */

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useId,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Tooltip content to display
   */
  content: ReactNode;
  /**
   * Tooltip placement relative to trigger element
   * @default 'top'
   */
  position?: TooltipPosition;
  /**
   * Delay in milliseconds before showing tooltip on hover
   * @default 100
   */
  delay?: number;
  /**
   * Interactive trigger element
   */
  children: ReactNode;
  /**
   * Custom popup panel className
   */
  panelClassName?: string;
}

const positionClasses: Record<
  TooltipPosition,
  { panel: string; arrow: string; translate: string }
> = {
  top: {
    panel: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow:
      'top-full left-1/2 -translate-x-1/2 border-t-substrate-raised border-x-transparent border-b-transparent',
    translate: '-translate-y-1',
  },
  bottom: {
    panel: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow:
      'bottom-full left-1/2 -translate-x-1/2 border-b-substrate-raised border-x-transparent border-t-transparent',
    translate: 'translate-y-1',
  },
  left: {
    panel: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow:
      'left-full top-1/2 -translate-y-1/2 border-l-substrate-raised border-y-transparent border-r-transparent',
    translate: '-translate-x-1',
  },
  right: {
    panel: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow:
      'right-full top-1/2 -translate-y-1/2 border-r-substrate-raised border-y-transparent border-l-transparent',
    translate: 'translate-x-1',
  },
};

/**
 * Tooltip Component
 *
 * @example
 * ```tsx
 * // Top tooltip
 * <Tooltip content="Copy trace identifier" position="top">
 *   <Button size="sm">Copy</Button>
 * </Tooltip>
 *
 * // Right tooltip
 * <Tooltip content="Signal status: Stable (99.9%)" position="right">
 *   <Badge variant="status" pulseDot>Online</Badge>
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { content, position = 'top', delay = 100, children, className, panelClassName, ...props },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const tooltipId = useId();

    const handleMouseEnter = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }, [delay]);

    const handleMouseLeave = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(false);
    }, []);

    const handleFocus = useCallback(() => {
      setIsVisible(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsVisible(false);
    }, []);

    const pos = positionClasses[position];

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        <Popover className="relative inline-flex">
          {() => (
            <>
              <PopoverButton as="div" className="cursor-inherit inline-flex outline-none">
                {children}
              </PopoverButton>

              {isVisible && (
                <PopoverPanel
                  static
                  id={tooltipId}
                  role="tooltip"
                  aria-live="polite"
                  className={cn(
                    'z-dropdown pointer-events-none absolute flex items-center justify-center whitespace-nowrap',
                    'border-trace bg-substrate-raised text-text-primary rounded-md border px-2.5 py-1 font-mono text-xs',
                    'shadow-[0_0_15px_rgba(212,165,116,0.25)]',
                    'transition-all duration-200 ease-out',
                    !prefersReducedMotion && 'animate-fade-in',
                    pos.panel,
                    panelClassName
                  )}
                >
                  {/* Tooltip Content */}
                  <span className="relative z-10 flex items-center gap-1.5">{content}</span>

                  {/* Arrow Indicator */}
                  <span
                    className={cn('pointer-events-none absolute h-0 w-0 border-4', pos.arrow)}
                    aria-hidden="true"
                  />
                </PopoverPanel>
              )}
            </>
          )}
        </Popover>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
