import { describe, it, expect } from 'vitest';
import { badgeVariants, Badge } from './Badge';
import { Tooltip } from './Tooltip';

describe('Badge & Tooltip Primitives', () => {
  it('should generate skill variant classes with signal-cyan', () => {
    const classes = badgeVariants({ variant: 'skill' });
    expect(classes).toContain('text-signal-cyan');
    expect(classes).toContain('border-signal-cyan');
  });

  it('should generate status variant classes with signal-green by default', () => {
    const classes = badgeVariants({ variant: 'status' });
    expect(classes).toContain('text-signal-green');
  });

  it('should generate tag variant classes with copper styling', () => {
    const classes = badgeVariants({ variant: 'tag' });
    expect(classes).toContain('text-copper');
    expect(classes).toContain('border-trace');
  });

  it('should export Badge and Tooltip components properly', () => {
    expect(Badge.displayName).toBe('Badge');
    expect(Tooltip.displayName).toBe('Tooltip');
  });
});
