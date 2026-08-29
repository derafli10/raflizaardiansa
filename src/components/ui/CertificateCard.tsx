'use client';

/**
 * Certificate Card Component
 *
 * LinkedIn-style credential card primitive with PCB-inspired aesthetics,
 * issuer verification links, typography hierarchy, and hover effects.
 *
 * @module components/ui/CertificateCard
 */

import { forwardRef, type HTMLAttributes } from 'react';
import Image from 'next/image';
import { ExternalLink, Award, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Certificate } from '@/types/certificate';
import { Button } from './Button';

export interface CertificateCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Certificate data object
   */
  certificate: Certificate;
  /**
   * Optional custom issuer icon element
   */
  fallbackIcon?: React.ReactNode;
}

/**
 * Formats ISO date string to a human-readable format (e.g. 'Jan 2024')
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * CertificateCard Component
 *
 * @example
 * ```tsx
 * <CertificateCard
 *   certificate={{
 *     id: 'ccna-2024',
 *     title: 'Cisco Certified Network Associate (CCNA)',
 *     organization: 'Cisco',
 *     issueDate: '2024-03-15',
 *     credentialId: 'CSCO12345678',
 *     verificationUrl: 'https://www.credly.com/badges/...',
 *   }}
 * />
 * ```
 */
export const CertificateCard = forwardRef<HTMLDivElement, CertificateCardProps>(
  ({ className, certificate, fallbackIcon, ...props }, ref) => {
    const {
      title,
      organization,
      issuerLogo,
      issueDate,
      expiryDate,
      credentialId,
      verificationUrl,
    } = certificate;

    const formattedIssueDate = formatDate(issueDate);
    const formattedExpiryDate = expiryDate ? formatDate(expiryDate) : null;
    const dateLabel = formattedExpiryDate
      ? `Issued ${formattedIssueDate} · Expires ${formattedExpiryDate}`
      : `Issued ${formattedIssueDate} · No Expiration Date`;

    return (
      <div
        ref={ref}
        className={cn(
          'group border-trace bg-substrate-raised relative overflow-hidden rounded-xl border p-5 sm:p-6',
          'hover:border-copper transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,165,116,0.15)]',
          'flex flex-col justify-between gap-5 font-sans',
          className
        )}
        {...props}
      >
        {/* PCB Solder Corner Accents */}
        <span
          className="border-copper/40 group-hover:border-copper pointer-events-none absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 transition-colors duration-300"
          aria-hidden="true"
        />
        <span
          className="border-copper/40 group-hover:border-copper pointer-events-none absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 transition-colors duration-300"
          aria-hidden="true"
        />
        <span
          className="border-copper/40 group-hover:border-copper pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 transition-colors duration-300"
          aria-hidden="true"
        />
        <span
          className="border-copper/40 group-hover:border-copper pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 transition-colors duration-300"
          aria-hidden="true"
        />

        {/* Top Header: Issuer Logo & Info */}
        <div className="flex items-start gap-4">
          {/* Logo / Badge Icon */}
          <div className="border-trace bg-substrate group-hover:border-copper/60 relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-2 transition-colors duration-300">
            {issuerLogo ? (
              <Image
                src={issuerLogo}
                alt={`${organization} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            ) : (
              (fallbackIcon ?? <Award className="text-copper h-6 w-6" />)
            )}
          </div>

          {/* Title & Organization */}
          <div className="min-w-0 flex-1 space-y-1">
            <h4 className="font-display text-text-primary group-hover:text-copper-bright text-base leading-snug font-bold tracking-tight transition-colors duration-200">
              {title}
            </h4>
            <p className="text-copper font-sans text-sm font-medium">{organization}</p>
            <p className="text-text-tertiary font-mono text-xs">{dateLabel}</p>
          </div>
        </div>

        {/* Bottom Section: Credential ID & Show Credential Action */}
        <div className="border-trace/40 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          {/* Credential ID */}
          {credentialId && (
            <div className="text-text-tertiary flex items-center gap-1.5 font-mono text-xs">
              <ShieldCheck className="text-signal-green h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                ID: <span className="text-text-secondary">{credentialId}</span>
              </span>
            </div>
          )}

          {/* Show Credential Button */}
          {verificationUrl && (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button
                variant="secondary"
                size="sm"
                rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Show credential
              </Button>
            </a>
          )}
        </div>
      </div>
    );
  }
);

CertificateCard.displayName = 'CertificateCard';
