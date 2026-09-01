'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Skill } from '@/types/skill';
import { SkillNode } from './SkillNode';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SkillGraphProps {
  skills: Skill[];
  onSkillClick: (skill: Skill) => void;
}

export type { SkillGraphProps };

/**
 * Interactive SVG network graph visualization of skills
 * Features color-coded nodes, connection lines, and hover interactions
 * Responsive: Simplifies on mobile for performance (Req 15.7, 27.1, 27.2, 27.8)
 */
export function SkillGraph({ skills, onSkillClick }: SkillGraphProps) {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get connected skill IDs for hover highlighting
  const getConnectedSkills = (skillId: string): Set<string> => {
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) return new Set();
    return new Set([skillId, ...skill.connections]);
  };

  const connectedSkills = hoveredSkillId ? getConnectedSkills(hoveredSkillId) : new Set();

  // Entrance animation with ScrollTrigger
  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: svgRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Lines fade in first (skip on mobile for performance)
          if (!isMobile) {
            gsap.fromTo(
              '.skill-connection',
              { opacity: 0, strokeDashoffset: 100 },
              {
                opacity: 0.3,
                strokeDashoffset: 0,
                duration: 1,
                stagger: 0.02,
                ease: 'power2.out',
              }
            );
          } else {
            // Instant reveal on mobile
            gsap.set('.skill-connection', { opacity: 0.3 });
          }
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  // Disable hover interactions on mobile
  const handleNodeHover = (skillId: string | null) => {
    if (!isMobile) {
      setHoveredSkillId(skillId);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full"
        style={{
          minHeight: isMobile ? '400px' : '600px',
          maxHeight: isMobile ? '500px' : '800px',
        }}
        role="img"
        aria-label="Interactive skills network graph"
      >
        {/* Grid pattern background */}
        <defs>
          <pattern id="skill-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="var(--color-trace)"
              strokeWidth="0.2"
              opacity={isMobile ? '0.2' : '0.3'}
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#skill-grid)" />

        {/* Connection lines between skills */}
        <g className="connections">
          {skills.map((skill) =>
            skill.connections.map((connectedId) => {
              const connectedSkill = skills.find((s) => s.id === connectedId);
              if (!connectedSkill) return null;

              // Avoid drawing duplicate lines
              if (skill.id > connectedId) return null;

              const isHighlighted =
                !isMobile && connectedSkills.has(skill.id) && connectedSkills.has(connectedId);
              const isDimmed = !isMobile && hoveredSkillId !== null && !isHighlighted;

              return (
                <motion.line
                  key={`${skill.id}-${connectedId}`}
                  x1={skill.x}
                  y1={skill.y}
                  x2={connectedSkill.x}
                  y2={connectedSkill.y}
                  stroke={isHighlighted ? 'var(--color-copper)' : 'var(--color-trace-active)'}
                  strokeWidth={isHighlighted ? 1.5 : isMobile ? 0.5 : 0.8}
                  strokeDasharray={isMobile ? '0' : '2,2'}
                  className="skill-connection"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isDimmed ? 0.1 : isHighlighted ? 0.8 : isMobile ? 0.25 : 0.3,
                  }}
                  transition={{ duration: isMobile ? 0 : 0.3 }}
                />
              );
            })
          )}
        </g>

        {/* Skill nodes */}
        <g className="nodes">
          {skills.map((skill, index) => (
            <SkillNode
              key={skill.id}
              skill={skill}
              isHighlighted={!isMobile && connectedSkills.has(skill.id)}
              isDimmed={!isMobile && hoveredSkillId !== null && !connectedSkills.has(skill.id)}
              onHover={handleNodeHover}
              onClick={onSkillClick}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </g>
      </svg>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-sm md:gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#10B981]" />
          <span className="text-text-secondary text-xs md:text-sm">Proficient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#06B6D4]" />
          <span className="text-text-secondary text-xs md:text-sm">Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
          <span className="text-text-secondary text-xs md:text-sm">Learning</span>
        </div>
      </div>

      {/* Interaction hint */}
      <p className="text-text-tertiary mt-4 text-center font-mono text-xs">
        {isMobile
          ? 'Tap nodes to view details'
          : 'Hover over nodes to highlight connections • Click to view details'}
      </p>
    </div>
  );
}
