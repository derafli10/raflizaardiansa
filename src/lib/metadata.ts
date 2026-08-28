/**
 * SEO and metadata utilities for The Schematic Network.
 *
 * Provides helpers for generating JSON-LD structured data and metadata
 * for optimal search engine optimization and social media sharing.
 *
 * **Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9**
 */

/**
 * JSON-LD Schema.org types
 *
 * Based on https://schema.org/ vocabulary
 */
export interface EducationalOrganization {
  '@type': 'EducationalOrganization';
  name: string;
  description?: string;
}

export interface Person {
  '@context'?: 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
  alumniOf?: EducationalOrganization[];
  description?: string;
  knowsAbout?: string[];
}

export interface ProfilePage {
  '@context'?: 'https://schema.org';
  '@type': 'ProfilePage';
  name: string;
  url: string;
  mainEntity: Person;
}

/**
 * Site configuration for metadata generation.
 *
 * Update these values with actual social media links and handles.
 */
export const SITE_CONFIG = {
  name: 'Rafli Zaardiansa',
  title: 'Rafli Zaardiansa — Network, Hardware, Software & Cyber Security',
  description:
    'Portfolio of Rafli Zaardiansa, a network, hardware, software, and cyber security engineer specializing in infrastructure design, network topology, and system security. Visualized as a living circuit board.',
  url: 'https://raflizaardiansa.com',
  siteName: 'The Schematic Network',
  locale: 'en_US',

  // Social media links (update with actual profiles)
  social: {
    github: 'https://github.com/raflizaardiansa',
    linkedin: 'https://linkedin.com/in/raflizaardiansa',
    twitter: '@raflizaardiansa',
  },

  // Education data for structured data
  education: [
    {
      name: 'SMK Negeri 1 Cikarang Selatan',
      description: 'Teknik Komputer dan Jaringan',
      startDate: undefined,
      endDate: undefined,
    },
    {
      name: 'IPB University',
      description: 'Teknologi Rekayasa Komputer (D4) - Sedang Menempuh Pendidikan',
      startDate: undefined,
      endDate: undefined,
    },
  ],

  // OpenGraph image
  ogImage: {
    url: '/api/og',
    width: 1200,
    height: 630,
    alt: 'The Schematic Network - Rafli Zaardiansa Portfolio',
  },
} as const;

/**
 * Generates JSON-LD Person schema with education and professional details.
 *
 * Person schema helps search engines understand who you are, your role,
 * and your professional background. This is critical for personal branding
 * and appearing in knowledge panels.
 *
 * @returns Schema.org Person object with complete professional profile
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * export default function RootLayout({ children }) {
 *   const personSchema = generatePersonSchema();
 *
 *   return (
 *     <html>
 *       <head>
 *         <script
 *           type="application/ld+json"
 *           dangerouslySetInnerHTML={{
 *             __html: JSON.stringify(personSchema),
 *           }}
 *         />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 *
 * **SEO Benefits:**
 * - Appears in Google Knowledge Panel
 * - Rich snippets in search results
 * - Better social media link previews
 * - Improved entity recognition
 *
 * **Requirements: 23.1, 23.2, 23.3, 23.4, 23.5**
 *
 * @see https://schema.org/Person
 * @see https://developers.google.com/search/docs/appearance/structured-data/person
 */
export function generatePersonSchema(): Person {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    jobTitle: 'Network, Hardware, Software & Cyber Security Engineer',
    url: SITE_CONFIG.url,

    // Social media profiles
    sameAs: [SITE_CONFIG.social.github, SITE_CONFIG.social.linkedin].filter(Boolean),

    // Educational background
    alumniOf: SITE_CONFIG.education.map((edu) => ({
      '@type': 'EducationalOrganization' as const,
      name: edu.name,
      description: edu.description,
    })),

    // Professional description
    description:
      'Engineering the invisible infrastructure that keeps the world connected. Specializing in network topology, hardware design, software development, and cyber security.',

    // Knowledge areas
    knowsAbout: [
      'Network Engineering',
      'Hardware Engineering',
      'Software Engineering',
      'Cyber Security',
      'Infrastructure Design',
      'Network Topology',
      'System Security',
      'Circuit Design',
    ],
  };
}

/**
 * Generates JSON-LD ProfilePage schema for the portfolio homepage.
 *
 * ProfilePage schema signals to search engines that this is a professional
 * portfolio or personal website, with the Person schema as the main entity.
 *
 * @returns Schema.org ProfilePage object with embedded Person schema
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <head>
 *         <script
 *           type="application/ld+json"
 *           dangerouslySetInnerHTML={{
 *             __html: JSON.stringify(generateProfilePageSchema()),
 *           }}
 *         />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 *
 * **SEO Benefits:**
 * - Identifies page as a professional profile
 * - Links Person entity to the page
 * - Improves search result appearance
 * - Better indexing of portfolio content
 *
 * **Requirements: 23.6, 23.7, 23.8**
 *
 * @see https://schema.org/ProfilePage
 */
