import { describe, it, expect } from 'vitest';
import { CustomCursor } from './CustomCursor';

describe('CustomCursor Component', () => {
  it('should export CustomCursor with displayName', () => {
    expect(CustomCursor.displayName).toBe('CustomCursor');
  });
});
