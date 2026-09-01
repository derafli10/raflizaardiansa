'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { useMagneticElement } from '@/hooks/useMagneticElement';
import { useTiltEffect } from '@/hooks/useTiltEffect';
import { useAppStore } from '@/stores/app-store';
import type { Project } from '@/types/project';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

const PROJECT_TYPE_CONFIG = {
  network: { label: 'Network', color: 'var(--color-copper)' },
  hardware: { label: 'Hardware', color: 'var(--color-copper-bright)' },
  software: { label: 'Software', color: 'var(--color-signal-green)' },
  security: { label: 'Security', color: 'var(--color-signal-cyan)' },
} as const;

/**
 * ProjectCard Component
 *
 * Interactive project showcase card with magnetic hover, 3D tilt effect,
 * lazy-loaded images, and responsive design.
 *
 * Requirements: 14.1, 14.2, 14.9, 14.10, 26.4, 27.4, 27.6
 */
export function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const magneticRef = useMagneticElement<HTMLDivElement>(0.2, 120);
  const tiltRef = useTiltEffect<HTMLDivElement>(8);
  const setCursorState = useAppStore((state) => state.setCursorState);

  const typeConfig = PROJECT_TYPE_CONFIG[project.type];

  const handleMouseEnter = () => {
    setCursorState('view');
  };

  const handleMouseLeave = () => {
    setCursorState('dot');
  };

  return (
    <motion.div
      ref={(el) => {
        // Combine refs
        if (el) {
          magneticRef.current = el;
          tiltRef.current = el;
        }
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-xl',
        'bg-substrate-raised border-trace border-2',
        'hover:border-copper transition-all duration-300',
        'hover:shadow-[0_0_40px_rgba(212,165,116,0.25)]'
      )}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Thumbnail with lazy loading */}
      <div className="bg-substrate relative aspect-video w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-trace border-t-copper h-8 w-8 animate-spin rounded-full border-2" />
          </div>
        )}
        <Image
          src={project.thumbnail}
          alt={`${project.name} project thumbnail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover transition-all duration-500',
            'group-hover:scale-105 group-hover:brightness-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dXWtBwADTAFZxvJYKgAAAABJRU5ErkJggg=="
        />

        {/* Gradient overlay */}
        <div className="from-substrate-raised via-substrate-raised/50 absolute inset-0 bg-gradient-to-t to-transparent opacity-60" />

        {/* Project type badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="tag" size="sm" className="bg-substrate-raised/80 backdrop-blur-sm">
            {typeConfig.label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Project name */}
        <h3 className="font-display text-text-primary group-hover:text-copper line-clamp-2 text-xl font-bold transition-colors">
          {project.name}
        </h3>

        {/* Summary */}
        <p className="text-text-secondary line-clamp-3 text-sm leading-relaxed">
          {project.summary}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="skill" size="sm">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="outline" size="sm">
              +{project.tags.length - 4}
            </Badge>
          )}
        </div>

        {/* View project indicator */}
        <div className="text-copper flex items-center gap-2 pt-2 font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
          <span>View Case Study</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      {/* Corner accents (PCB solder pads) */}
      <span className="border-copper absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="border-copper absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="border-copper absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="border-copper absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
