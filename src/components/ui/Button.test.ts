import { describe, it, expect } from 'vitest';
import { buttonVariants } from './Button';

describe('Button Component & Variants', () => {
  it('should generate primary variant classes by default', () => {
    const classes = buttonVariants();
    expect(classes).toContain('bg-copper');
    expect(classes).toContain('text-substrate');
    expect(classes).toContain('h-11'); // size md
  });

  it('should generate secondary variant classes correctly', () => {
    const classes = buttonVariants({ variant: 'secondary' });
    expect(classes).toContain('bg-substrate-raised');
    expect(classes).toContain('text-copper');
    expect(classes).toContain('border-trace');
  });

  it('should generate ghost variant classes correctly', () => {
    const classes = buttonVariants({ variant: 'ghost' });
    expect(classes).toContain('bg-transparent');
    expect(classes).toContain('text-text-secondary');
  });

  it('should apply size classes for sm, md, lg', () => {
    const sm = buttonVariants({ size: 'sm' });
    expect(sm).toContain('h-9');
    expect(sm).toContain('text-xs');

    const md = buttonVariants({ size: 'md' });
    expect(md).toContain('h-11');
    expect(md).toContain('text-sm');

    const lg = buttonVariants({ size: 'lg' });
    expect(lg).toContain('h-13');
    expect(lg).toContain('text-base');
  });

  it('should support fullWidth option', () => {
    const full = buttonVariants({ fullWidth: true });
    expect(full).toContain('w-full');

    const auto = buttonVariants({ fullWidth: false });
    expect(auto).toContain('w-auto');
  });

  it('should include copper focus glow styles for accessibility compliance (WCAG)', () => {
    const classes = buttonVariants();
    expect(classes).toContain('focus-visible:ring-copper');
    expect(classes).toContain('focus-visible:ring-2');
    expect(classes).toContain('focus-visible:ring-offset-substrate');
  });
});
