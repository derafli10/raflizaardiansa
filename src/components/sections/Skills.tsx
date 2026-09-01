'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { SectionHeader } from '@/components/layout/Section';
import { SkillGraph } from './skills/SkillGraph';
import { SkillDetail } from './skills/SkillDetail';
import { skills, getSkillById } from '@/data/skills';
import type { Skill } from '@/types/skill';

// export interface SkillsProps {
//   // Props can be added in the future if needed
// }

/**
 * Skills Section - Network Topology Visualization
 * Displays technical skills as an interactive graph with nodes and connections
 * Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.8, 15.9, 15.10
 */
export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const handleSelectConnectedSkill = (skillId: string) => {
    const skill = getSkillById(skillId);
    if (skill) {
      setSelectedSkill(skill);
    }
  };

  const handleCloseDetail = () => {
    setSelectedSkill(null);
  };

  return (
    <section
      id="skills"
      className="relative w-full py-16 sm:py-24 lg:py-28"
      aria-labelledby="skills-heading"
    >
      <Container>
        <SectionHeader
          align="center"
          title={
            <span id="skills-heading" className="text-copper">
              Technical Topology
            </span>
          }
          description="An interconnected network of engineering disciplines spanning infrastructure, security, hardware, and software systems."
        />

        {/* Skills Graph */}
        <div className="relative">
          {/* Decorative circuit traces */}
          <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0"
            >
              <defs>
                <linearGradient id="trace-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-copper)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--color-copper)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="50%"
                x2="10%"
                y2="50%"
                stroke="url(#trace-gradient)"
                strokeWidth="2"
              />
              <line
                x1="90%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="url(#trace-gradient)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Main Graph */}
          <div className="bg-substrate-raised border-trace relative z-10 rounded-lg border p-6 md:p-12">
            <SkillGraph skills={skills} onSkillClick={handleSkillClick} />
          </div>
        </div>

        {/* Skill Detail Panel - Slides in from right */}
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-8"
            >
              <SkillDetail
                skill={selectedSkill}
                onClose={handleCloseDetail}
                onSelectConnectedSkill={handleSelectConnectedSkill}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Overview */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              category: 'networking',
              label: 'Networking',
              icon: '🌐',
              count: skills.filter((s) => s.category === 'networking').length,
            },
            {
              category: 'security',
              label: 'Security',
              icon: '🔒',
              count: skills.filter((s) => s.category === 'security').length,
            },
            {
              category: 'hardware',
              label: 'Hardware',
              icon: '⚡',
              count: skills.filter((s) => s.category === 'hardware').length,
            },
            {
              category: 'software',
              label: 'Software',
              icon: '💻',
              count: skills.filter((s) => s.category === 'software').length,
            },
          ].map((cat) => (
            <div
              key={cat.category}
              className="bg-substrate-raised border-trace rounded-lg border p-6 text-center"
            >
              <div className="mb-2 text-3xl" aria-hidden="true">
                {cat.icon}
              </div>
              <h3 className="font-display text-text-primary mb-1 text-lg font-bold">{cat.label}</h3>
              <p className="text-text-secondary font-mono text-sm">
                {cat.count} {cat.count === 1 ? 'skill' : 'skills'}
              </p>
            </div>
          ))}
        </div>

        {/* Accessibility description */}
        <div className="sr-only">
          <p>
            Skills are organized as a network topology graph showing {skills.length} technical
            skills across four categories: networking, security, hardware, and software. Each skill
            node is color-coded by proficiency level: green for proficient, cyan for intermediate,
            and amber for learning. Lines connect related skills showing technological
            relationships.
          </p>
        </div>
      </Container>
    </section>
  );
}
