'use client';

import { Quote, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PhilosophyProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Philosophy — Engineering Core Creed & Philosophy Component.
 *
 * Articulates the core portfolio philosophy: "The best infrastructure is invisible."
 *
 * **Requirements: 13.4**
 */
export function Philosophy({ className }: PhilosophyProps) {
  return (
    <div
      className={cn(
        'border-copper/80 bg-substrate-raised/80 relative rounded-2xl border p-6 sm:p-8',
        'overflow-hidden shadow-[0_0_35px_rgba(212,165,116,0.15)] select-none',
        className
      )}
    >
      {/* Decorative Blueprint Background Grid Accent */}
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[circle_at_top_right,rgba(212,165,116,0.1),transparent_60%]"
        aria-hidden="true"
      />

      {/* Solder Corner Accents */}
      <span className="border-copper absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2" />
      <span className="border-copper absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2" />
      <span className="border-copper absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2" />
      <span className="border-copper absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Quote Header */}
        <div className="flex items-center justify-between">
          <div className="text-copper flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
            <Sparkles className="text-copper-bright h-4 w-4" />
            <span>Engineering Axiom</span>
          </div>

          <Quote className="text-copper/40 h-6 w-6 rotate-180" />
        </div>

        {/* Primary Quote Statement */}
        <blockquote className="font-display text-text-primary text-xl leading-snug font-extrabold tracking-tight sm:text-2xl md:text-3xl">
          &ldquo;The best infrastructure is invisible.&rdquo;
        </blockquote>

        {/* Elaboration Narrative */}
        <p className="text-text-secondary font-sans text-sm leading-relaxed font-normal sm:text-base">
          True engineering mastery isn&apos;t about adding complexity—it is about orchestrating
          silicon, packets, and kernel algorithms so seamlessly that users never think about the
          power grid, the fiber transceivers, or the threat monitors keeping them secure. When
          resilience is absolute, technology fades into pure capability.
        </p>

        {/* Ground Terminal Signature */}
        <div className="border-trace/50 text-text-tertiary flex items-center justify-between border-t pt-2 font-mono text-xs">
          <span>PHILOSOPHY // 0x01</span>
          <span className="text-copper font-bold">⏚ CHASSIS_GROUND</span>
        </div>
      </div>
    </div>
  );
}

Philosophy.displayName = 'Philosophy';
