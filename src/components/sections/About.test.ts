import { describe, it, expect } from 'vitest';
import { About, OriginStory, EducationPath, Philosophy, Credentials } from './index';

describe('About Section Components', () => {
  it('should export About and child components with displayNames', () => {
    expect(About.displayName).toBe('About');
    expect(OriginStory.displayName).toBe('OriginStory');
    expect(EducationPath.displayName).toBe('EducationPath');
    expect(Philosophy.displayName).toBe('Philosophy');
    expect(Credentials.displayName).toBe('Credentials');
  });
});
