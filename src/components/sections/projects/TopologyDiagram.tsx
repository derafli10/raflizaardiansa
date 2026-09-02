'use client';

import { motion } from 'framer-motion';
import type { TopologyNode } from '@/types/project';

export interface TopologyDiagramProps {
  nodes: TopologyNode[];
  className?: string;
}

const NODE_TYPE_CONFIG = {
  client: { icon: '💻', color: '#06B6D4', label: 'Client' },
  server: { icon: '🖥️', color: '#22C55E', label: 'Server' },
  router: { icon: '🔀', color: '#D4A574', label: 'Router' },
  switch: { icon: '⚡', color: '#E8C49A', label: 'Switch' },
  firewall: { icon: '🛡️', color: '#EF4444', label: 'Firewall' },
  database: { icon: '💾', color: '#8B5CF6', label: 'Database' },
} as const;

/**
 * TopologyDiagram Component
 *
 * Interactive SVG network topology visualization for project case studies.
 * Renders nodes with connections showing network architecture.
 *
 * Requirements: 14.6, 14.7, 14.8
 */
export function TopologyDiagram({ nodes, className }: TopologyDiagramProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className={className}>
      <h4 className="font-display text-text-primary mb-4 text-lg font-bold">Network Topology</h4>

      <div className="bg-substrate border-trace rounded-lg border p-6 md:p-8">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="h-auto w-full"
          style={{ minHeight: '300px', maxHeight: '500px' }}
          role="img"
          aria-label="Network topology diagram"
        >
          {/* Grid background */}
          <defs>
            <pattern id="topology-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="var(--color-trace)"
                strokeWidth="0.15"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#topology-grid)" />

          {/* Connection lines */}
          <g className="connections">
            {nodes.map((node) =>
              node.connections.map((connectedId) => {
                const connectedNode = nodes.find((n) => n.id === connectedId);
                if (!connectedNode) return null;

                // Avoid duplicate lines
                if (node.id > connectedId) return null;

                return (
                  <motion.line
                    key={`${node.id}-${connectedId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={connectedNode.x}
                    y2={connectedNode.y}
                    stroke="var(--color-copper)"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                );
              })
            )}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map((node, index) => {
              const config = NODE_TYPE_CONFIG[node.type];

              return (
                <g key={node.id}>
                  {/* Node background */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    fill={config.color}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: 'backOut',
                    }}
                  />

                  {/* Glow effect */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="6"
                    fill={config.color}
                    opacity="0.2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      duration: 0.5,
                    }}
                    style={{ filter: 'blur(2px)' }}
                  />

                  {/* Label */}
                  <motion.text
                    x={node.x}
                    y={node.y + 7}
                    textAnchor="middle"
                    fill="var(--color-text-primary)"
                    fontSize="3"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                  >
                    {node.label}
                  </motion.text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {Object.entries(NODE_TYPE_CONFIG)
            .filter(([type]) => nodes.some((n) => n.type === type))
            .map(([type, config]) => (
              <div key={type} className="flex items-center gap-2 font-mono text-xs">
                <span className="text-base">{config.icon}</span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-text-secondary">{config.label}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
