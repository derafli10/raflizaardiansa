'use client';

import { forwardRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { OriginStory } from './about/OriginStory';
import { EducationPath } from './about/EducationPath';
import { Philosophy } from './about/Philosophy';
import { Credentials } from './about/Credentials';
import { cn } from '@/lib/utils';

export interface AboutProps extends React.HTMLAttributes<HTMLElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * About — Master About & Systems Background Section (Node 02: Architecture & Foundation).
 *
 * Implements:
 * - Origin story narrating trajectory across hardware, network, software & security
 * - Educational path (SMKN 1 Cikarang Selatan & IPB University D4 TRK)
 * - Engineering philosophy ("The best infrastructure is invisible")
 * - LinkedIn-style verified credentials card grid.
 *
 * **Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 13.10**
 */
export const About = forwardRef<HTMLElement, AboutProps>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      aria-label="About Rafliza Ardiansa"
      className={cn(
        'bg-substrate relative w-full overflow-hidden py-16 sm:py-24 lg:py-28',
        className
      )}
      {...props}
    >
      {/* Ambient Lighting Accents */}
      <div
        className="bg-copper/5 pointer-events-none absolute top-1/3 left-0 h-[350px] w-[500px] rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="bg-signal-cyan/5 pointer-events-none absolute right-0 bottom-10 h-[300px] w-[450px] rounded-full blur-[100px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 space-y-16 sm:space-y-20">
        <SectionHeader
          badge={
            <Badge
              variant="outline"
              className="border-copper/50 text-copper-bright font-mono text-xs tracking-widest uppercase"
            >
              <span className="bg-signal-cyan mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full" />
              NODE_02 // SYSTEM_ARCHITECT
            </Badge>
          }
          title="Background & Engineering Philosophy"
          description="Bridging bare-metal hardware, high-throughput network fabrics, and proactive zero-trust defense mechanisms."
        />

        {/* 2-Column Core Layout: Narrative & Philosophy on Left, Education on Right */}
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-12">
          {/* Left Column (7 cols): Origin Story & Philosophy Callout */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <h3 className="font-display text-text-primary mb-4 text-xl font-bold">
                The Vertical Stack Trajectory
              </h3>
              <OriginStory />
            </div>

            <Philosophy />
          </div>

          {/* Right Column (5 cols): Education History Timeline */}
          <div className="space-y-4 lg:col-span-5">
            <h3 className="font-display text-text-primary text-xl font-bold">
              Academic Foundations
            </h3>
            <EducationPath />
          </div>
        </div>

        {/* Full-width Credentials & Certifications Section */}
        <div className="border-trace/60 border-t pt-10 sm:pt-12">
          <Credentials />
        </div>
      </Container>
    </section>
  );
});

About.displayName = 'About';
