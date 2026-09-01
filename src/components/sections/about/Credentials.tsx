'use client';

import { ShieldCheck, Award } from 'lucide-react';
import { CertificateCard } from '@/components/ui/CertificateCard';
import { certificates } from '@/data/certificates';
import { cn } from '@/lib/utils';

export interface CredentialsProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Credentials — Industry Certifications & Credentials Grid Component.
 *
 * Renders verified technical credentials (CCNA, MTCNA, Security+, AWS, RHCSA, CNSS)
 * using the LinkedIn-style `CertificateCard` component.
 *
 * **Requirements: 13.5, 13.6, 13.7, 13.8**
 */
export function Credentials({ className }: CredentialsProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Section Sub-header */}
      <div className="border-trace/60 flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2.5">
          <Award className="text-copper-bright h-5 w-5" />
          <h3 className="font-display text-text-primary text-lg font-bold sm:text-xl">
            Verified Certifications & Accreditations
          </h3>
        </div>

        <div className="text-signal-green hidden items-center gap-1.5 font-mono text-xs sm:flex">
          <ShieldCheck className="h-4 w-4" />
          <span>{certificates.length} VERIFIED CREDENTIALS</span>
        </div>
      </div>

      {/* Responsive Credentials Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>
    </div>
  );
}

Credentials.displayName = 'Credentials';
