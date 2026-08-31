'use client';

import { useState } from 'react';
import { ArrowRight, Terminal, Cpu } from 'lucide-react';
import { SplitTextReveal } from '@/components/typography/SplitTextReveal';
import { TypewriterText } from '@/components/typography/TypewriterText';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface HeroStatementProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * HeroStatement — Primary Identity & Engineering Statement Component.
 *
 * Displays:
 * - Telemetry hardware badge (`[NODE // 01] SYSTEM_ONLINE`)
 * - Primary name heading using `SplitTextReveal` ("Rafliza Ardiansa")
 * - Role statement using `TypewriterText` ("Network, Hardware, Software & Cyber Security")
 * - Tagline with interactive circuit pulse hover effect ("The Schematic Network")
 * - Direct CTA action triggers with smooth Lenis scrolling to Projects and Contact sections.
 *
 * **Requirements: 12.1, 12.2, 12.3, 11.1, 11.2**
 */
export function HeroStatement({ className }: HeroStatementProps) {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const [isPulseActive, setIsPulseActive] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, {
          offset: -60,
          duration: prefersReducedMotion ? 0 : 1.2,
        });
      } else {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  return (
    <div
      className={cn(
        'relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center',
        className
      )}
    >
      {/* 1. Hardware Status Telemetry Badge */}
      <div className="mb-6 inline-flex items-center gap-2">
        <Badge
          variant="outline"
          className="border-copper/50 bg-substrate/80 text-copper-bright px-3.5 py-1 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(212,165,116,0.15)] backdrop-blur-sm"
        >
          <span className="bg-signal-green shadow-signal-glow mr-1.5 h-2 w-2 animate-pulse rounded-full" />
          SYSTEM_ONLINE // NODE_01
        </Badge>
      </div>

      {/* 2. Primary Heading: SplitText Name */}
      <h1 className="font-display text-text-primary mb-4 text-4xl leading-[1.08] font-extrabold tracking-tight select-none sm:text-6xl md:text-7xl lg:text-8xl">
        <SplitTextReveal
          splitBy="words"
          stagger={0.09}
          duration={0.7}
          direction="up"
          fragmentClassName="from-copper-bright via-text-primary to-copper inline-block bg-gradient-to-r bg-clip-text text-transparent"
        >
          Rafliza Ardiansa
        </SplitTextReveal>
      </h1>

      {/* 3. Role Statement: Typewriter Animation */}
      <div className="text-copper mb-6 flex min-h-[32px] items-center justify-center font-mono text-sm font-medium tracking-wider sm:text-lg md:text-xl">
        <Cpu className="text-signal-cyan mr-2.5 h-4 w-4 shrink-0 animate-pulse" />
        <TypewriterText
          charDelay={0.03}
          delay={0.6}
          showCursor
          cursorChar="▌"
          className="text-signal-cyan font-semibold"
        >
          Network, Hardware, Software & Cyber Security
        </TypewriterText>
      </div>

      {/* 4. Interactive Tagline with Circuit Pulse Trigger */}
      <div
        onMouseEnter={() => setIsPulseActive(true)}
        onMouseLeave={() => setIsPulseActive(false)}
        className={cn(
          'relative mb-8 max-w-2xl cursor-pointer rounded-2xl border p-4 transition-all duration-300 select-none sm:p-5',
          isPulseActive
            ? 'border-copper bg-copper/10 shadow-[0_0_30px_rgba(212,165,116,0.25)]'
            : 'border-trace/60 bg-substrate-raised/40 hover:border-copper/60'
        )}
      >
        {/* Solder Corner Pads */}
        <span className="border-copper absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2" />
        <span className="border-copper absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2" />
        <span className="border-copper absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2" />
        <span className="border-copper absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2" />

        <p className="text-text-secondary font-sans text-sm leading-relaxed font-normal sm:text-base">
          <span className="text-copper-bright mb-1 block font-mono font-bold tracking-wider uppercase">
            The Schematic Network
          </span>
          Engineering the invisible infrastructure that keeps the world connected.
        </p>
      </div>

      {/* 5. Direct Call-to-Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          onClick={() => scrollToSection('projects')}
          className="shadow-copper-glow font-mono text-xs tracking-wider uppercase sm:text-sm"
        >
          Explore Architecture
        </Button>

        <Button
          variant="secondary"
          size="lg"
          rightIcon={<Terminal className="h-4 w-4" />}
          onClick={() => scrollToSection('contact')}
          className="border-trace hover:border-copper font-mono text-xs tracking-wider uppercase sm:text-sm"
        >
          Initialize Handshake
        </Button>
      </div>

      {/* 6. Hardware Specifications Telemetry Strip */}
      <div className="text-text-tertiary mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] tracking-widest select-none">
        <span className="flex items-center gap-1.5">
          <span className="bg-signal-cyan h-1.5 w-1.5 rounded-full" />
          TOPOLOGY: MESH
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-signal-green h-1.5 w-1.5 rounded-full" />
          SECURITY: ZERO-TRUST
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-copper h-1.5 w-1.5 rounded-full" />
          LATENCY: SUB-50MS
        </span>
      </div>
    </div>
  );
}

HeroStatement.displayName = 'HeroStatement';
