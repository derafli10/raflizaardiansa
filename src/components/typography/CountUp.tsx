'use client';

import { useEffect, useRef, useState, useCallback, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  /** Target end number to count to. */
  end: number;
  /** Starting number. @default 0 */
  start?: number;
  /** Duration of counting animation in seconds. @default 2 */
  duration?: number;
  /** Delay before animation starts in seconds. @default 0 */
  delay?: number;
  /** Number of decimal places to show. @default 0 */
  decimals?: number;
  /** Prefix before the number (e.g. '+', '$'). @default '' */
  prefix?: string;
  /** Suffix after the number (e.g. '%', '+', 'ms', 'GHz'). @default '' */
  suffix?: string;
  /** Format number with commas for thousands. @default true */
  useGrouping?: boolean;
  /** HTML tag to render. @default 'span' */
  as?: ElementType;
  /** Enable ScrollTrigger on viewport entry. @default true */
  scrollTrigger?: boolean;
  /** ScrollTrigger start position. @default 'top 85%' */
  triggerStart?: string;
  /** GSAP easing. @default 'power2.out' */
  ease?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Callback fired when count-up completes. */
  onComplete?: () => void;
}

/**
 * Formats a numeric value with optional grouping and decimals.
 */
function formatNumber(value: number, decimals: number, useGrouping: boolean): string {
  const fixed = value.toFixed(decimals);
  if (!useGrouping) return fixed;

  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * CountUp — Numeric stat counter animation.
 *
 * Smoothly interpolates from a starting number to the target value over a
 * configured duration when triggered by ScrollTrigger.
 *
 * GPU-accelerated: only updates inner text node.
 * Accessible: instantly displays the formatted target number when `prefers-reduced-motion` is active.
 *
 * **Requirements: 9.3, 9.6**
 */
export function CountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  useGrouping = true,
  as: Tag = 'span',
  scrollTrigger = true,
  triggerStart = 'top 85%',
  ease = 'power2.out',
  className,
  onComplete,
}: CountUpProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState(() =>
    formatNumber(start, decimals, useGrouping)
  );

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const state = { val: start };

    gsap.to(state, {
      val: end,
      duration,
      delay,
      ease,
      onUpdate: () => {
        setAnimatedValue(formatNumber(state.val, decimals, useGrouping));
      },
      onComplete: () => {
        setAnimatedValue(formatNumber(end, decimals, useGrouping));
        onComplete?.();
      },
    });
  }, [end, start, duration, delay, decimals, useGrouping, ease, prefersReducedMotion, onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    if (scrollTrigger) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        once: true,
        onEnter: () => startAnimation(),
      });

      return () => trigger.kill();
    } else {
      startAnimation();
    }
  }, [scrollTrigger, triggerStart, prefersReducedMotion, startAnimation]);

  const displayValue = prefersReducedMotion
    ? formatNumber(end, decimals, useGrouping)
    : animatedValue;

  const fullText = `${prefix}${displayValue}${suffix}`;

  return (
    <Tag
      ref={containerRef}
      className={cn('inline-block font-mono tabular-nums', className)}
      aria-label={`${prefix}${formatNumber(end, decimals, useGrouping)}${suffix}`}
    >
      <span aria-hidden="true">{fullText}</span>
    </Tag>
  );
}

CountUp.displayName = 'CountUp';
