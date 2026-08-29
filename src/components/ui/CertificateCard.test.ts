import { describe, it, expect } from 'vitest';
import { CertificateCard } from './CertificateCard';

describe('CertificateCard Primitive', () => {
  it('should export CertificateCard with displayName', () => {
    expect(CertificateCard.displayName).toBe('CertificateCard');
  });
});
