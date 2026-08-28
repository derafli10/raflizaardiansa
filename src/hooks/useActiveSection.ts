/**
 * useActiveSection Hook
 *
 * Detects which section is currently active in the viewport using
 * IntersectionObserver API. Updates nav-store with the active section ID.
 *
 * **Architecture:**
 * - Observes all major page sections (#hero, #about, #skills, #projects, #contact)
 * - Uses IntersectionObserver for efficient viewport detection
 * - Configurable threshold for when sections become active
 * - Updates Zustand nav-store for navigation highlighting
 * - SSR-safe with window checks
 * - Cleans up observers on unmount
 *
 * **Performance:**
 * - IntersectionObserver is more efficient than scroll listeners
 * - No layout thrashing or forced reflows
 * - Minimal DOM queries
 *
 * **Requirements: 6.4, 17.5, 22.7**
 *
 * @module hooks/useActiveSection
 */

'use client';

import { useEffect, useRef } from 'react';
import { useNavStore } from '@/stores/nav-store';

/**
 * Section IDs to observe
 */
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact'] as const;

/**
 * Type for section IDs
 */
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Hook options
 */
export interface UseActiveSectionOptions {
  /**
   * Intersection threshold (0-1) for when section becomes active
   * @default 0.5 - Section is active when 50% visible
   */
  threshold?: number;

  /**
   * Root margin for intersection observer
   * Useful for offsetting fixed headers
   * @default "-80px 0px 0px 0px" - Account for 80px navbar
   */
  rootMargin?: string;

  /**
   * Section IDs to observe
   * @default ['hero', 'about', 'skills', 'projects', 'contact']
   */
  sections?: readonly string[];
}

/**
 * useActiveSection hook
 *
 * Monitors which section is currently in view and updates navigation state.
 * Uses IntersectionObserver for efficient viewport detection.
 *
 * @param options - Configuration options
 *
 * @example
 * Basic usage in root layout or page
 *
 * @example
 * Custom threshold and root margin - useful for different header heights
 *
 * @example
 * Custom sections - observe different section IDs
 */
export function useActiveSection(options: UseActiveSectionOptions = {}): void {
  const { threshold = 0.5, rootMargin = '-80px 0px 0px 0px', sections = SECTION_IDS } = options;

  const setActiveSection = useNavStore((state) => state.setActiveSection);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    // Track which sections are currently intersecting
    const intersectingSections = new Map<string, number>();

    // Intersection callback
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting) {
          // Store intersection ratio for this section
          intersectingSections.set(sectionId, entry.intersectionRatio);
        } else {
          // Remove section when it's no longer intersecting
          intersectingSections.delete(sectionId);
        }
      });

      // Find section with highest intersection ratio
      let maxRatio = 0;
      let activeId = 'hero'; // Default fallback

      intersectingSections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      });

      // Update store if we have an active section
      if (maxRatio > 0) {
        setActiveSection(activeId);
      }
    };

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      rootMargin,
      threshold,
    });

    // Observe all sections
    const observer = observerRef.current;
    const elements: Element[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    });

    // Cleanup
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [threshold, rootMargin, sections, setActiveSection]);
}
