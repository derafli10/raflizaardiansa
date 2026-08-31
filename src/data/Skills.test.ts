import { describe, it, expect } from 'vitest';
import {
  skills,
  getSkillById,
  getSkillsByCategory,
  getSkillsByProficiency,
  SKILL_CATEGORIES,
} from './index';

describe('Static Skills Data', () => {
  it('should contain a comprehensive set of engineering skills', () => {
    expect(skills.length).toBeGreaterThanOrEqual(15);
  });

  it('should cover all 4 skill categories with descriptive metadata', () => {
    const categories = ['networking', 'security', 'hardware', 'software'] as const;

    categories.forEach((cat) => {
      expect(SKILL_CATEGORIES[cat]).toBeDefined();
      expect(SKILL_CATEGORIES[cat].label).toBeTruthy();
      expect(SKILL_CATEGORIES[cat].description).toBeTruthy();

      const filtered = getSkillsByCategory(cat);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((s) => s.category === cat)).toBe(true);
    });
  });

  it('should have valid schema and graph coordinates on all skills', () => {
    skills.forEach((skill) => {
      expect(skill.id).toBeTruthy();
      expect(skill.name).toBeTruthy();
      expect(skill.category).toBeTruthy();
      expect(['proficient', 'intermediate', 'learning']).toContain(skill.proficiency);
      expect(skill.description).toBeTruthy();
      expect(typeof skill.x).toBe('number');
      expect(typeof skill.y).toBe('number');
      expect(Array.isArray(skill.connections)).toBe(true);
      expect(Array.isArray(skill.relatedProjects)).toBe(true);

      // Verify all connection IDs reference real skills
      skill.connections.forEach((connId) => {
        const target = getSkillById(connId);
        expect(target).toBeDefined();
      });
    });
  });

  it('should correctly filter skills by proficiency level', () => {
    const proficient = getSkillsByProficiency('proficient');
    expect(proficient.length).toBeGreaterThan(0);
    expect(proficient.every((s) => s.proficiency === 'proficient')).toBe(true);

    const intermediate = getSkillsByProficiency('intermediate');
    expect(intermediate.length).toBeGreaterThan(0);
    expect(intermediate.every((s) => s.proficiency === 'intermediate')).toBe(true);
  });
});
