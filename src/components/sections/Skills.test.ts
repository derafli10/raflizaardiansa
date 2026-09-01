import { describe, it, expect } from 'vitest';
import { Skills, SkillCategoryTabs, SkillGraph, SkillNode, SkillDetail } from './index';

describe('Skills Section Components', () => {
  it('should export Skills and child components with displayNames', () => {
    expect(Skills.displayName).toBe('Skills');
    expect(SkillCategoryTabs.displayName).toBe('SkillCategoryTabs');
    expect(SkillGraph.displayName).toBe('SkillGraph');
    expect(SkillNode.displayName).toBe('SkillNode');
    expect(SkillDetail.displayName).toBe('SkillDetail');
  });
});
