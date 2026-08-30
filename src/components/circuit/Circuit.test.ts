import { describe, it, expect } from 'vitest';
import { CircuitBoard, Trace, Node, DataFlow, ComponentSymbol, SYMBOL_PATHS } from './index';

describe('Circuit Animation Components', () => {
  it('should export CircuitBoard with displayName', () => {
    expect(CircuitBoard.displayName).toBe('CircuitBoard');
  });

  it('should export Trace with displayName', () => {
    expect(Trace.displayName).toBe('Trace');
  });

  it('should export Node with displayName', () => {
    expect(Node.displayName).toBe('Node');
  });

  it('should export DataFlow with displayName', () => {
    expect(DataFlow.displayName).toBe('DataFlow');
  });

  it('should export ComponentSymbol with displayName and predefined symbol paths', () => {
    expect(ComponentSymbol.displayName).toBe('ComponentSymbol');
    expect(SYMBOL_PATHS.resistor).toBeDefined();
    expect(SYMBOL_PATHS.capacitor).toBeDefined();
    expect(SYMBOL_PATHS.ic).toBeDefined();
    expect(SYMBOL_PATHS.ground).toBeDefined();
  });
});
