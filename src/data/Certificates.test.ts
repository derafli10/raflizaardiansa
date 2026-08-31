import { describe, it, expect } from 'vitest';
import { certificates, getCertificateById, getActiveCertificates } from './index';

describe('Static Certificate Data', () => {
  it('should contain a collection of verified professional certificates', () => {
    expect(certificates.length).toBeGreaterThanOrEqual(5);
  });

  it('should have valid schema and credential IDs on all certificates', () => {
    certificates.forEach((cert) => {
      expect(cert.id).toBeTruthy();
      expect(cert.title).toBeTruthy();
      expect(cert.organization).toBeTruthy();
      expect(cert.issueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(cert.credentialId).toBeTruthy();
      expect(cert.verificationUrl).toMatch(/^https?:\/\//);

      if (cert.expiryDate) {
        expect(cert.expiryDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  it('should fetch certificate by ID correctly', () => {
    const ccna = getCertificateById('cert-cisco-ccna');
    expect(ccna).toBeDefined();
    expect(ccna?.organization).toBe('Cisco');
    expect(ccna?.title).toContain('CCNA');
  });

  it('should return active non-expired certificates', () => {
    const active = getActiveCertificates();
    expect(active.length).toBeGreaterThan(0);
  });
});
