import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug, getProjectsByType } from './index';

describe('Static Project Data', () => {
  it('should contain 6 diverse engineering projects', () => {
    expect(projects).toHaveLength(6);
  });

  it('should cover all 4 engineering domains', () => {
    const types = new Set(projects.map((p) => p.type));
    expect(types.has('network')).toBe(true);
    expect(types.has('security')).toBe(true);
    expect(types.has('hardware')).toBe(true);
    expect(types.has('software')).toBe(true);
  });

  it('should have complete case study fields on every project', () => {
    projects.forEach((project) => {
      expect(project.id).toBeTruthy();
      expect(project.slug).toBeTruthy();
      expect(project.name).toBeTruthy();
      expect(project.type).toBeTruthy();
      expect(project.thumbnail).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.summary).toBeTruthy();
      expect(project.problem).toBeTruthy();
      expect(project.process).toBeTruthy();
      expect(project.solution).toBeTruthy();
      expect(project.metrics.length).toBeGreaterThan(0);
      project.metrics.forEach((metric) => {
        expect(metric.label).toBeTruthy();
        expect(metric.value).toBeTruthy();
      });
      if (project.topology) {
        project.topology.forEach((node) => {
          expect(node.id).toBeTruthy();
          expect(node.label).toBeTruthy();
          expect(node.type).toBeTruthy();
          expect(typeof node.x).toBe('number');
          expect(typeof node.y).toBe('number');
        });
      }
    });
  });

  it('should correctly retrieve projects by slug and type', () => {
    const found = getProjectBySlug('sdn-enterprise-mesh');
    expect(found).toBeDefined();
    expect(found?.name).toBe('SDN Enterprise Mesh Architecture');

    const networkProjects = getProjectsByType('network');
    expect(networkProjects.length).toBeGreaterThanOrEqual(1);
    expect(networkProjects.every((p) => p.type === 'network')).toBe(true);
  });
});
