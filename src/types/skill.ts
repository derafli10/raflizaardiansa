/**
 * Skill-related type definitions for The Schematic Network portfolio
 * @module types/skill
 */

/**
 * Skill category classification
 */
export type SkillCategory = 'networking' | 'hardware' | 'software' | 'security';

/**
 * Proficiency level for a skill
 */
export type ProficiencyLevel = 'proficient' | 'intermediate' | 'learning';

/**
 * Represents a technical skill with network topology positioning
 */
export interface Skill {
  /** Unique identifier for the skill */
  id: string;
  /** Display name of the skill */
  name: string;
  /** Category classification */
  category: SkillCategory;
  /** Proficiency level */
  proficiency: ProficiencyLevel;
  /** Detailed description of the skill */
  description: string;
  /** Array of related project IDs */
  relatedProjects: string[];
  /** Array of connected skill IDs for graph visualization */
  connections: string[];
  /** Horizontal position in graph (percentage) */
  x: number;
  /** Vertical position in graph (percentage) */
  y: number;
}
