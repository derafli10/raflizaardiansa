'use client';

import { ExternalLink } from 'lucide-react';
import { FaGithubSquare } from 'react-icons/fa';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { CountUp } from '@/components/typography/CountUp';
import { TopologyDiagram } from './TopologyDiagram';
import type { Project } from '@/types/project';
import { cn } from '@/lib/utils';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProjectModal Component
 *
 * Full-screen modal displaying detailed case study with PROBLEM → PROCESS → SOLUTION structure.
 * Includes quantitative metrics with CountUp animations and interactive topology diagrams.
 *
 * Requirements: 14.3, 14.4, 14.5, 14.6, 14.7, 14.8
 */
export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="space-y-8">
        {/* Header with project type and tags */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="tag" size="md">
              {project.type}
            </Badge>
            <span className="text-text-tertiary font-mono text-xs">Case Study</span>
          </div>

          <h1 className="font-display text-text-primary text-3xl leading-tight font-bold md:text-4xl">
            {project.name}
          </h1>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="skill" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Summary */}
        <p className="text-text-secondary text-lg leading-relaxed">{project.summary}</p>

        {/* Divider */}
        <div className="border-trace border-t" />

        {/* PROBLEM Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-signal-red/20 text-signal-red flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-lg font-bold">!</span>
            </div>
            <h2 className="font-display text-signal-red text-xl font-bold">Problem</h2>
          </div>
          <p className="text-text-secondary pl-11 leading-relaxed">{project.problem}</p>
        </section>

        {/* PROCESS Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-signal-cyan/20 text-signal-cyan flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-lg">⚙️</span>
            </div>
            <h2 className="font-display text-signal-cyan text-xl font-bold">Process</h2>
          </div>
          <p className="text-text-secondary pl-11 leading-relaxed">{project.process}</p>
        </section>

        {/* SOLUTION Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-signal-green/20 text-signal-green flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-lg">✓</span>
            </div>
            <h2 className="font-display text-signal-green text-xl font-bold">Solution</h2>
          </div>
          <p className="text-text-secondary pl-11 leading-relaxed">{project.solution}</p>
        </section>

        {/* Divider */}
        <div className="border-trace border-t" />

        {/* Metrics Section */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-display text-text-primary text-lg font-bold">
              Quantitative Impact
            </h3>
            <div
              className={cn(
                'grid gap-4',
                project.metrics.length === 2 && 'grid-cols-2',
                project.metrics.length === 3 && 'grid-cols-3',
                project.metrics.length >= 4 && 'grid-cols-2 md:grid-cols-4'
              )}
            >
              {project.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-substrate border-trace space-y-2 rounded-lg border p-4 text-center"
                >
                  <div className="font-display text-copper text-3xl font-bold">
                    <CountUp end={parseFloat(metric.value)} duration={2} delay={index * 0.1} />
                    {metric.unit && (
                      <span className="text-text-secondary ml-1 text-xl">{metric.unit}</span>
                    )}
                  </div>
                  <p className="text-text-tertiary font-mono text-xs tracking-wider uppercase">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Topology Diagram */}
        {project.topology && project.topology.length > 0 && (
          <TopologyDiagram nodes={project.topology} />
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex min-w-[200px] flex-1 items-center justify-center gap-2',
                'rounded-md px-6 py-3 font-mono font-semibold',
                'bg-copper text-substrate',
                'hover:bg-copper-bright hover:scale-[1.02]',
                'shadow-[0_0_15px_rgba(212,165,116,0.25)]',
                'transition-all duration-300'
              )}
            >
              <ExternalLink size={18} />
              View Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex min-w-[200px] flex-1 items-center justify-center gap-2',
                'rounded-md px-6 py-3 font-mono font-medium',
                'border-copper text-copper border-2',
                'hover:bg-copper/10',
                'transition-all duration-300'
              )}
            >
              <FaGithubSquare size={18} />
              View Source Code
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}
