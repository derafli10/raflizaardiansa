'use client';

import { forwardRef } from 'react';
import { Container } from '@/components/layout/Container';
import { HeroStatement } from './hero/HeroStatement';
import { ScrollIndicator } from './hero/ScrollIndicator';
import { HeroCircuit } from './hero/HeroCircuit';
import { cn } from '@/lib/utils';

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero — Master Hero Section Component (Node 01: Origin Gateway).
 *
 * The primary viewport entry point of The Schematic Network portfolio.
 * - Occupies 100vh on all devices (`min-h-[100dvh]`)
 * - Renders interactive SVG circuit board substrate with animated signal pulses
 * - Displays primary name heading, role typewriter, and engineering tagline
 * - Features pulsing bottom scroll indicator connecting into Section 02 (About).
 *
 * **Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8**
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Introduction and Overview"
      className={cn(
        'relative flex min-h-[100dvh] min-h-screen w-full flex-col items-center justify-between overflow-hidden',
        'pt-20 pb-10 sm:pt-24 sm:pb-12',
        'bg-substrate select-none',
        className
      )}
      {...props}
    >
      {/* Background Animated PCB Circuit Board Substrate */}
      <HeroCircuit className="z-0 opacity-40" />

      {/* Ambient Copper Lighting Glows */}
      <div
        className="bg-copper/10 pointer-events-none absolute top-1/4 left-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="bg-signal-cyan/5 pointer-events-none absolute right-1/4 bottom-1/4 h-[250px] w-[400px] rounded-full blur-[100px]"
        aria-hidden="true"
      />

      {/* Main Hero Content */}
      <Container className="relative z-10 my-auto flex w-full items-center justify-center py-6 sm:py-8">
        <HeroStatement />
      </Container>

      {/* Bottom Scroll Indicator Cue leading to About Section */}
      <div className="relative z-10 flex w-full justify-center pb-2">
        <ScrollIndicator targetId="about" />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
