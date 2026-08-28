import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple className values using clsx and tailwind-merge.
 *
 * This utility ensures proper Tailwind CSS class precedence by merging
 * conflicting utility classes intelligently. Later classes override earlier ones.
 *
 * @param inputs - ClassValue arguments (strings, objects, arrays, etc.)
 * @returns Merged className string with proper Tailwind precedence
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // => 'px-4 py-2 bg-blue-500'
 *
 * // Conditional classes
 * cn('base-class', isActive && 'active-class')
 * // => 'base-class active-class' (when isActive is true)
 *
 * // Overriding with proper precedence
 * cn('px-4 py-2', 'px-6')
 * // => 'py-2 px-6' (px-6 overrides px-4)
 *
 * // Component usage
 * <Button className={cn('default-styles', props.className)} />
 * ```
 *
 * **Requirements: 20.10**
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
