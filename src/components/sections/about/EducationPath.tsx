'use client';

import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface EducationPathProps {
  /** Additional CSS classes */
  className?: string;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  specialization: string;
  status: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  isActive?: boolean;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-ipb',
    institution: 'IPB University (Institut Pertanian Bogor)',
    degree: 'Sarjana Terapan (D4)',
    specialization: 'Teknologi Rekayasa Komputer (Computer Engineering Technology)',
    status: 'Sedang Menempuh Pendidikan',
    period: '2022 — Present',
    location: 'Bogor, Indonesia',
    description:
      'Advanced computer engineering curriculum focusing on embedded systems architecture, microcontrollers, distributed network infrastructure, and operating system kernels.',
    highlights: [
      'Embedded Hardware & IoT System Design',
      'Operating System Kernels & Linux Driver Development',
      'Computer Architecture & Digital Signal Processing',
      'Distributed Systems & Cyber Defense Architecture',
    ],
    isActive: true,
  },
  {
    id: 'edu-smkn1',
    institution: 'SMK Negeri 1 Cikarang Selatan',
    degree: 'Vocational High School Diploma',
    specialization: 'Teknik Komputer dan Jaringan (Computer & Network Engineering)',
    status: 'Graduated',
    period: '2019 — 2022',
    location: 'Bekasi, Indonesia',
    description:
      'Foundational vocational training in enterprise computer networking, routing protocols, server administration, and physical layer infrastructure.',
    highlights: [
      'Cisco Enterprise Routing & Switching (CCNA Curriculum)',
      'MikroTik MTCNA RouterOS Configuration',
      'Structured Cabling & Fiber Optic Fusion Splicing',
      'Linux / Windows Server Infrastructure Administration',
    ],
    isActive: false,
  },
];

/**
 * EducationPath — Circuit Timeline Education Pathway Component.
 *
 * Displays academic history with status badges, specialization details,
 * and highlighted engineering competencies.
 *
 * **Requirements: 13.2, 13.3**
 */
export function EducationPath({ className }: EducationPathProps) {
  return (
    <div className={cn('relative space-y-6', className)}>
      {/* Circuit bus line connecting items */}
      <div
        className="from-copper via-copper-bright to-trace pointer-events-none absolute top-8 bottom-8 left-6 hidden w-[2px] bg-gradient-to-b sm:block"
        aria-hidden="true"
      />

      <div className="space-y-6">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.id}
            className={cn(
              'group relative rounded-2xl border p-5 transition-all duration-300 sm:p-6',
              'bg-substrate-raised/60 hover:bg-substrate-raised',
              item.isActive
                ? 'border-copper shadow-[0_0_25px_rgba(212,165,116,0.15)]'
                : 'border-trace/70 hover:border-copper/60'
            )}
          >
            {/* Corner Solder Pads */}
            <span className="border-copper/60 absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2" />
            <span className="border-copper/60 absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2" />
            <span className="border-copper/60 absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2" />
            <span className="border-copper/60 absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2" />

            {/* Header / Institution Info */}
            <div className="border-trace/40 mb-4 flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="bg-substrate border-copper/50 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                  {item.isActive ? (
                    <GraduationCap className="text-copper-bright h-5 w-5" />
                  ) : (
                    <BookOpen className="text-copper h-5 w-5" />
                  )}
                </div>

                <div>
                  <h4 className="font-display text-text-primary group-hover:text-copper-bright text-base font-bold transition-colors sm:text-lg">
                    {item.institution}
                  </h4>
                  <p className="text-copper font-mono text-xs font-medium sm:text-sm">
                    {item.specialization}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 self-start font-mono sm:self-center">
                <Badge
                  variant={item.isActive ? 'status' : 'outline'}
                  pulseDot={item.isActive}
                  className={cn(
                    'font-mono text-[11px] tracking-wider uppercase',
                    item.isActive && 'border-signal-green/40 shadow-signal-glow'
                  )}
                >
                  {item.status}
                </Badge>
              </div>
            </div>

            {/* Meta tags: Period and Location */}
            <div className="text-text-tertiary mb-3 flex flex-wrap items-center gap-4 font-mono text-xs select-none">
              <span className="flex items-center gap-1.5">
                <Calendar className="text-copper h-3.5 w-3.5" />
                {item.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="text-copper h-3.5 w-3.5" />
                {item.location}
              </span>
              <span className="text-text-secondary">[{item.degree}]</span>
            </div>

            {/* Narrative summary */}
            <p className="text-text-secondary mb-4 text-sm leading-relaxed">{item.description}</p>

            {/* Competency Highlights */}
            <div className="border-trace/30 grid grid-cols-1 gap-2 border-t pt-2 sm:grid-cols-2">
              {item.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="text-text-secondary flex items-center gap-2 font-mono text-xs"
                >
                  <span className="bg-signal-cyan h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

EducationPath.displayName = 'EducationPath';
