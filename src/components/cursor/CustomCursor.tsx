'use client';

/**
 * Custom Cursor Component
 *
 * Elite PCB test-probe custom cursor with RAF-driven lerp smoothing,
 * GSAP state transitions (dot, grow, blend, view), touch device coarse-pointer
 * detection, and zero-overhead pointer-events: none isolation.
 *
 * @module components/cursor/CustomCursor
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '@/stores/app-store';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CustomCursor Component
 */
export function CustomCursor() {
  const cursorState = useAppStore((state) => state.cursorState);
  const prefersReducedMotion = useReducedMotion();

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  // Check for coarse pointer (touch devices / mobile)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(pointer: coarse)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  // RAF + Lerp mouse tracking
  useEffect(() => {
    if (typeof window === 'undefined' || isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = () => {
      const lerpFactor = prefersReducedMotion ? 1 : 0.25;
      currentX = lerp(currentX, mouseX, lerpFactor);
      currentY = lerp(currentY, mouseY, lerpFactor);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, isTouchDevice, prefersReducedMotion]);

  // GSAP State Transitions
  useEffect(() => {
    if (!cursorRef.current || isTouchDevice) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    const duration = prefersReducedMotion ? 0 : 0.25;

    switch (cursorState) {
      case 'grow':
        // Expanded 48px with semi-transparent copper fill (Links/Buttons)
        gsap.to(cursor, {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(212, 165, 116, 0.2)',
          borderColor: 'var(--color-copper)',
          mixBlendMode: 'normal',
          boxShadow: '0 0 15px rgba(212, 165, 116, 0.4)',
          duration,
          ease: 'power2.out',
        });
        if (label) {
          gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.15 });
        }
        break;

      case 'blend':
        // Expanded 64px with mix-blend-mode difference on text
        gsap.to(cursor, {
          width: 64,
          height: 64,
          backgroundColor: '#ffffff',
          borderColor: 'transparent',
          mixBlendMode: 'difference',
          boxShadow: 'none',
          duration,
          ease: 'power2.out',
        });
        if (label) {
          gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.15 });
        }
        break;

      case 'view':
        // Expanded 64px with "VIEW" label for project cards
        gsap.to(cursor, {
          width: 64,
          height: 64,
          backgroundColor: 'var(--color-copper)',
          borderColor: 'var(--color-copper-bright)',
          mixBlendMode: 'normal',
          boxShadow: '0 0 25px rgba(212, 165, 116, 0.5)',
          duration,
          ease: 'power2.out',
        });
        if (label) {
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.2, delay: 0.05 });
        }
        break;

      case 'dot':
      default:
        // Default 8px circle
        gsap.to(cursor, {
          width: 8,
          height: 8,
          backgroundColor: 'var(--color-copper)',
          borderColor: 'var(--color-copper-bright)',
          mixBlendMode: 'normal',
          boxShadow: '0 0 8px rgba(212, 165, 116, 0.6)',
          duration,
          ease: 'power2.out',
        });
        if (label) {
          gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.15 });
        }
        break;
    }
  }, [cursorState, isTouchDevice, prefersReducedMotion]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{ opacity: isVisible ? 1 : 0 }}
      className="z-cursor border-copper bg-copper text-substrate pointer-events-none fixed top-0 left-0 flex items-center justify-center rounded-full border transition-opacity duration-200"
    >
      <span
        ref={labelRef}
        className="font-mono text-[10px] font-bold tracking-wider opacity-0 select-none"
      >
        VIEW
      </span>
    </div>
  );
}

CustomCursor.displayName = 'CustomCursor';
