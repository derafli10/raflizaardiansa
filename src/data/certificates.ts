import type { Certificate } from '@/types/certificate';

/**
 * Static professional certifications and credentials dataset for Rafliza Ardiansa.
 * Represents verified achievements in Networking, Cyber Security, Cloud, and Systems Architecture.
 *
 * **Requirements: 13.5, 13.6, 13.7, 13.8**
 */
export const certificates: Certificate[] = [
  {
    id: 'cert-cisco-ccna',
    title: 'Cisco Certified Network Associate (CCNA)',
    organization: 'Cisco',
    issuerLogo: '/images/certs/cisco.svg',
    issueDate: '2023-11-20',
    expiryDate: '2026-11-20',
    credentialId: 'CSCO-14289512',
    verificationUrl: 'https://www.credly.com/badges/cisco-certified-network-associate',
  },
  {
    id: 'cert-mikrotik-mtcna',
    title: 'MikroTik Certified Network Associate (MTCNA)',
    organization: 'MikroTik',
    issuerLogo: '/images/certs/mikrotik.svg',
    issueDate: '2023-08-14',
    expiryDate: '2026-08-14',
    credentialId: 'MTCNA-2308-5921',
    verificationUrl: 'https://mikrotik.com/training/certificates',
  },
  {
    id: 'cert-comptia-secplus',
    title: 'CompTIA Security+ (SY0-701)',
    organization: 'CompTIA',
    issuerLogo: '/images/certs/comptia.svg',
    issueDate: '2024-02-18',
    expiryDate: '2027-02-18',
    credentialId: 'COMP001029482',
    verificationUrl: 'https://www.credly.com/badges/comptia-security-plus',
  },
  {
    id: 'cert-aws-solutions-architect',
    title: 'AWS Certified Solutions Architect – Associate',
    organization: 'Amazon Web Services (AWS)',
    issuerLogo: '/images/certs/aws.svg',
    issueDate: '2024-05-10',
    expiryDate: '2027-05-10',
    credentialId: 'AWS-PSA-8492019',
    verificationUrl: 'https://www.credly.com/badges/aws-certified-solutions-architect-associate',
  },
  {
    id: 'cert-redhat-rhcsa',
    title: 'Red Hat Certified System Administrator (RHCSA)',
    organization: 'Red Hat',
    issuerLogo: '/images/certs/redhat.svg',
    issueDate: '2024-09-05',
    expiryDate: '2027-09-05',
    credentialId: 'RH-240-91823',
    verificationUrl: 'https://www.redhat.com/en/services/certification',
  },
  {
    id: 'cert-eccouncil-ceh',
    title: 'Certified Network Security Specialist (CNSS)',
    organization: 'ICSI (International CyberSecurity Institute)',
    issuerLogo: '/images/certs/icsi.svg',
    issueDate: '2023-06-25',
    credentialId: 'ICSI-CNSS-94182',
    verificationUrl: 'https://www.icsi.co.uk/verification',
  },
];

/**
 * Helper to fetch a certificate by ID
 */
export function getCertificateById(id: string): Certificate | undefined {
  return certificates.find((c) => c.id === id);
}

/**
 * Helper to get all active non-expired certificates
 */
export function getActiveCertificates(): Certificate[] {
  const now = new Date();
  return certificates.filter((c) => {
    if (!c.expiryDate) return true;
    return new Date(c.expiryDate) > now;
  });
}
