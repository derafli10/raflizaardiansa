import { describe, it, expect } from 'vitest';
import {
  ScrollNarrative,
  CircuitPath,
  SectionNode,
  DEFAULT_NARRATIVE_SECTIONS,
  DEFAULT_NARRATIVE_PATH,
} from './index';

describe('Scroll Narrative Components', () => {
  it('should export ScrollNarrative with displayName and 6 default sections', () => {
    expect(ScrollNarrative.displayName).toBe('ScrollNarrative');
    expect(DEFAULT_NARRATIVE_SECTIONS).toHaveLength(6);
    expect(DEFAULT_NARRATIVE_SECTIONS.map((s) => s.id)).toEqual([
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'contact',
    ]);
  });

  it('should export CircuitPath with displayName and default path', () => {
    expect(CircuitPath.displayName).toBe('CircuitPath');
    expect(DEFAULT_NARRATIVE_PATH).toContain('M 50 50');
  });

  it('should export SectionNode with displayName', () => {
    expect(SectionNode.displayName).toBe('SectionNode');
  });
});
