import { describe, it, expect } from 'vitest';
import { cardVariants } from './Card';

describe('Card Component & Variants', () => {
  it('should generate default variant classes correctly', () => {
    const classes = cardVariants();
    expect(classes).toContain('bg-substrate');
    expect(classes).toContain('border-trace');
    expect(classes).toContain('text-text-primary');
  });

  it('should generate elevated variant classes correctly', () => {
    const classes = cardVariants({ variant: 'elevated' });
    expect(classes).toContain('bg-substrate-raised');
    expect(classes).toContain('shadow-');
  });

  it('should generate interactive variant classes with tilt and hover effects', () => {
    const classes = cardVariants({ variant: 'interactive' });
    expect(classes).toContain('cursor-pointer');
    expect(classes).toContain('hover:border-copper');
    expect(classes).toContain('tilt-3d');
  });
});
