'use client';

/**
 * Input Primitive Component
 *
 * Elite PCB-inspired form input component featuring floating labels,
 * copper focus glow rings, error state handling, icon support,
 * and strict accessibility compliance (WCAG 2.1 AA, min 44x44px touch target).
 *
 * @module components/ui/Input
 */

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Floating or header label text
   */
  label?: string;
  /**
   * Helper or hint text displayed below the input
   */
  helperText?: string;
  /**
   * Error message displayed below input, triggering error styling
   */
  error?: string;
  /**
   * Left icon or visual element
   */
  leftIcon?: ReactNode;
  /**
   * Right icon or action element
   */
  rightIcon?: ReactNode;
  /**
   * Container wrapper className
   */
  wrapperClassName?: string;
}

/**
 * Input Component
 *
 * @example
 * ```tsx
 * // Basic input with floating label
 * <Input label="Full Name" placeholder="Jane Doe" required />
 *
 * // Input with icon and error
 * <Input
 *   label="Email Address"
 *   type="email"
 *   leftIcon={<Mail className="w-4 h-4 text-copper" />}
 *   error="Please enter a valid email address"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className,
      wrapperClassName,
      disabled,
      required,
      placeholder,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const descriptionId = errorId || helperId;

    return (
      <div className={cn('relative w-full space-y-1.5 font-sans', wrapperClassName)}>
        {/* Floating / Top Label */}
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className={cn(
                'block font-mono text-xs font-medium tracking-wider transition-colors duration-200',
                error
                  ? 'text-signal-red'
                  : disabled
                    ? 'text-text-tertiary'
                    : 'text-text-secondary group-focus-within:text-copper'
              )}
            >
              {label}
              {required && <span className="text-copper ml-1">*</span>}
            </label>
          </div>
        )}

        {/* Input Wrapper */}
        <div className="group relative flex items-center">
          {/* Left Icon */}
          {leftIcon && (
            <div className="text-text-tertiary group-focus-within:text-copper pointer-events-none absolute left-3.5 flex items-center justify-center transition-colors">
              {leftIcon}
            </div>
          )}

          {/* Native Input Element */}
          <input
            ref={ref}
            id={inputId}
            name={name}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={descriptionId}
            aria-required={required}
            className={cn(
              // Layout & sizing (min 44px for touch targets)
              'h-11 min-h-[44px] w-full rounded-lg px-3.5 py-2.5 font-mono text-sm leading-normal',
              'bg-substrate-raised text-text-primary placeholder:text-text-tertiary/70',
              // Border & PCB aesthetics
              'border-trace border transition-all duration-200 outline-none',
              // Focus ring & copper glow
              'focus:border-copper focus:ring-copper focus:shadow-[0_0_15px_rgba(212,165,116,0.2)] focus:ring-1',
              // Error state
              error &&
                'border-signal-red/80 focus:border-signal-red focus:ring-signal-red focus:shadow-[0_0_15px_rgba(239,68,68,0.25)]',
              // Disabled state
              disabled && 'bg-substrate/50 cursor-not-allowed opacity-50',
              // Icon padding adjustments
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="text-text-tertiary group-focus-within:text-copper absolute right-3.5 flex items-center justify-center transition-colors">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message or Helper Text */}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-signal-red flex items-center gap-1 font-mono text-xs"
          >
            <span aria-hidden="true">⚠</span>
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-text-tertiary font-mono text-xs">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
