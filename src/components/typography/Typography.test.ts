import { describe, it, expect } from 'vitest';
import { SplitTextReveal, TypewriterText, ScrambleText, CountUp } from './index';

describe('Kinetic Typography Components', () => {
  it('should export SplitTextReveal with displayName', () => {
    expect(SplitTextReveal.displayName).toBe('SplitTextReveal');
  });

  it('should export TypewriterText with displayName', () => {
    expect(TypewriterText.displayName).toBe('TypewriterText');
  });

  it('should export ScrambleText with displayName', () => {
    expect(ScrambleText.displayName).toBe('ScrambleText');
  });

  it('should export CountUp with displayName', () => {
    expect(CountUp.displayName).toBe('CountUp');
  });
});
