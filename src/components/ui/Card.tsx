'use client';

/**
 * Card Primitive Component
 *
 * Elite PCB-inspired card primitive with Class Variance Authority (CVA),
 * 3D tilt physics, copper glow borders on hover, and structured subcomponents.
 *
 * @module components/ui/Card
 */

import {
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type MouseEvent,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useCursorState } from '@/hooks/useCursorState';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CVA Card Variants definition
 */
export const cardVariants = cva(
  [
    'relative rounded-xl border transition-all duration-300 font-sans overflow-hidden',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-substrate',
  ],
  {
    variants: {
      variant: {
        /**
         * Default Variant
         * Standard PCB substrate container with subtle trace border
         */
        default: 'bg-substrate border-trace text-text-primary',
        /**
         * Elevated Variant
         * Raised substrate background with depth shadow and refined trace border
         */
        elevated:
          'bg-substrate-raised border-trace/80 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-text-primary',
        /**
         * Interactive Variant
         * Clickable card with 3D tilt capability, copper hover border glow, and corner solder pads
         */
        interactive: [
          'bg-substrate-raised border-trace text-text-primary cursor-pointer select-none',
          'hover:border-copper hover:shadow-copper-glow',
          'transform-gpu tilt-3d',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Props for Card component
 */
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  /**
   * Enable 3D tilt effect on hover (enabled by default for interactive variant)
   */
  tilt?: boolean;
  /**
   * 3D tilt intensity in degrees
   * @default 8
   */
  tiltIntensity?: number;
  /**
   * Custom cursor state on hover (e.g. 'view' for project cards, 'grow' for generic interactive cards)
   * @default 'grow'
   */
  cursorState?: 'dot' | 'grow' | 'blend' | 'view';
}

/**
 * Card Component
 *
 * Root container for modular card structures.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      tilt,
      tiltIntensity = 8,
      cursorState = 'grow',
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const { setCursorState, resetCursor } = useCursorState();

    const isInteractive = variant === 'interactive';
    const isTiltActive = (tilt ?? isInteractive) && !prefersReducedMotion;

    // 3D Tilt calculation & transform
    useEffect(() => {
      if (typeof window === 'undefined' || !isTiltActive) return;

      const element = internalRef.current;
      if (!element) return;

      element.style.transformStyle = 'preserve-3d';
      element.style.transition = 'transform 0.3s ease-out';
      element.style.willChange = 'transform';

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
        const rotateY = ((x - centerX) / centerX) * tiltIntensity;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      };

      const handleMouseLeave = () => {
        element.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
        if (element) {
          element.style.transform = '';
          element.style.willChange = '';
        }
      };
    }, [isTiltActive, tiltIntensity]);

    // Handle cursor transitions
    const handleMouseEnter = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isInteractive) {
          setCursorState(cursorState);
        }
        onMouseEnter?.(e);
      },
      [isInteractive, cursorState, setCursorState, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isInteractive) {
          resetCursor();
        }
        onMouseLeave?.(e);
      },
      [isInteractive, resetCursor, onMouseLeave]
    );

    // Merge forwarded ref and internal ref
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    return (
      <div
        ref={setRefs}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      >
        {/* PCB Solder Corner Accents for interactive variant */}
        {isInteractive && (
          <>
            <span
              className="border-copper/40 group-hover:border-copper pointer-events-none absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 transition-colors duration-300"
              aria-hidden="true"
            />
            <span
              className="border-copper/40 group-hover:border-copper pointer-events-none absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 transition-colors duration-300"
              aria-hidden="true"
            />
            <span
              className="border-copper/40 group-hover:border-copper pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 transition-colors duration-300"
              aria-hidden="true"
            />
            <span
              className="border-copper/40 group-hover:border-copper pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 transition-colors duration-300"
              aria-hidden="true"
            />
          </>
        )}

        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

/**
 * CardHeader Component
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-5 sm:p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

/**
 * CardTitle Component
 */
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-display text-text-primary group-hover:text-copper-bright text-lg leading-tight font-bold tracking-tight transition-colors duration-200 sm:text-xl',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

/**
 * CardDescription Component
 */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-text-secondary text-xs leading-relaxed sm:text-sm', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * CardContent Component
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-text-secondary p-5 pt-0 text-sm sm:p-6 sm:pt-0', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

/**
 * CardFooter Component
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-trace/40 mt-2 flex items-center gap-2 border-t p-5 pt-0 pt-4 sm:p-6 sm:pt-0',
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';
