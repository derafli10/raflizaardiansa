'use client';

import { useEffect, useRef, useState, useCallback, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrambleTextProps {
  /** Target text to resolve to. */
  children: string;
  /** HTML tag to render. @default 'span' */
  as?: ElementType;
  /** Duration of scramble animation in seconds. @default 1.5 */
  duration?: number;
  /** Delay before animation starts in seconds. @default 0 */
  delay?: number;
  /** Character set used for scrambling. @default PCB/engineering charset */
  chars?: string;
  /** Enable ScrollTrigger to trigger on viewport entry. @default true */
  scrollTrigger?: boolean;
  /** ScrollTrigger start position. @default 'top 85%' */
  triggerStart?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Callback fired when scramble finishes. */
  onComplete?: () => void;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

/**
 * ScrambleText — Cyber / Schematic data unscrambler.
 *
 * Scrambles from randomized characters into resolved target text.
 * Uses high-performance frame iteration with hardware timing.
 *
 * GPU-accelerated: text mutated in-place with 0 layout thrashing.
 * Accessible: respects `prefers-reduced-motion` by displaying target string instantly.
 *
 * **Requirements: 9.5, 9.6**
 */
export function ScrambleText({
  children,
  as: Tag = 'span',
  duration = 1.5,
  delay = 0,
  chars = DEFAULT_CHARS,
  scrollTrigger = true,
  triggerStart = 'top 85%',
  className,
  onComplete,
}: ScrambleTextProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrambledText, setScrambledText] = useState('');

  const startScramble = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const targetLength = children.length;
    const charPool = chars.split('');
    const obj = { progress: 0 };

    gsap.to(obj, {
      progress: 1,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        const resolvedCount = Math.floor(obj.progress * targetLength);
        let result = '';

        for (let i = 0; i < targetLength; i++) {
          if (i < resolvedCount) {
            result += children[i];
          } else if (children[i] === ' ') {
            result += ' ';
          } else {
            const randIndex = Math.floor(Math.random() * charPool.length);
            result += charPool[randIndex];
          }
        }

        setScrambledText(result);
      },
      onComplete: () => {
        setScrambledText(children);
        onComplete?.();
      },
    });
  }, [children, chars, duration, delay, prefersReducedMotion, onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = elementRef.current;
    if (!el) return;

    if (scrollTrigger) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        once: true,
        onEnter: () => startScramble(),
      });

      return () => trigger.kill();
    } else {
      startScramble();
    }
  }, [scrollTrigger, triggerStart, prefersReducedMotion, startScramble]);

  const displayText = prefersReducedMotion ? children : scrambledText || '\u00A0';

  return (
    <Tag
      ref={elementRef}
      className={cn('inline-block font-mono select-none', className)}
      aria-label={children}
    >
      <span aria-hidden="true">{displayText}</span>
    </Tag>
  );
}

ScrambleText.displayName = 'ScrambleText';
