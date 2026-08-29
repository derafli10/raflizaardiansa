'use client';

import { useEffect, useRef, useCallback, type ElementType } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Split mode for text decomposition.
 * - `chars`: Split into individual characters (per-character reveal)
 * - `words`: Split into individual words (per-word reveal)
 * - `lines`: Split into wrapped lines (per-line reveal)
 */
type SplitMode = 'chars' | 'words' | 'lines';

/**
 * Animation direction for the reveal effect.
 * - `up`: Slide up from below
 * - `down`: Slide down from above
 * - `left`: Slide in from the right
 * - `right`: Slide in from the left
 * - `none`: Fade only, no positional movement
 */
type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface SplitTextRevealProps {
  /** Text content to animate. */
  children: string;
  /** HTML tag to render. @default 'div' */
  as?: ElementType;
  /** How to split the text. @default 'words' */
  splitBy?: SplitMode;
  /** Stagger delay between each element in seconds. @default 0.08 */
  stagger?: number;
  /** Animation duration for each element in seconds. @default 0.6 */
  duration?: number;
  /** Slide distance in pixels. @default 40 */
  distance?: number;
  /** Direction of the slide-in reveal. @default 'up' */
  direction?: RevealDirection;
  /** GSAP easing function. @default 'power3.out' */
  ease?: string;
  /** Delay before the animation starts in seconds. @default 0 */
  delay?: number;
  /** Enable ScrollTrigger for viewport-based reveals. @default true */
  scrollTrigger?: boolean;
  /** ScrollTrigger start position. @default 'top 85%' */
  triggerStart?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Callback fired when the reveal animation completes. */
  onComplete?: () => void;
}

/**
 * SplitTextReveal — Kinetic typography component.
 *
 * Decomposes text into chars, words, or lines and animates each fragment
 * into view with configurable stagger, direction, and easing. Uses
 * GSAP SplitText for zero-layout-shift splitting and ScrollTrigger for
 * viewport-gated playback.
 *
 * GPU-accelerated: all transforms use `translate3d` + `opacity`.
 * Accessible: instantly shows text when `prefers-reduced-motion` is active.
 *
 * **Requirements: 9.1, 9.2, 9.6**
 */
export function SplitTextReveal({
  children,
  as: Tag = 'div',
  splitBy = 'words',
  stagger = 0.08,
  duration = 0.6,
  distance = 40,
  direction = 'up',
  ease = 'power3.out',
  delay = 0,
  scrollTrigger = true,
  triggerStart = 'top 85%',
  className,
  onComplete,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const getTransformProps = useCallback((dir: RevealDirection, dist: number) => {
    switch (dir) {
      case 'up':
        return { y: dist };
      case 'down':
        return { y: -dist };
      case 'left':
        return { x: dist };
      case 'right':
        return { x: -dist };
      case 'none':
      default:
        return {};
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reduced motion: show text immediately, no animation
    if (prefersReducedMotion) {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      return;
    }

    // GSAP context for scoped cleanup
    const ctx = gsap.context(() => {
      const split = SplitText.create(el, {
        type: splitBy,
        mask: splitBy === 'lines' ? 'lines' : undefined,
      });

      const targets =
        splitBy === 'chars' ? split.chars : splitBy === 'lines' ? split.lines : split.words;

      if (!targets || targets.length === 0) return;

      const transformFrom = getTransformProps(direction, distance);

      const tl = gsap.timeline({
        scrollTrigger: scrollTrigger
          ? {
              trigger: el,
              start: triggerStart,
              toggleActions: 'play none none none',
              once: true,
            }
          : undefined,
        delay,
        onComplete,
      });

      // Make container visible right before animating
      tl.set(el, { visibility: 'visible' });

      tl.from(targets, {
        opacity: 0,
        ...transformFrom,
        duration,
        stagger,
        ease,
        force3D: true,
      });
    }, el);

    return () => ctx.revert();
  }, [
    children,
    splitBy,
    stagger,
    duration,
    distance,
    direction,
    ease,
    delay,
    scrollTrigger,
    triggerStart,
    prefersReducedMotion,
    getTransformProps,
    onComplete,
  ]);

  return (
    <Tag
      ref={containerRef}
      className={cn(prefersReducedMotion ? 'visible' : 'invisible', className)}
      aria-label={children}
    >
      {children}
    </Tag>
  );
}

SplitTextReveal.displayName = 'SplitTextReveal';
