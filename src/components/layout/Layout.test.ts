import { describe, it, expect } from 'vitest';
import { Container } from './Container';
import { Grid, GridItem, gridVariants } from './Grid';

describe('Layout Components (Container & Grid)', () => {
  it('should export Container, Grid, and GridItem with display names', () => {
    expect(Container.displayName).toBe('Container');
    expect(Grid.displayName).toBe('Grid');
    expect(GridItem.displayName).toBe('GridItem');
  });

  it('should generate grid classes with responsive column scaling', () => {
    const col3 = gridVariants({ cols: 3 });
    expect(col3).toContain('grid-cols-1');
    expect(col3).toContain('sm:grid-cols-2');
    expect(col3).toContain('lg:grid-cols-3');

    const col4 = gridVariants({ cols: 4 });
    expect(col4).toContain('grid-cols-1');
    expect(col4).toContain('lg:grid-cols-4');
  });
});
