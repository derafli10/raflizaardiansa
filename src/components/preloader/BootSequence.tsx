'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

/**
 * Boot sequence phase timing constants (in seconds).
 * Total duration: 3.5s
 */
export const BOOT_PHASES = {
  /** Phase 1: Circuit traces draw from center outward */
  CIRCUIT_TRACES: { start: 0, duration: 0.5 },
  /** Phase 2: Logo IC chip forms from traces */
  LOGO_FORMATION: { start: 0.5, duration: 1.0 },
  /** Phase 3: Logo pulse + "INITIALIZING" text appears */
  PULSE: { start: 1.5, duration: 0.5 },
  /** Phase 4: Progress bar fills */
  PROGRESS_BAR: { start: 2.0, duration: 0.5 },
  /** Phase 5: Logo scales down + content wipe reveal */
  SCALE_WIPE: { start: 2.5, duration: 0.5 },
  /** Phase 6: Hero content staggers in */
  HERO_STAGGER: { start: 3.0, duration: 0.5 },
} as const;

export const BOOT_TOTAL_DURATION = 3.5;

export interface BootSequenceOptions {
  /** Container element ref to scope GSAP context */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Callback fired when full boot sequence completes */
  onComplete: () => void;
}

/**
 * BootSequence — GSAP Timeline Orchestrator for preloader.
 *
 * Creates and manages a master GSAP timeline with 6 sequential phases
 * that animate the CircuitAssembly logo and surrounding UI elements.
 * Uses DrawSVG for circuit trace animation and gsap.context() for cleanup.
 *
 * **Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**
 */
export function useBootSequence({ containerRef, onComplete }: BootSequenceOptions) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(DrawSVGPlugin);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      timelineRef.current = tl;

      // ── Phase 1 (0.0 – 0.5s): Circuit traces draw from center outward ──
      tl.fromTo(
        ['#logo-trace-top', '#logo-trace-bottom', '#logo-trace-left', '#logo-trace-right'],
        { drawSVG: '50% 50%' },
        {
          drawSVG: '0% 100%',
          duration: BOOT_PHASES.CIRCUIT_TRACES.duration,
          stagger: 0.06,
          ease: 'power2.out',
        },
        BOOT_PHASES.CIRCUIT_TRACES.start
      );

      // Diagonal traces fade/draw slightly after
      tl.fromTo(
        ['#logo-trace-tl', '#logo-trace-tr', '#logo-trace-bl', '#logo-trace-br'],
        { drawSVG: '50% 50%', opacity: 0 },
        {
          drawSVG: '0% 100%',
          opacity: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: 'power2.out',
        },
        0.15
      );

      // Terminal solder pads pop in
      tl.from(
        '.logo-terminals circle',
        {
          scale: 0,
          opacity: 0,
          transformOrigin: 'center center',
          duration: 0.3,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        },
        0.25
      );

      // ── Phase 2 (0.5 – 1.5s): Logo IC chip formation ──
      tl.from(
        '#logo-ic-body',
        {
          scale: 0,
          opacity: 0,
          transformOrigin: '60px 60px',
          duration: 0.5,
          ease: 'back.out(1.5)',
        },
        BOOT_PHASES.LOGO_FORMATION.start
      );

      // IC pins draw outward
      tl.fromTo(
        [
          '#logo-ic-pin-t1',
          '#logo-ic-pin-t2',
          '#logo-ic-pin-t3',
          '#logo-ic-pin-b1',
          '#logo-ic-pin-b2',
          '#logo-ic-pin-b3',
          '#logo-ic-pin-l1',
          '#logo-ic-pin-l2',
          '#logo-ic-pin-l3',
          '#logo-ic-pin-r1',
          '#logo-ic-pin-r2',
          '#logo-ic-pin-r3',
        ],
        { drawSVG: '0%' },
        {
          drawSVG: '100%',
          duration: 0.4,
          stagger: 0.025,
          ease: 'power2.out',
        },
        0.7
      );

      // Notch and die fade in
      tl.from(
        '#logo-ic-notch',
        { opacity: 0, scale: 0, transformOrigin: 'center', duration: 0.3, ease: 'back.out(2)' },
        1.1
      );
      tl.from(
        '#logo-ic-die',
        { opacity: 0, scale: 0, transformOrigin: 'center', duration: 0.3, ease: 'power2.out' },
        1.15
      );

      // ── Phase 3 (1.5 – 2.0s): Pulse + "INITIALIZING" text ──
      tl.to(
        '.preloader-logo-wrapper',
        {
          scale: 1.05,
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        BOOT_PHASES.PULSE.start
      );

      tl.from(
        '.preloader-status-text',
        {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.out',
        },
        1.6
      );

      // ── Phase 4 (2.0 – 2.5s): Progress bar fill ──
      tl.fromTo(
        '.preloader-progress-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: BOOT_PHASES.PROGRESS_BAR.duration,
          ease: 'power1.inOut',
        },
        BOOT_PHASES.PROGRESS_BAR.start
      );

      // ── Phase 5 (2.5 – 3.0s): Scale down logo + content wipe ──
      tl.to(
        '.preloader-logo-wrapper',
        {
          scale: 0.6,
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
        },
        BOOT_PHASES.SCALE_WIPE.start
      );

      tl.to(
        '.preloader-status-text',
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        2.5
      );

      tl.to(
        '.preloader-progress-bar',
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        2.55
      );

      // Content wipe: preloader container slides up
      tl.to(
        '.preloader-overlay',
        {
          yPercent: -100,
          duration: 0.5,
          ease: 'power3.inOut',
        },
        2.7
      );

      // ── Phase 6 (3.0 – 3.5s): Hero content stagger ──
      // This phase targets hero elements outside the preloader.
      // The parent Preloader handles `onComplete` to signal app-store.
    }, container);

    return () => {
      ctx.revert();
    };
  }, [containerRef, onComplete]);

  return timelineRef;
}
