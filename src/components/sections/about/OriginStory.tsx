'use client';

import { Terminal, Shield, Cpu, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OriginStoryProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * OriginStory — Narrative Engineering Journey Component.
 *
 * Articulates Rafli's multidisciplinary engineering background across
 * Computer Networks, Hardware/PCB design, Systems Programming, and Cyber Security.
 *
 * **Requirements: 13.1, 13.9, 13.10**
 */
export function OriginStory({ className }: OriginStoryProps) {
  return (
    <div
      className={cn(
        'text-text-secondary space-y-6 font-sans text-sm leading-relaxed sm:text-base',
        className
      )}
    >
      <div className="border-copper/60 relative space-y-4 border-l-2 pl-4 sm:pl-6">
        <p>
          My engineering journey began with a fascination for what happens beneath the glass: the
          unseen highway of copper traces, electrical impulses, and packet streams that power our
          interconnected world. I realized early on that modern digital resilience requires
          mastering the complete vertical stack—from bare-metal silicon to global network fabrics.
        </p>

        <p>
          Beginning with enterprise routing protocols and fiber termination during vocational
          studies, I expanded my domain into high-speed multi-layer PCB design, RTOS embedded
          firmware, Linux kernel internals, and eBPF-driven zero-trust threat architectures.
        </p>

        <p>
          Today, I operate at the convergence of{' '}
          <strong className="text-text-primary">hardware engineering</strong>,{' '}
          <strong className="text-text-primary">network topology design</strong>, and{' '}
          <strong className="text-text-primary">cyber security</strong>—building high-throughput,
          self-healing, and secure-by-design systems.
        </p>
      </div>

      {/* 4 Pillars Mini-Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
        <div className="border-trace/60 bg-substrate-raised/50 flex flex-col gap-1.5 rounded-xl border p-3 select-none">
          <Network className="text-copper h-4 w-4" />
          <span className="text-text-primary font-mono text-xs font-bold">Networking</span>
          <span className="text-text-tertiary font-mono text-[10px]">BGP · SDN · EVPN</span>
        </div>

        <div className="border-trace/60 bg-substrate-raised/50 flex flex-col gap-1.5 rounded-xl border p-3 select-none">
          <Shield className="text-signal-cyan h-4 w-4" />
          <span className="text-text-primary font-mono text-xs font-bold">Cyber Security</span>
          <span className="text-text-tertiary font-mono text-[10px]">eBPF · SIEM · Zero-Trust</span>
        </div>

        <div className="border-trace/60 bg-substrate-raised/50 flex flex-col gap-1.5 rounded-xl border p-3 select-none">
          <Cpu className="text-copper-bright h-4 w-4" />
          <span className="text-text-primary font-mono text-xs font-bold">Hardware</span>
          <span className="text-text-tertiary font-mono text-[10px]">KiCad PCB · STM32</span>
        </div>

        <div className="border-trace/60 bg-substrate-raised/50 flex flex-col gap-1.5 rounded-xl border p-3 select-none">
          <Terminal className="text-signal-green h-4 w-4" />
          <span className="text-text-primary font-mono text-xs font-bold">Systems</span>
          <span className="text-text-tertiary font-mono text-[10px]">C++ · Rust · Linux</span>
        </div>
      </div>
    </div>
  );
}

OriginStory.displayName = 'OriginStory';
