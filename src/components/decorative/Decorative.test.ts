import { describe, it, expect } from 'vitest';
import { GridPattern } from './GridPattern';
import { CircuitTrace } from './CircuitTrace';
import { SchematicPattern } from './SchematicPattern';

describe('Decorative Components', () => {
  it('should export GridPattern, CircuitTrace, and SchematicPattern with display names', () => {
    expect(GridPattern.displayName).toBe('GridPattern');
    expect(CircuitTrace.displayName).toBe('CircuitTrace');
    expect(SchematicPattern.displayName).toBe('SchematicPattern');
  });
});
