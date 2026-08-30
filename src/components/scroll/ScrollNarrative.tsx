'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useNavStore } from '@/stores/nav-store';
import { useLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import { CircuitPath } from './CircuitPath';
import { SectionNode } from './SectionNode';

export interface NarrativeSection {
  id: string;
  label: string;
}

export const DEFAULT_NARRATIVE_SECTIONS: NarrativeSection[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export interface ScrollNarrativeProps {
  /** Ordered list of sections to link on the narrative line */
  sections?: NarrativeSection[];
  /** Optional container element ID or ref to attach ScrollTrigger to */
  triggerTarget?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ScrollNarrative — Master Scroll-Driven Circuit Narrative System.
 *
 * Implements a persistent circuit backbone linking all 6 portfolio sections
 * (Hero, About, Skills, Projects, Experience, Contact). Synchronizes DrawSVG
 * trace illumination with scroll progress using GSAP ScrollTrigger (scrub: 1)
 * and updates global nav-store scroll progress.
 *
 * **Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8**
 */
export function ScrollNarrative({
  sections = DEFAULT_NARRATIVE_SECTIONS,
  className,
}: ScrollNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSection = useNavStore((state) => state.activeSection);
  const setActiveSection = useNavStore((state) => state.setActiveSection);
  const setScrollProgress = useNavStore((state) => state.setScrollProgress);
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  const handleSectionSelect = useCallback(
    (id: string) => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -40,
            duration: prefersReducedMotion ? 0 : 1.2,
          });
        } else {
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
        setActiveSection(id);
      }
    },
    [lenis, prefersReducedMotion, setActiveSection]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    const ctx = gsap.context(() => {
      const trace = document.querySelector('#scroll-narrative-trace');

      // Scroll-synchronized DrawSVG trace animation
      if (trace && !prefersReducedMotion) {
        gsap.fromTo(
          trace,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              onUpdate: (self) => {
                const progressPct = Math.round(self.progress * 100);
                setScrollProgress(progressPct);
              },
            },
          }
        );
      }

      // Per-section active state detection triggers
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveSection(section.id),
            onEnterBack: () => setActiveSection(section.id),
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [sections, prefersReducedMotion, setActiveSection, setScrollProgress]);

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <aside
      ref={containerRef}
      aria-label="Section Navigation Narrative"
      className={cn(
        'pointer-events-auto fixed top-1/2 left-6 hidden -translate-y-1/2 flex-col items-center gap-1 select-none lg:flex',
        'z-[1000]',
        className
      )}
    >
      {/* Background Track Circuit SVG */}
      <div className="absolute top-4 bottom-4 left-[11px] -z-10 w-1 opacity-60">
        <CircuitPath className="h-full w-full" />
      </div>

      {/* Narrative Section Milestone Nodes */}
      <nav className="flex flex-col gap-3">
        {sections.map((section, index) => {
          const isActive = section.id === activeSection;
          const isPassed = activeIndex !== -1 && index < activeIndex;

          return (
            <SectionNode
              key={section.id}
              id={section.id}
              index={index + 1}
              label={section.label}
              active={isActive}
              passed={isPassed}
              onSelect={handleSectionSelect}
            />
          );
        })}
      </nav>
    </aside>
  );
}

ScrollNarrative.displayName = 'ScrollNarrative';
