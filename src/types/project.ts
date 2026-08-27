/**
 * Project-related type definitions for The Schematic Network portfolio
 * @module types/project
 */

/**
 * Represents a portfolio project with detailed case study information
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Display name of the project */
  name: string;
  /** Project category */
  type: 'network' | 'hardware' | 'software' | 'security';
  /** Path to project thumbnail image */
  thumbnail: string;
  /** Array of technology tags used in the project */
  tags: string[];
  /** Brief project summary for card display */
  summary: string;
  /** Detailed problem statement */
  problem: string;
  /** Implementation process description */
  process: string;
  /** Solution outcome and results */
  solution: string;
  /** Quantitative project metrics */
  metrics: ProjectMetric[];
  /** Optional network topology diagram data */
  topology?: TopologyNode[];
  /** Optional live demo URL */
  demoUrl?: string;
  /** Optional source code repository URL */
  repoUrl?: string;
}

/**
 * Represents a quantitative metric demonstrating project success
 */
export interface ProjectMetric {
  /** Metric label/name */
  label: string;
  /** Metric value (can be numeric or text) */
  value: string;
  /** Optional unit of measurement */
  unit?: string;
}

/**
 * Represents a node in a network topology diagram
 */
export interface TopologyNode {
  /** Unique identifier for the node */
  id: string;
  /** Network device type */
  type: 'client' | 'server' | 'router' | 'switch' | 'firewall' | 'database';
  /** Display label for the node */
  label: string;
  /** Horizontal position in the topology (percentage) */
  x: number;
  /** Vertical position in the topology (percentage) */
  y: number;
  /** Array of connected node IDs */
  connections: string[];
}
