'use client';

import { motion } from 'framer-motion';
import type { Skill } from '@/types/skill';
import { useAppStore } from '@/stores/app-store';

interface SkillNodeProps {
  skill: Skill;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (skillId: string | null) => void;
  onClick: (skill: Skill) => void;
  index: number;
  isMobile?: boolean;
}

export type { SkillNodeProps };

/**
 * Individual skill node component for the network topology graph
 * Renders as an interactive SVG circle with color-coding by proficiency level
 */
export function SkillNode({
  skill,
  isHighlighted,
  isDimmed,
  onHover,
  onClick,
  index,
  isMobile = false,
}: SkillNodeProps) {
  const setCursorState = useAppStore((state) => state.setCursorState);

  // Color mapping based on proficiency level (Req 15.3)
  const proficiencyColors = {
    proficient: '#10B981', // green
    intermediate: '#06B6D4', // cyan
    learning: '#F59E0B', // amber
  };

  const nodeColor = proficiencyColors[skill.proficiency];
  const nodeRadius = isMobile ? 10 : 12;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} - ${skill.proficiency} level`}
      onMouseEnter={() => {
        if (!isMobile) {
          onHover(skill.id);
          setCursorState('grow');
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          onHover(null);
          setCursorState('dot');
        }
      }}
      onClick={() => onClick(skill)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(skill);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow effect on hover/highlight */}
      {!isMobile && isHighlighted && (
        <motion.circle
          cx={skill.x}
          cy={skill.y}
          r={nodeRadius + 8}
          fill={nodeColor}
          opacity={0.3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ filter: 'blur(8px)' }}
        />
      )}

      {/* Main node circle */}
      <motion.circle
        cx={skill.x}
        cy={skill.y}
        r={nodeRadius}
        fill={nodeColor}
        stroke={isDimmed ? '#ffffff20' : '#ffffff'}
        strokeWidth={isHighlighted ? 2 : 1}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isDimmed ? 0.8 : isHighlighted ? 1.15 : 1,
          opacity: isDimmed ? 0.3 : 1,
        }}
        transition={{
          delay: isMobile ? 0 : index * 0.03,
          duration: isMobile ? 0.3 : 0.5,
          ease: 'backOut',
        }}
        style={{
          filter: !isMobile && isHighlighted ? `drop-shadow(0 0 8px ${nodeColor})` : 'none',
        }}
      />

      {/* Skill label */}
      <motion.text
        x={skill.x}
        y={skill.y + nodeRadius + (isMobile ? 12 : 14)}
        textAnchor="middle"
        fill={isDimmed ? '#6b7b72' : '#e8ede9'}
        fontSize={isMobile ? '8' : '10'}
        fontFamily="var(--font-mono)"
        fontWeight={isHighlighted ? 700 : 400}
        initial={{ opacity: 0 }}
        animate={{ opacity: isDimmed ? 0.4 : 1 }}
        transition={{
          delay: isMobile ? 0 : index * 0.03 + 0.2,
          duration: isMobile ? 0.2 : 0.4,
        }}
        pointerEvents="none"
      >
        {skill.name}
      </motion.text>

      {/* Focus ring for keyboard navigation */}
      <motion.circle
        cx={skill.x}
        cy={skill.y}
        r={nodeRadius + 4}
        fill="none"
        stroke="var(--color-copper)"
        strokeWidth={2}
        opacity={0}
        className="focus-ring"
        style={{ pointerEvents: 'none' }}
      />
    </g>
  );
}
