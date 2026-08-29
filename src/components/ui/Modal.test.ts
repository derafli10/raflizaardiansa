import { describe, it, expect } from 'vitest';
import { Skeleton, skeletonVariants } from './Skeleton';
import { Modal, ModalFooter } from './Modal';

describe('Modal & Skeleton Primitives', () => {
  it('should generate skeleton variant classes for shapes', () => {
    const lineClasses = skeletonVariants({ shape: 'line' });
    expect(lineClasses).toContain('h-4');

    const circleClasses = skeletonVariants({ shape: 'circle' });
    expect(circleClasses).toContain('rounded-full');

    const cardClasses = skeletonVariants({ shape: 'card' });
    expect(cardClasses).toContain('rounded-xl');
  });

  it('should export Modal, ModalFooter, and Skeleton components with display names', () => {
    expect(Skeleton.displayName).toBe('Skeleton');
    expect(ModalFooter.displayName).toBe('ModalFooter');
    expect(typeof Modal).toBe('function');
  });
});
