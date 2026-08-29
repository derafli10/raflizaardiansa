'use client';

/**
 * Textarea Primitive Component
 *
 * Elite PCB-inspired form textarea component with copper glow focus rings,
 * error state handling, customizable rows, and strict accessibility compliance.
 *
 * @module components/ui/Textarea
 */

import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Header or top label text
   */
  label?: string;
  /**
   * Helper or hint text displayed below the textarea
   */
  helperText?: string;
  /**
   * Error message displayed below textarea, triggering error styling
   */
  error?: string;
  /**
   * Container wrapper className
   */
  wrapperClassName?: string;
}

/**
 * Textarea Component
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <Textarea label="Message (ACK payload)" placeholder="Type your message..." required />
 *
 * // Textarea with error
 * <Textarea
 *   label="Message"
 *   error="Message must be at least 10 characters"
 *   rows={5}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      error,
      className,
      wrapperClassName,
      disabled,
      required,
      rows = 4,
      placeholder,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const descriptionId = errorId || helperId;

    return (
      <div className={cn('relative w-full space-y-1.5 font-sans', wrapperClassName)}>
        {/* Label */}
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={textareaId}
              className={cn(
                'block font-mono text-xs font-medium tracking-wider transition-colors duration-200',
                error ? 'text-signal-red' : disabled ? 'text-text-tertiary' : 'text-text-secondary'
              )}
            >
              {label}
              {required && <span className="text-copper ml-1">*</span>}
            </label>
          </div>
        )}

        {/* Textarea Wrapper */}
        <div className="group relative">
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            disabled={disabled}
            required={required}
            rows={rows}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={descriptionId}
            aria-required={required}
            className={cn(
              // Layout & sizing (min 44px touch target)
              'min-h-[100px] w-full rounded-lg px-3.5 py-3 font-mono text-sm leading-relaxed',
              'bg-substrate-raised text-text-primary placeholder:text-text-tertiary/70',
              'border-trace resize-y border transition-all duration-200 outline-none',
              // Focus ring & copper glow
              'focus:border-copper focus:ring-copper focus:shadow-[0_0_15px_rgba(212,165,116,0.2)] focus:ring-1',
              // Error state
              error &&
                'border-signal-red/80 focus:border-signal-red focus:ring-signal-red focus:shadow-[0_0_15px_rgba(239,68,68,0.25)]',
              // Disabled state
              disabled && 'bg-substrate/50 cursor-not-allowed resize-none opacity-50',
              className
            )}
            {...props}
          />
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

Textarea.displayName = 'Textarea';
