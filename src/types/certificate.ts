/**
 * Certificate-related type definitions for The Schematic Network portfolio
 * @module types/certificate
 */

/**
 * Represents a professional certification or credential
 */
export interface Certificate {
  /** Unique identifier for the certificate */
  id: string;
  /** Certificate title/name */
  title: string;
  /** Issuing organization name */
  organization: string;
  /** Optional path to issuer logo image */
  issuerLogo?: string;
  /** Issue date in ISO 8601 format (YYYY-MM-DD) */
  issueDate: string;
  /** Optional expiry date in ISO 8601 format (YYYY-MM-DD) */
  expiryDate?: string;
  /** Credential ID for verification */
  credentialId: string;
  /** URL for credential verification */
  verificationUrl: string;
}
