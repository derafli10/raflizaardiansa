import { describe, it, expect } from 'vitest';
import {
  Navbar,
  NavLink,
  ThemeToggle,
  AudioToggle,
  ScrollProgress,
  ProgressBar,
  SkipToContent,
  MobileMenu,
  NAV_ITEMS,
} from './index';

describe('Navigation Components', () => {
  it('should export Navbar and child components with displayNames', () => {
    expect(Navbar.displayName).toBe('Navbar');
    expect(NavLink.displayName).toBe('NavLink');
    expect(ThemeToggle.displayName).toBe('ThemeToggle');
    expect(AudioToggle.displayName).toBe('AudioToggle');
    expect(ScrollProgress.displayName).toBe('ScrollProgress');
    expect(ProgressBar.displayName).toBe('ScrollProgress');
    expect(SkipToContent.displayName).toBe('SkipToContent');
    expect(MobileMenu.displayName).toBe('MobileMenu');
  });

  it('should export 5 standard navigation items', () => {
    expect(NAV_ITEMS).toHaveLength(5);
    expect(NAV_ITEMS.map((item) => item.id)).toEqual([
      'hero',
      'about',
      'skills',
      'projects',
      'contact',
    ]);
  });
});
