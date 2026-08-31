import { describe, it, expect } from 'vitest';
import { Hero, HeroStatement, ScrollIndicator, HeroCircuit } from './index';

describe('Hero Section Components', () => {
  it('should export Hero and child components with displayNames', () => {
    expect(Hero.displayName).toBe('Hero');
    expect(HeroStatement.displayName).toBe('HeroStatement');
    expect(ScrollIndicator.displayName).toBe('ScrollIndicator');
    expect(HeroCircuit.displayName).toBe('HeroCircuit');
  });
});
