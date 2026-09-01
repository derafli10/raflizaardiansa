'use client';

import { X, Network, FolderGit2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/data/projects';
import { getSkillById } from '@/data/skills';
import type { Skill, ProficiencyLevel } from '@/types/skill';
import { useLenis } from '@/hooks/useLenis';
import { cn } from '@/lib/utils';

export interface SkillDetailProps {
  /** The currently selected skill to display */
  skill: Skill | null;
  /** Callback fired when user closes the detail panel */
  onClose: () => void;
  /** Callback fired when user clicks a connected skill tag */
  onSelectConnectedSkill?: (skillId: string) => void;
  /** Additional CSS classes */
  className?: string;
}

const PROFICIENCY_CONFIG: Record<
  ProficiencyLevel,
  { label: string; color: string; badgeVariant: 'status' | 'skill' | 'tag' | 'outline' }
> = {
  proficient: {
    label: 'Proficient / Production-Ready',
    color: 'text-signal-green',
    badgeVariant: 'status',
  },
  intermediate: {
    label: 'Intermediate / Active Implementation',
    color: 'text-signal-cyan',
    badgeVariant: 'skill',
  },
  learning: {
    label: 'Continuous Learning / Research Focus',
    color: 'text-signal-amber',
    badgeVariant: 'outline',
  },
};

/**
 * SkillDetail — Interactive Telemetry Panel for Selected Skill.
 *
 * Displays deep technical context, connected nodes in the graph,
 * and associated production case studies.
 *
 * **Requirements: 15.5**
 */
export function SkillDetail({
  skill,
  onClose,
  onSelectConnectedSkill,
  className,
}: SkillDetailProps) {
  const lenis = useLenis();

  if (!skill) return null;

  const profConfig = PROFICIENCY_CONFIG[skill.proficiency] || PROFICIENCY_CONFIG.proficient;
  const relatedProjectList = projects.filter((p) => skill.relatedProjects.includes(p.id));

  const handleProjectClick = (_projectId: string) => {
    const target = document.getElementById('projects');
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -60, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={cn(
        'border-copper/80 bg-substrate-raised/95 relative space-y-5 rounded-2xl border p-5 font-sans backdrop-blur-xl transition-all select-none sm:p-6',
        'shadow-[0_0_40px_rgba(212,165,116,0.2)]',
        className
      )}
      role="region"
      aria-label={`Skill details for ${skill.name}`}
    >
      {/* Solder Corner Pads */}
      <span className="border-copper absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2" />
      <span className="border-copper absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2" />
      <span className="border-copper absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2" />
      <span className="border-copper absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2" />

      {/* Header Bar */}
      <div className="border-trace/60 flex items-start justify-between gap-4 border-b pb-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tag" className="font-mono text-[10px] uppercase">
              {skill.category}
            </Badge>

            <Badge
              variant={profConfig.badgeVariant}
              pulseDot={skill.proficiency === 'proficient'}
              className="font-mono text-[10px] uppercase"
            >
              {profConfig.label}
            </Badge>
          </div>

          <h3 className="font-display text-text-primary truncate text-lg font-bold tracking-tight sm:text-xl">
            {skill.name}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close skill details"
          className="border-trace text-text-secondary hover:text-copper hover:border-copper rounded-lg border p-1.5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed font-normal">{skill.description}</p>

      {/* Connected Nodes in Topology */}
      {skill.connections.length > 0 && (
        <div className="border-trace/40 space-y-2 border-t pt-2">
          <div className="text-text-tertiary flex items-center gap-1.5 font-mono text-xs uppercase">
            <Network className="text-copper h-3.5 w-3.5" />
            <span>Interconnected Node Mesh ({skill.connections.length})</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skill.connections.map((connId) => {
              const connectedSkill = getSkillById(connId);
              if (!connectedSkill) return null;

              return (
                <button
                  key={connId}
                  type="button"
                  onClick={() => onSelectConnectedSkill?.(connId)}
                  className="border-trace/60 bg-substrate text-text-secondary hover:text-copper-bright hover:border-copper cursor-pointer rounded-md border px-2.5 py-1 font-mono text-xs transition-colors"
                >
                  {connectedSkill.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Associated Projects */}
      {relatedProjectList.length > 0 && (
        <div className="border-trace/40 space-y-2 border-t pt-2">
          <div className="text-text-tertiary flex items-center gap-1.5 font-mono text-xs uppercase">
            <FolderGit2 className="text-signal-cyan h-3.5 w-3.5" />
            <span>Demonstrated in Projects</span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {relatedProjectList.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleProjectClick(project.id)}
                className="border-trace/60 bg-substrate/80 group/proj hover:border-copper flex items-center justify-between rounded-lg border p-2.5 text-left transition-all"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-copper block font-mono text-[10px] uppercase">
                    {project.type}
                  </span>
                  <span className="text-text-primary group-hover/proj:text-copper-bright block truncate font-sans text-xs font-bold">
                    {project.name}
                  </span>
                </div>
                <ArrowRight className="text-text-tertiary group-hover/proj:text-copper ml-2 h-3.5 w-3.5 shrink-0 transition-transform group-hover/proj:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

SkillDetail.displayName = 'SkillDetail';
