'use client';

import { useState } from 'react';
import { Container } from '@/components/layout';
import { SectionHeader } from '@/components/layout/Section';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectModal } from './projects/ProjectModal';
import { projects } from '@/data/projects';
import type { Project } from '@/types/project';

// export interface ProjectsProps {
//   // Props can be added in the future if needed
// }

// /**
//  * Projects Section - Portfolio Case Studies Grid
//  * Displays engineering projects with magnetic hover effects and 3D tilt
//  * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9, 14.10, 26.4, 27.4, 27.6
//  */
export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="projects"
      className="relative w-full py-16 sm:py-24 lg:py-28"
      aria-labelledby="projects-heading"
    >
      <Container>
        <SectionHeader
          align="center"
          title={
            <span id="projects-heading" className="text-copper">
              Engineering Portfolio
            </span>
          }
          description="Production-grade network infrastructure, embedded systems, and security implementations delivering measurable impact."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
              index={index}
            />
          ))}
        </div>

        {/* Empty state if no projects */}
        {projects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-text-secondary font-mono">No projects available. Check back soon.</p>
          </div>
        )}

        {/* Accessibility description */}
        <div className="sr-only">
          <p>
            Portfolio showcasing {projects.length} engineering projects across network
            infrastructure, hardware, software, and cyber security domains. Each project includes
            detailed case studies with problem statements, implementation processes, solutions, and
            quantitative metrics.
          </p>
        </div>
      </Container>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
