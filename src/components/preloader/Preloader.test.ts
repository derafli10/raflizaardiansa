import { describe, it, expect } from 'vitest';
import { Preloader, CircuitAssembly, BOOT_PHASES, BOOT_TOTAL_DURATION } from './index';

describe('Preloader Components', () => {
  it('should export Preloader with displayName', () => {
    expect(Preloader.displayName).toBe('Preloader');
  });

  it('should export CircuitAssembly with displayName', () => {
    expect(CircuitAssembly.displayName).toBe('CircuitAssembly');
  });

  it('should define 6 boot phases totalling 3.5s', () => {
    expect(Object.keys(BOOT_PHASES)).toHaveLength(6);
    expect(BOOT_TOTAL_DURATION).toBe(3.5);

    // Phase timing validation
    expect(BOOT_PHASES.CIRCUIT_TRACES.start).toBe(0);
    expect(BOOT_PHASES.CIRCUIT_TRACES.duration).toBe(0.5);
    expect(BOOT_PHASES.LOGO_FORMATION.start).toBe(0.5);
    expect(BOOT_PHASES.PULSE.start).toBe(1.5);
    expect(BOOT_PHASES.PROGRESS_BAR.start).toBe(2.0);
    expect(BOOT_PHASES.SCALE_WIPE.start).toBe(2.5);
    expect(BOOT_PHASES.HERO_STAGGER.start).toBe(3.0);
  });
});