export function generateProfilePageSchema(): ProfilePage {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${SITE_CONFIG.siteName} - ${SITE_CONFIG.name} Portfolio`,
    url: SITE_CONFIG.url,
    mainEntity: generatePersonSchema(),
  };
}

/**
 * Generates OpenGraph metadata object for Next.js metadata API.
 *
 * Creates the OpenGraph configuration for social media sharing with
 * optimal image, title, and description for link previews.
 *
 * @param options - Optional overrides for specific pages
 * @returns OpenGraph metadata object
 *
 * @example
 * ```tsx
 * // In app/page.tsx
 * import { generateOpenGraphMetadata } from '@/lib/metadata';
 * import type { Metadata } from 'next';
 *
 * export const metadata: Metadata = {
 *   title: 'Home',
 *   openGraph: generateOpenGraphMetadata(),
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Custom page with different title
 * export const metadata: Metadata = {
 *   title: 'Projects',
 *   openGraph: generateOpenGraphMetadata({
 *     title: 'Projects - Rafli Zaardiansa',
 *     description: 'Explore my engineering projects',
 *   }),
 * };
 * ```
 *
 * **Requirements: 23.5, 23.6, 23.7**
 */
export function generateOpenGraphMetadata(options?: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  return {
    type: 'website' as const,
    locale: SITE_CONFIG.locale,
    url: options?.url || SITE_CONFIG.url,
    siteName: SITE_CONFIG.siteName,
    title: options?.title || SITE_CONFIG.title,
    description: options?.description || SITE_CONFIG.description,
    images: [
      {
        url: options?.image || SITE_CONFIG.ogImage.url,
        width: SITE_CONFIG.ogImage.width,
        height: SITE_CONFIG.ogImage.height,
        alt: SITE_CONFIG.ogImage.alt,
      },
    ],
  };
}

/**
 * Generates Twitter Card metadata for Next.js metadata API.
 *
 * Creates Twitter-specific metadata for optimal tweet previews.
 *
 * @param options - Optional overrides for specific pages
 * @returns Twitter Card metadata object
 *
 * @example
 * ```tsx
 * // In app/page.tsx
 * import { generateTwitterMetadata } from '@/lib/metadata';
 * import type { Metadata } from 'next';
 *
 * export const metadata: Metadata = {
 *   title: 'Home',
 *   twitter: generateTwitterMetadata(),
 * };
 * ```
 *
 * **Requirements: 23.7, 23.8**
 */
export function generateTwitterMetadata(options?: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return {
    card: 'summary_large_image' as const,
    title: options?.title || SITE_CONFIG.title,
    description: options?.description || SITE_CONFIG.description,
    images: [options?.image || SITE_CONFIG.ogImage.url],
    creator: SITE_CONFIG.social.twitter,
  };
}

/**
 * Generates complete metadata object for Next.js pages.
 *
 * Combines all metadata (title, description, OpenGraph, Twitter, etc.)
 * into a single object for easy use in page metadata exports.
 *
 * @param options - Page-specific metadata overrides
 * @returns Complete Next.js Metadata object
 *
 * @example
 * ```tsx
 * // In app/page.tsx
 * import { generatePageMetadata } from '@/lib/metadata';
 * import type { Metadata } from 'next';
 *
 * export const metadata: Metadata = generatePageMetadata({
 *   title: 'Home',
 *   description: 'Welcome to my portfolio',
 * });
 * ```
 *
 * @example
 * ```tsx
 * // With custom template
 * export const metadata: Metadata = generatePageMetadata({
 *   title: 'Projects',
 *   titleTemplate: '%s | Portfolio', // Results in "Projects | Portfolio"
 * });
 * ```
 *
 * **Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9**
 */
export function generatePageMetadata(options?: {
  title?: string;
  titleTemplate?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noindex?: boolean;
}) {
  const title = options?.title || SITE_CONFIG.title;
  const description = options?.description || SITE_CONFIG.description;

  return {
    title: options?.titleTemplate ? options.titleTemplate.replace('%s', title) : title,
    description,
    keywords: options?.keywords || [
      'network engineer',
      'hardware engineer',
      'software engineer',
      'cyber security',
      'infrastructure',
      'circuit design',
      'network topology',
      'rafli zaardiansa',
      'portfolio',
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    openGraph: generateOpenGraphMetadata({
      title,
      description,
      image: options?.image,
      url: options?.url,
    }),
    twitter: generateTwitterMetadata({
      title,
      description,
      image: options?.image,
    }),
    robots: options?.noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical: options?.url || SITE_CONFIG.url,
    },
  };
}

/**
 * Generates viewport configuration for Next.js.
 *
 * @returns Viewport object with responsive and theme color settings
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * import { generateViewport } from '@/lib/metadata';
 *
 * export const viewport = generateViewport();
 * ```
 *
 * **Requirements: 23.9**
 */
export function generateViewport() {
  return {
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#0a0f0d' },
      { media: '(prefers-color-scheme: light)', color: '#f5f7f6' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

/**
 * Helper to safely stringify JSON-LD for dangerouslySetInnerHTML.
 *
 * Ensures proper escaping to prevent XSS vulnerabilities.
 *
 * @param schema - Schema.org object
 * @returns JSON string safe for HTML injection
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: safeJsonLd(generatePersonSchema()),
 *   }}
 * />
 * ```
 */
export function safeJsonLd(schema: Person | ProfilePage): string {
  return JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
