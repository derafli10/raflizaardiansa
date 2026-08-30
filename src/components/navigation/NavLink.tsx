'use client';

import { forwardRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useMagneticElement } from '@/hooks/useMagneticElement';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target section ID (e.g. 'hero', 'about', 'skills', 'projects', 'contact') */
  href: string;
  /** Link display label */
  children: React.ReactNode;
  /** Whether this section is currently active */
  isActive?: boolean;
  /** Section step index prefix (e.g. '01', '02') */
  step?: string;
  /** Enable magnetic cursor pull effect @default true */
  magnetic?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click callback */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * NavLink — Circuit-Themed Section Navigation Link.
 *
 * Provides smooth section scrolling via Lenis, magnetic hover physics,
 * and an animated circuit trace underline with solder pad terminals.
 *
 * **Requirements: 17.1, 17.5, 17.6**
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { href, children, isActive = false, step, magnetic = true, className, onClick, ...props },
    ref
  ) => {
    const lenis = useLenis();
    const prefersReducedMotion = useReducedMotion();

    const magneticRef = useMagneticElement<HTMLAnchorElement>({
      strength: magnetic && !prefersReducedMotion ? 0.25 : 0,
      radius: 60,
    });

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);

      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          if (lenis) {
            lenis.scrollTo(targetElement, {
              offset: -80,
              duration: prefersReducedMotion ? 0 : 1.2,
            });
          } else {
            targetElement.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
            });
          }
        }
      }
    };

    return (
      <a
        ref={(el) => {
          (magneticRef as React.MutableRefObject<HTMLAnchorElement | null>).current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        href={href}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group relative inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs tracking-wider transition-colors duration-200 select-none',
          'focus-visible:ring-copper focus-visible:ring-offset-substrate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          isActive
            ? 'text-copper-bright font-semibold'
            : 'text-text-secondary hover:text-text-primary',
          className
        )}
        {...props}
      >
        {/* Step index prefix (e.g. "01") */}
        {step && (
          <span
            className={cn(
              'text-[10px] tracking-widest transition-colors duration-200',
              isActive ? 'text-copper' : 'text-text-tertiary group-hover:text-copper/80'
            )}
          >
            {step}
          </span>
        )}

        {/* Link Text */}
        <span>{children}</span>

        {/* Animated Circuit Underline Trace */}
        <span
          className={cn(
            'absolute right-3 bottom-0 left-3 h-[2px] origin-left transition-all duration-300',
            isActive
              ? 'bg-copper-bright scale-x-100 shadow-[0_0_8px_var(--color-copper)]'
              : 'bg-copper/60 scale-x-0 group-hover:scale-x-100'
          )}
          aria-hidden="true"
        />

        {/* Active Via Indicator Dot */}
        {isActive && (
          <span
            className="bg-signal-cyan shadow-signal-glow h-1 w-1 animate-pulse rounded-full"
            aria-hidden="true"
          />
        )}
      </a>
    );
  }
);

NavLink.displayName = 'NavLink';
