'use client';

/**
 * Button Primitive Component
 *
 * Elite PCB-inspired button primitive with Class Variance Authority (CVA),
 * GSAP-powered magnetic attraction, circuit-border animations, and full
 * accessibility compliance (WCAG 2.1 AA).
 *
 * @module components/ui/Button
 */

import {
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { useCursorState } from '@/hooks/useCursorState';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CVA Button Variants definition
 */
export const buttonVariants = cva(
  [
    // Layout & Base
    'inline-flex items-center justify-center font-mono font-medium tracking-wide',
    'relative group overflow-hidden select-none cursor-pointer',
    'transition-all duration-300 ease-out transform-gpu',
    // Accessibility & Focus States - Copper Glow Ring (Req: 28.2, 28.3)
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-substrate',
    // Disabled State
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    // Touch Optimization
    'touch-manipulation active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        /**
         * Primary Variant
         * Metallic copper background with high-contrast substrate text and ambient copper glow
         */
        primary: [
          'bg-copper text-substrate font-semibold',
          'shadow-[0_0_15px_rgba(212,165,116,0.25)]',
          'hover:bg-copper-bright hover:shadow-copper-glow',
          'active:bg-copper-dim',
        ],
        /**
         * Secondary Variant
         * Substrate raised background with metallic copper trace borders and circuit animation
         */
        secondary: [
          'bg-substrate-raised text-copper border border-trace',
          'hover:border-copper hover:text-copper-bright hover:shadow-copper-glow',
          'active:bg-substrate',
        ],
        /**
         * Ghost Variant
         * Transparent background with subtle trace borders and copper text highlights on hover
         */
        ghost: [
          'bg-transparent text-text-secondary border border-transparent',
          'hover:text-copper hover:bg-substrate-raised/60 hover:border-trace',
          'active:bg-substrate-raised',
        ],
      },
      size: {
        /** Small: compact controls & tags */
        sm: 'h-9 px-3.5 py-1.5 text-xs rounded-md min-h-[36px] gap-1.5',
        /** Medium: default standard with minimum 44px WCAG touch target */
        md: 'h-11 px-5 py-2.5 text-sm rounded-lg min-h-[44px] gap-2',
        /** Large: prominent call-to-actions */
        lg: 'h-13 px-7 py-3 text-base rounded-xl min-h-[48px] gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

/**
 * Props for Button component
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * Enable GSAP-based magnetic hover pull effect
   * @default false
   */
  magnetic?: boolean;
  /**
   * Data attribute to enable magnetic effect
   */
  'data-magnetic'?: boolean | string;
  /**
   * Magnetic pull strength multiplier (0 to 1)
   * @default 0.3
   */
  magneticStrength?: number;
  /**
   * Magnetic pull effect radius in pixels
   * @default 100
   */
  magneticRadius?: number;
  /**
   * Show loading state with animated circuit spinner
   * @default false
   */
  isLoading?: boolean;
  /**
   * Custom loading text to display when isLoading is true
   */
  loadingText?: string;
  /**
   * Left icon or visual element
   */
  leftIcon?: ReactNode;
  /**
   * Right icon or visual element
   */
  rightIcon?: ReactNode;
}

/**
 * Circuit-themed loading spinner
 */
function CircuitSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4 animate-spin text-current', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="4 4"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/**
 * Button Primitive Component
 *
 * Provides primary, secondary, and ghost variants styled with the PCB schematic
 * design system. Supports GSAP magnetic physics, custom cursor state transitions,
 * and circuit-border animations.
 *
 * @example
 * ```tsx
 * // Primary magnetic button
 * <Button magnetic leftIcon={<Zap className="w-4 h-4" />}>
 *   Deploy Node
 * </Button>
 *
 * // Secondary button with circuit border animation
 * <Button variant="secondary" size="lg">
 *   Inspect Schema
 * </Button>
 *
 * // Ghost button with loading state
 * <Button variant="ghost" isLoading loadingText="Connecting...">
 *   Handshake
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      magnetic = false,
      'data-magnetic': dataMagnetic,
      magneticStrength = 0.3,
      magneticRadius = 100,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const { setGrow, resetCursor } = useCursorState();

    const isMagneticEnabled =
      Boolean(magnetic || dataMagnetic) && !prefersReducedMotion && !disabled && !isLoading;

    // Handle magnetic physics via GSAP
    useEffect(() => {
      if (typeof window === 'undefined' || !isMagneticEnabled) return;

      const element = internalRef.current;
      if (!element) return;

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance < magneticRadius) {
          const pull = 1 - distance / magneticRadius;
          gsap.to(element, {
            x: deltaX * magneticStrength * pull,
            y: deltaY * magneticStrength * pull,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true,
          });
        } else {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true,
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true,
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
        gsap.killTweensOf(element);
      };
    }, [isMagneticEnabled, magneticRadius, magneticStrength]);

    // Handle cursor and hover interactions
    const handleMouseEnter = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !isLoading) {
          setGrow();
        }
        onMouseEnter?.(e);
      },
      [disabled, isLoading, setGrow, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        resetCursor();
        onMouseLeave?.(e);
      },
      [resetCursor, onMouseLeave]
    );

    // Merge forwarded ref and internal ref
    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    const isInteractiveDisabled = disabled || isLoading;

    return (
      <button
        ref={setRefs}
        type="button"
        disabled={isInteractiveDisabled}
        aria-busy={isLoading}
        aria-disabled={isInteractiveDisabled}
        data-magnetic={magnetic || dataMagnetic ? 'true' : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          // Circuit border animation for secondary variant
          variant === 'secondary' && 'circuit-border-animation',
          className
        )}
        {...props}
      >
        {/* Subtle hover sheen effect for primary button */}
        {variant === 'primary' && !prefersReducedMotion && (
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            aria-hidden="true"
          />
        )}

        {/* PCB Circuit Trace Corner Accents for secondary variant */}
        {variant === 'secondary' && (
          <>
            {/* Top-left solder pad */}
            <span
              className="border-copper/50 group-hover:border-copper pointer-events-none absolute top-0 left-0 h-1.5 w-1.5 border-t-2 border-l-2 transition-colors duration-300"
              aria-hidden="true"
            />
            {/* Top-right solder pad */}
            <span
              className="border-copper/50 group-hover:border-copper pointer-events-none absolute top-0 right-0 h-1.5 w-1.5 border-t-2 border-r-2 transition-colors duration-300"
              aria-hidden="true"
            />
            {/* Bottom-left solder pad */}
            <span
              className="border-copper/50 group-hover:border-copper pointer-events-none absolute bottom-0 left-0 h-1.5 w-1.5 border-b-2 border-l-2 transition-colors duration-300"
              aria-hidden="true"
            />
            {/* Bottom-right solder pad */}
            <span
              className="border-copper/50 group-hover:border-copper pointer-events-none absolute right-0 bottom-0 h-1.5 w-1.5 border-r-2 border-b-2 transition-colors duration-300"
              aria-hidden="true"
            />
            {/* Ambient circuit glow overlay */}
            <span
              className="bg-copper/5 pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </>
        )}

        {/* Loading Spinner */}
        {isLoading && <CircuitSpinner className={loadingText || children ? 'mr-1.5' : ''} />}

        {/* Left Icon (hidden during full loading if no loading text) */}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        )}

        {/* Button Content / Label */}
        <span className="inline-flex items-center justify-center truncate">
          {isLoading && loadingText ? loadingText : children}
        </span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
