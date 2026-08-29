'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TypewriterTextProps {
  /** Text content to type out. */
  children: string;
  /** HTML tag to render. @default 'span' */
  as?: ElementType;
  /** Delay between each character in seconds. @default 0.02 */
  charDelay?: number;
  /** Delay before the animation starts in seconds. @default 0 */
  delay?: number;
  /** Show a blinking cursor caret. @default true */
  showCursor?: boolean;
  /** Character to use as the cursor. @default '▌' */
  cursorChar?: string;
  /** Hide cursor after typing completes. @default true */
  hideCursorOnComplete?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Callback fired when typing completes. */
  onComplete?: () => void;
}

/**
 * TypewriterText — Character-by-character typewriter reveal.
 *
 * Renders text progressively one character at a time, simulating a terminal
 * or data-stream typing effect. Uses GSAP for precise per-frame timing
 * and includes an optional blinking cursor caret.
 *
 * GPU-accelerated: the component only mutates `textContent` (no layout thrash).
 * Accessible: instantly shows full text when `prefers-reduced-motion` is active.
 *
 * **Requirements: 9.4, 9.6**
 */
export function TypewriterText({
  children,
  as: Tag = 'span',
  charDelay = 0.02,
  delay = 0,
  showCursor = true,
  cursorChar = '▌',
  hideCursorOnComplete = true,
  className,
  onComplete,
}: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTypingDone, setIsTypingDone] = useState(false);

  const isComplete = prefersReducedMotion || isTypingDone;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Reduced motion: render immediately without animation
    if (prefersReducedMotion) {
      el.textContent = children;
      return;
    }

    el.textContent = '';

    const ctx = gsap.context(() => {
      const chars = children.split('');
      const totalDuration = chars.length * charDelay;

      gsap.to(
        { progress: 0 },
        {
          progress: 1,
          duration: totalDuration,
          delay,
          ease: `steps(${chars.length})`,
          onUpdate: function () {
            const charIndex = Math.round(this.progress() * chars.length);
            el.textContent = children.substring(0, charIndex);
          },
          onComplete: () => {
            el.textContent = children;
            setIsTypingDone(true);
            onComplete?.();
          },
        }
      );
    });

    return () => ctx.revert();
  }, [children, charDelay, delay, prefersReducedMotion, onComplete]);

  return (
    <Tag className={cn('inline', className)} aria-label={children}>
      <span ref={textRef} aria-hidden="true">
        {prefersReducedMotion ? children : null}
      </span>
      {showCursor && (!hideCursorOnComplete || !isComplete) && (
        <span ref={cursorRef} className="text-copper animate-pulse" aria-hidden="true">
          {cursorChar}
        </span>
      )}
    </Tag>
  );
}

TypewriterText.displayName = 'TypewriterText';
