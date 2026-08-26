# Design Document: The Schematic Network

## Overview

The Schematic Network is an elite, Awwwards-level portfolio website that visualizes Rafli Zaardiansa's professional identity as a network, hardware, software, and cyber security engineer through an interactive circuit board/engineering schematic metaphor. The design philosophy is "portfolio as living infrastructure" — every section is a node, every transition is data flow, every interaction is a signal.

### Design Philosophy

**Core Metaphor:** Portfolio = Network Device
- **Boot Sequence** → Preloader mimics device initialization
- **Scroll Progress** → Data packet traversing network topology
- **Sections** → Network nodes with signal propagation
- **Interactions** → Signal feedback like probe touching test points
- **Theme Toggle** → PCB view (dark) vs Blueprint view (light)

**Visual Language:**
- **Primary:** SVG circuit traces with DrawSVG animations
- **Typography:** Engineered typefaces (Space Grotesk, Inter, JetBrains Mono)
- **Color Palette:** PCB-inspired (substrate green, copper traces, LED signals)
- **Motion:** 60fps GPU-accelerated animations using transform + opacity only

### Technical Stack

**Framework & Core:**
- Next.js 16.3 (App Router)
- React 19.2
- TypeScript 5
- Tailwind CSS 4

**Animation Pipeline:**
- GSAP 3.15 (ScrollTrigger, DrawSVG, MotionPath, TextPlugin, MorphSVG, SplitText)
- Lenis 1.3 (smooth scroll)
- Motion 13.1 (micro-interactions, AnimatePresence)
- Rive Canvas 4.32 (decorative vector animations)

**State & UI:**
- Zustand 5.0 (global state)
- Headless UI 2.2 (accessible dialog primitives)
- Class Variance Authority 0.7 (variant system)
- Lucide React 1.34 (icon system)

**Infrastructure:**
- Vercel Speed Insights & Analytics
- Howler.js (ambient audio - optional)

## Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────┐
│                 Next.js App Router              │
│                   (layout.tsx)                  │
│                                                 │
│  ┌────────────────────────────────────────┐     │
│  │         Provider Composition           │     │
│  │                                        │     │
│  │  ThemeProvider (next-themes)           │     │
│  │    └─> LenisProvider (smooth scroll)   │     │
│  │        └─> AnimationProvider (GSAP)    │     │
│  │            └─> App Content             │     │
│  └────────────────────────────────────────┘     │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │         Global State (Zustand)           │   │
│  │                                          │   │
│  │  • theme-store    (persist: localStorage)│   │
│  │  • nav-store      (activeSection, ...)   │   │
│  │  • app-store      (preloader, cursor)    │   │
│  │  • audio-store    (ambient audio)        │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │         Page Structure (SPA)             │   │
│  │                                          │   │
│  │  1. Preloader (boot sequence, 3.5s)      │   │
│  │  2. Navigation (persistent)              │   │
│  │  3. Sections (scroll-driven narrative):  │   │
│  │     • Hero                               │   │
│  │     • About                              │   │
│  │     • Skills (network topology)          │   │
│  │     • Projects (case studies)            │   │
│  │     • Contact (TCP handshake form)       │   │
│  │  4. Footer                               │   │
│  │  5. Custom Cursor (desktop only)         │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home page (single-page portfolio)
│   ├── not-found.tsx                 # 404 "SIGNAL LOST"
│   ├── error.tsx                     # Error boundary "SYSTEM FAULT"
│   ├── global-error.tsx              # Root error boundary
│   ├── loading.tsx                   # Loading UI fallback
│   ├── globals.css                   # Global styles + design tokens
│   ├── api/
│   │   ├── contact/route.ts          # Contact form endpoint (Resend)
│   │   └── og/route.tsx              # Dynamic OG image generator
│   └── favicon.ico
│
├── components/
│   ├── ui/                           # Atomic primitives (Button, Card, Badge, Modal, Input, Tooltip, Skeleton, CertificateCard)
│   ├── layout/                       # Container, Grid
│   ├── navigation/                   # Navbar, NavLink, MobileMenu, ScrollProgress
│   ├── preloader/                    # Preloader, CircuitAssembly, BootSequence
│   ├── scroll/                       # ScrollNarrative, CircuitPath, SectionNode
│   ├── transitions/                  # PageTransition, CircuitWipe, variants
│   ├── typography/                   # SplitTextReveal, TypewriterText, ScrambleText, CountUp
│   ├── circuit/                      # CircuitBoard, Trace, Node, DataFlow, ComponentSymbol
│   ├── decorative/                   # SchematicPattern, CircuitTrace, GridPattern
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── hero/                     # HeroStatement, HeroCircuit, ScrollIndicator
│   │   ├── About.tsx
│   │   ├── about/                    # OriginStory, EducationPath, Philosophy, Credentials
│   │   ├── Projects.tsx
│   │   ├── projects/                 # ProjectCard, ProjectModal, TopologyDiagram
│   │   ├── Skills.tsx
│   │   ├── skills/                   # SkillGraph, SkillNode, SkillDetail
│   │   ├── Contact.tsx
│   │   ├── contact/                  # HandshakeForm, ConnectionStatus
│   │   └── Footer.tsx
│   └── cursor/                       # CustomCursor
│
├── hooks/                            # Custom React hooks
│   ├── useScrollProgress.ts
│   ├── useActiveSection.ts
│   ├── useScrollDirection.ts
│   ├── useMagneticElement.ts
│   ├── useTiltEffect.ts
│   ├── useCursorState.ts
│   ├── useReducedMotion.ts
│   └── useLenis.ts
│
├── stores/                           # Zustand state stores
│   ├── theme-store.ts
│   ├── nav-store.ts
│   ├── app-store.ts
│   └── audio-store.ts
│
├── providers/                        # React context providers
│   ├── ThemeProvider.tsx
│   ├── LenisProvider.tsx
│   └── AnimationProvider.tsx
│
├── lib/                              # Utilities
│   ├── fonts.ts                      # Font configuration
│   ├── metadata.ts                   # SEO metadata helpers
│   ├── animation-utils.ts            # GSAP helpers
│   ├── lenis-gsap-bridge.ts          # Lenis + GSAP synchronization
│   ├── scroll-config.ts              # ScrollTrigger defaults
│   └── utils.ts                      # General utilities (cn, clsx, tailwind-merge)
│
├── data/                             # Static data
│   ├── projects.ts                   # Project case studies data
│   ├── skills.ts                     # Skills topology data
│   └── certificates.ts               # Credentials data
│
├── styles/
│   └── tokens/                       # Design token CSS modules
│       ├── typography.css
│       ├── colors.css
│       ├── spacing.css
│       ├── theme-dark.css
│       └── theme-light.css
│
└── types/                            # TypeScript type definitions
    ├── project.ts
    ├── skill.ts
    └── certificate.ts
```

### State Management Strategy

**Zustand Stores (Domain-Driven):**

```typescript
// theme-store.ts
interface ThemeStore {
  mode: 'system' | 'dark' | 'light';
  resolved: 'dark' | 'light';
  setMode: (mode: 'system' | 'dark' | 'light') => void;
}
// Persist: localStorage key 'tsn-theme'

// nav-store.ts
interface NavStore {
  activeSection: string;
  isMenuOpen: boolean;
  scrollProgress: number;
  setActiveSection: (section: string) => void;
  toggleMenu: () => void;
  setScrollProgress: (progress: number) => void;
}

// app-store.ts
interface AppStore {
  isLoaded: boolean;
  isPreloaderComplete: boolean;
  cursorState: 'dot' | 'grow' | 'blend' | 'view';
  setLoaded: (loaded: boolean) => void;
  setPreloaderComplete: (complete: boolean) => void;
  setCursorState: (state: CursorState) => void;
}

// audio-store.ts (optional - for ambient sounds)
interface AudioStore {
  isMuted: boolean;
  volume: number;
  isAmbientPlaying: boolean;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  toggleAmbient: () => void;
}
```

**Performance Optimization:**
- Use shallow selectors to prevent unnecessary re-renders
- Slice stores by domain (theme, nav, app, audio)
- Persist only theme preference
- No derived state in stores - compute in selectors

## Components and Interfaces

### Design System Foundation

#### Typography System

**Font Stack:**
```typescript
// lib/fonts.ts
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});
```

**Type Scale (Modular Scale 1.25):**
```css
/* styles/tokens/typography.css */
:root {
  --font-xs:    0.64rem;   /* 10.24px - caption, metadata */
  --font-sm:    0.80rem;   /* 12.80px - small text, labels */
  --font-base:  1.00rem;   /* 16.00px - body text */
  --font-md:    1.25rem;   /* 20.00px - lead paragraph */
  --font-lg:    1.56rem;   /* 24.96px - H4 */
  --font-xl:    1.95rem;   /* 31.25px - H3 */
  --font-2xl:   2.44rem;   /* 39.06px - H2 */
  --font-3xl:   3.05rem;   /* 48.83px - H1 */
  --font-4xl:   3.81rem;   /* 61.04px - Hero display */
}

/* Mobile: reduce by one step */
@media (max-width: 640px) {
  :root {
    --font-base:  0.875rem;
    --font-4xl:   3.05rem;
  }
}
```

#### Color System

**PCB-Inspired Palette:**
```css
/* styles/tokens/colors.css */
:root {
  /* Substrate (background) */
  --color-substrate: #0a0f0d;
  --color-substrate-raised: #111a16;
  --color-substrate-pattern: #0d1511;
  
  /* Copper (primary accent) */
  --color-copper: #d4a574;
  --color-copper-bright: #e8c49a;
  --color-copper-dim: #b89560;
  
  /* Solder (secondary, metallics) */
  --color-solder: #c0c8d4;
  --color-solder-bright: #dfe4ea;
  
  /* Signal LEDs */
  --color-signal-green: #22c55e;    /* active, success */
  --color-signal-red: #ef4444;      /* error, fault */
  --color-signal-amber: #f59e0b;    /* warning */
  --color-signal-cyan: #06b6d4;     /* links, interactive */
  
  /* Traces & borders */
  --color-trace: #1a3a2a;
  --color-trace-active: var(--color-copper);
  
  /* Text */
  --color-text-primary: #e8ede9;
  --color-text-secondary: #a8b5ad;
  --color-text-tertiary: #6b7b72;
  
  /* Gradients */
  --gradient-copper-flow: linear-gradient(135deg, #d4a574, #e8c49a, #d4a574);
  --gradient-signal-pulse: linear-gradient(90deg, #06b6d4, #22c55e);
  --gradient-substrate: radial-gradient(ellipse at 30% 20%, #111a16, #0a0f0d);
}

/* Light Mode (Blueprint View) */
[data-theme="light"] {
  --color-substrate: #f5f7f6;
  --color-substrate-raised: #ffffff;
  --color-copper: #b87f4d;
  --color-text-primary: #1a2b22;
  --color-text-secondary: #4a5b52;
  --color-trace: #d4dfd9;
}
```

#### Spacing & Grid System

**8px-Based Scale:**
```css
/* styles/tokens/spacing.css */
:root {
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.50rem;  /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1.00rem;  /* 16px */
  --space-5:   1.50rem;  /* 24px */
  --space-6:   2.00rem;  /* 32px */
  --space-8:   3.00rem;  /* 48px */
  --space-10:  4.00rem;  /* 64px */
  --space-12:  6.00rem;  /* 96px */
  --space-16:  8.00rem;  /* 128px */
}
```

**Responsive Breakpoints:**
```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      sm: '640px',   // Mobile landscape
      md: '768px',   // Tablet portrait
      lg: '1024px',  // Tablet landscape / Desktop
      xl: '1280px',  // Desktop
      '2xl': '1536px', // Large desktop
    },
  },
};
```

### UI Primitive Components

#### Button Component

```typescript
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-copper text-substrate hover:bg-copper-bright hover:scale-[1.02] hover:shadow-copper-glow',
        secondary: 'border-2 border-copper text-copper hover:bg-copper/10 circuit-border-animation',
        ghost: 'text-copper hover:bg-copper/5',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        data-magnetic={magnetic}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, buttonVariants };
```

**Magnetic Hover Effect:**
```typescript
// hooks/useMagneticElement.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagneticElement<T extends HTMLElement>(strength: number = 0.3, radius: number = 100) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < radius) {
        const pull = 1 - distance / radius;
        gsap.to(element, {
          x: deltaX * strength * pull,
          y: deltaY * strength * pull,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius]);

  return ref;
}
```

#### Card Component

```typescript
// components/ui/Card.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border transition-all',
  {
    variants: {
      variant: {
        default: 'bg-substrate-raised border-trace',
        elevated: 'bg-substrate-raised border-copper shadow-copper-glow',
        interactive: 'bg-substrate-raised border-trace hover:border-copper hover:shadow-copper-glow cursor-pointer tilt-3d',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight font-display', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

**3D Tilt Effect:**
```typescript
// hooks/useTiltEffect.ts
import { useEffect, useRef } from 'react';

export function useTiltEffect<T extends HTMLElement>(intensity: number = 10) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * intensity;
      const rotateY = ((centerX - x) / centerX) * intensity;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return ref;
}
```

#### Certificate Card Component

```typescript
// components/ui/CertificateCard.tsx
import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from './Button';

interface CertificateCardProps {
  issuerLogo?: string;
  issuerIcon?: React.ReactNode;
  title: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
}

export function CertificateCard({
  issuerLogo,
  issuerIcon,
  title,
  organization,
  issueDate,
  expiryDate,
  credentialId,
  verificationUrl,
}: CertificateCardProps) {
  return (
    <Card variant="default" className="overflow-hidden">
      <CardHeader className="flex-row items-start gap-4">
        {issuerLogo && (
          <img
            src={issuerLogo}
            alt={`${organization} logo`}
            className="w-12 h-12 object-contain"
          />
        )}
        {!issuerLogo && issuerIcon && (
          <div className="w-12 h-12 flex items-center justify-center bg-copper/10 rounded-md text-copper">
            {issuerIcon}
          </div>
        )}
        <div className="flex-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{organization}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-text-tertiary font-mono text-xs uppercase tracking-wider mb-1">
              Issued
            </dt>
            <dd className="text-text-primary font-mono">{issueDate}</dd>
          </div>
          {expiryDate && (
            <div>
              <dt className="text-text-tertiary font-mono text-xs uppercase tracking-wider mb-1">
                Expires
              </dt>
              <dd className="text-text-primary font-mono">{expiryDate}</dd>
            </div>
          )}
          <div className="col-span-2">
            <dt className="text-text-tertiary font-mono text-xs uppercase tracking-wider mb-1">
              Credential ID
            </dt>
            <dd className="text-text-primary font-mono text-xs break-all">
              {credentialId}
            </dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter>
        <Button
          variant="secondary"
          size="sm"
          asChild
          className="w-full"
        >
          <a
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Show credential
            <ExternalLink size={16} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

#### Modal Component

```typescript
// components/ui/Modal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-7xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'lg' }: ModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-substrate/80 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`
                relative w-full ${sizeClasses[size]} 
                bg-substrate-raised border-2 border-copper rounded-lg 
                shadow-copper-glow p-6 max-h-[90vh] overflow-y-auto
                circuit-modal-animation
              `}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-text-secondary hover:text-copper transition-colors focus:outline-none focus:ring-2 focus:ring-copper rounded-md"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Title */}
              {title && (
                <Dialog.Title className="text-3xl font-display font-bold text-copper mb-6">
                  {title}
                </Dialog.Title>
              )}

              {/* Content */}
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
```

### Custom Cursor System

```typescript
// components/cursor/CustomCursor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/stores/app-store';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorState = useAppStore((state) => state.cursorState);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on mobile/tablet
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // RAF loop for smooth cursor tracking
    let rafId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      
      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;

    switch (cursorState) {
      case 'grow':
        gsap.to(cursor, {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(212, 165, 116, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;
      case 'blend':
        gsap.to(cursor, {
          width: 64,
          height: 64,
          mixBlendMode: 'difference',
          backgroundColor: '#ffffff',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;
      case 'view':
        gsap.to(cursor, {
          width: 64,
          height: 64,
          backgroundColor: 'rgba(212, 165, 116, 0.5)',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;
      default: // 'dot'
        gsap.to(cursor, {
          width: 8,
          height: 8,
          backgroundColor: 'transparent',
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: 'power2.out',
        });
        break;
    }
  }, [cursorState]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full border-2 border-copper pointer-events-none z-[9999] mix-blend-normal"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {cursorState === 'view' && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-copper">
          VIEW
        </span>
      )}
    </div>
  );
}
```

```typescript
// stores/app-store.ts
import { create } from 'zustand';

export type CursorState = 'dot' | 'grow' | 'blend' | 'view';

interface AppStore {
  isLoaded: boolean;
  isPreloaderComplete: boolean;
  cursorState: CursorState;
  setLoaded: (loaded: boolean) => void;
  setPreloaderComplete: (complete: boolean) => void;
  setCursorState: (state: CursorState) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoaded: false,
  isPreloaderComplete: false,
  cursorState: 'dot',
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setPreloaderComplete: (complete) => set({ isPreloaderComplete: complete }),
  setCursorState: (state) => set({ cursorState: state }),
}));
```

## Data Models

### Project Data Model

```typescript
// types/project.ts
export interface Project {
  id: string;
  slug: string;
  name: string;
  type: 'network' | 'hardware' | 'software' | 'security';
  thumbnail: string;
  tags: string[];
  summary: string;
  problem: string;
  process: string;
  solution: string;
  metrics: ProjectMetric[];
  topology?: TopologyNode[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface TopologyNode {
  id: string;
  type: 'client' | 'server' | 'router' | 'switch' | 'firewall' | 'database';
  label: string;
  x: number;
  y: number;
  connections: string[]; // IDs of connected nodes
}
```

```typescript
// data/projects.ts
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'proj-001',
    slug: 'network-topology-monitor',
    name: 'Real-Time Network Topology Monitor',
    type: 'network',
    thumbnail: '/projects/network-monitor-thumb.jpg',
    tags: ['Python', 'SNMP', 'React', 'WebSocket'],
    summary: 'Automated network discovery and visualization tool for enterprise infrastructure monitoring.',
    problem: 'Network administrators lacked real-time visibility into topology changes, leading to delayed incident response.',
    process: 'Built SNMP polling engine with Python, implemented graph-based topology algorithm, created real-time dashboard with React and WebSocket.',
    solution: 'Deployed system that auto-discovers devices, visualizes connections, and alerts on topology anomalies within 30 seconds.',
    metrics: [
      { label: 'Detection Speed', value: '30', unit: 'seconds' },
      { label: 'Devices Monitored', value: '500+', unit: '' },
      { label: 'Alert Accuracy', value: '98', unit: '%' },
    ],
    topology: [
      { id: 'core-router', type: 'router', label: 'Core Router', x: 50, y: 20, connections: ['dist-sw-1', 'dist-sw-2'] },
      { id: 'dist-sw-1', type: 'switch', label: 'Distribution Switch 1', x: 30, y: 50, connections: ['access-sw-1', 'access-sw-2'] },
      { id: 'dist-sw-2', type: 'switch', label: 'Distribution Switch 2', x: 70, y: 50, connections: ['access-sw-3', 'access-sw-4'] },
      // ... more nodes
    ],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/username/project',
  },
  // ... more projects
];
```

### Skills Data Model

```typescript
// types/skill.ts
export type SkillCategory = 'networking' | 'hardware' | 'software' | 'security';
export type ProficiencyLevel = 'proficient' | 'intermediate' | 'learning';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  description: string;
  relatedProjects: string[]; // Project IDs
  connections: string[]; // Skill IDs this skill relates to
  x: number; // Position in graph
  y: number;
}
```

```typescript
// data/skills.ts
import { Skill } from '@/types/skill';

export const skills: Skill[] = [
  {
    id: 'skill-001',
    name: 'TCP/IP',
    category: 'networking',
    proficiency: 'proficient',
    description: 'Deep understanding of TCP/IP protocol suite, subnetting, and routing.',
    relatedProjects: ['proj-001', 'proj-003'],
    connections: ['skill-002', 'skill-003'],
    x: 40,
    y: 30,
  },
  {
    id: 'skill-002',
    name: 'Cisco IOS',
    category: 'networking',
    proficiency: 'proficient',
    description: 'Configuration and troubleshooting of Cisco routers and switches.',
    relatedProjects: ['proj-001'],
    connections: ['skill-001', 'skill-004'],
    x: 60,
    y: 30,
  },
  {
    id: 'skill-003',
    name: 'OSPF',
    category: 'networking',
    proficiency: 'intermediate',
    description: 'Dynamic routing protocol for large-scale networks.',
    relatedProjects: ['proj-003'],
    connections: ['skill-001', 'skill-002'],
    x: 50,
    y: 50,
  },
  // ... more skills grouped by category
];
```

### Certificate Data Model

```typescript
// types/certificate.ts
export interface Certificate {
  id: string;
  title: string;
  organization: string;
  issuerLogo?: string;
  issueDate: string; // ISO date format
  expiryDate?: string; // ISO date format (optional)
  credentialId: string;
  verificationUrl: string;
}
```

```typescript
// data/certificates.ts
import { Certificate } from '@/types/certificate';

export const certificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'CCNA: Routing and Switching',
    organization: 'Cisco',
    issuerLogo: '/logos/cisco.svg',
    issueDate: '2024-03-15',
    expiryDate: '2027-03-15',
    credentialId: 'CSCO12345678',
    verificationUrl: 'https://cisco.com/verify/CSCO12345678',
  },
  {
    id: 'cert-002',
    title: 'CompTIA Security+',
    organization: 'CompTIA',
    issuerLogo: '/logos/comptia.svg',
    issueDate: '2023-11-20',
    credentialId: 'COMP98765432',
    verificationUrl: 'https://comptia.org/verify/COMP98765432',
  },
  // ... more certificates
];
```

## Animation System Integration

### Lenis + GSAP Synchronization

```typescript
// providers/LenisProvider.tsx
'use client';

import { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Single RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
```

### Scroll-Driven Circuit Animation

```typescript
// components/scroll/ScrollNarrative.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useNavStore } from '@/stores/nav-store';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

export function ScrollNarrative() {
  const svgRef = useRef<SVGSVGElement>(null);
  const setScrollProgress = useNavStore((state) => state.setScrollProgress);

  useEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      // Master timeline for overall scroll progress
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress * 100);
          },
        },
      });

      // Animate circuit traces progressively
      sections.forEach((section, index) => {
        const traceId = `#trace-${section}`;
        const nodeId = `#node-${section}`;

        masterTimeline.fromTo(
          traceId,
          { drawSVG: '0%' },
          { drawSVG: '100%', ease: 'none' },
          index / sections.length
        );

        // Activate node when section enters viewport
        ScrollTrigger.create({
          trigger: `#section-${section}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(nodeId, {
              scale: 1.3,
              filter: 'drop-shadow(0 0 12px var(--color-copper))',
              duration: 0.6,
              ease: 'power2.out',
            });
          },
          onLeave: () => {
            gsap.to(nodeId, {
              scale: 1,
              filter: 'none',
              duration: 0.6,
              ease: 'power2.out',
            });
          },
          onEnterBack: () => {
            gsap.to(nodeId, {
              scale: 1.3,
              filter: 'drop-shadow(0 0 12px var(--color-copper))',
              duration: 0.6,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(nodeId, {
              scale: 1,
              filter: 'none',
              duration: 0.6,
              ease: 'power2.out',
            });
          },
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [setScrollProgress]);

  return (
    <svg
      ref={svgRef}
      className="fixed left-8 top-0 h-screen w-16 pointer-events-none z-10 hidden lg:block"
      viewBox="0 0 64 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define circuit path */}
      <path
        id="trace-hero"
        d="M32 50 L32 150"
        stroke="var(--color-copper)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        id="node-hero"
        cx="32"
        cy="150"
        r="8"
        fill="var(--color-copper)"
        stroke="var(--color-substrate)"
        strokeWidth="2"
      />

      <path
        id="trace-about"
        d="M32 150 L32 300"
        stroke="var(--color-copper)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        id="node-about"
        cx="32"
        cy="300"
        r="8"
        fill="var(--color-copper)"
        stroke="var(--color-substrate)"
        strokeWidth="2"
      />

      <path
        id="trace-skills"
        d="M32 300 L32 500"
        stroke="var(--color-copper)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        id="node-skills"
        cx="32"
        cy="500"
        r="8"
        fill="var(--color-copper)"
        stroke="var(--color-substrate)"
        strokeWidth="2"
      />

      <path
        id="trace-projects"
        d="M32 500 L32 700"
        stroke="var(--color-copper)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        id="node-projects"
        cx="32"
        cy="700"
        r="8"
        fill="var(--color-copper)"
        stroke="var(--color-substrate)"
        strokeWidth="2"
      />

      <path
        id="trace-contact"
        d="M32 700 L32 900"
        stroke="var(--color-copper)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        id="node-contact"
        cx="32"
        cy="900"
        r="8"
        fill="var(--color-copper)"
        stroke="var(--color-substrate)"
        strokeWidth="2"
      />
    </svg>
  );
}
```

### Preloader Boot Sequence

```typescript
// components/preloader/Preloader.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useAppStore } from '@/stores/app-store';

gsap.registerPlugin(DrawSVGPlugin);

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setPreloaderComplete = useAppStore((state) => state.setPreloaderComplete);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader already shown this session
    const hasShown = sessionStorage.getItem('preloader-shown');
    if (hasShown) {
      setPreloaderComplete(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('preloader-shown', 'true');
        setPreloaderComplete(true);
      },
    });

    // Phase 1: Circuit traces animate from center (0.0s - 0.5s)
    timeline.fromTo(
      '.circuit-trace',
      { drawSVG: '50% 50%' },
      { drawSVG: '0% 100%', duration: 0.5, stagger: 0.05, ease: 'power2.out' },
      0
    );

    // Phase 2: Form logo mark (0.5s - 1.5s)
    timeline.fromTo(
      '.logo-path',
      { drawSVG: '0%', opacity: 0 },
      { drawSVG: '100%', opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.inOut' },
      0.5
    );

    // Phase 3: Logo pulse + "INITIALIZING" (1.5s - 2.0s)
    timeline.to(
      '.logo-mark',
      {
        scale: 1.1,
        filter: 'drop-shadow(0 0 24px var(--color-copper))',
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      },
      1.5
    );
    timeline.fromTo(
      '.init-text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      1.5
    );

    // Phase 4: Progress bar fill (2.0s - 2.5s)
    timeline.to(
      {},
      {
        duration: 0.5,
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
      },
      2.0
    );

    // Phase 5: Logo scale to nav position + reveal wipe (2.5s - 3.0s)
    timeline.to(
      '.logo-mark',
      {
        scale: 0.5,
        x: '-45vw',
        y: '-45vh',
        duration: 0.5,
        ease: 'power2.inOut',
      },
      2.5
    );
    timeline.to(
      '.preloader-bg',
      {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.5,
        ease: 'power2.inOut',
      },
      2.5
    );

    // Phase 6: Hero content stagger (3.0s - 3.5s handled by Hero component)

    return () => {
      timeline.kill();
    };
  }, [setPreloaderComplete]);

  const isComplete = useAppStore((state) => state.isPreloaderComplete);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-substrate flex items-center justify-center preloader-bg"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo Mark SVG */}
        <svg
          className="logo-mark w-32 h-32"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="logo-path circuit-trace"
            d="M64 20 L64 64 L108 64"
            stroke="var(--color-copper)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="logo-path circuit-trace"
            d="M64 64 L20 64"
            stroke="var(--color-copper)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="logo-path circuit-trace"
            d="M64 64 L64 108"
            stroke="var(--color-copper)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="64" cy="64" r="8" fill="var(--color-copper)" />
          <circle cx="64" cy="20" r="6" fill="var(--color-copper)" />
          <circle cx="108" cy="64" r="6" fill="var(--color-copper)" />
          <circle cx="20" cy="64" r="6" fill="var(--color-copper)" />
          <circle cx="64" cy="108" r="6" fill="var(--color-copper)" />
        </svg>

        {/* Initializing Text */}
        <p className="init-text text-copper font-mono text-sm uppercase tracking-wider opacity-0">
          Initializing
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-trace rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-copper-flow transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-xs text-text-tertiary">{progress}%</p>
      </div>
    </div>
  );
}
```

### Kinetic Typography Components

```typescript
// components/typography/SplitTextReveal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface SplitTextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  splitBy?: 'chars' | 'words' | 'lines';
  stagger?: number;
  trigger?: string; // ScrollTrigger selector
  className?: string;
}

export function SplitTextReveal({
  children,
  as: Component = 'p',
  splitBy = 'chars',
  stagger = 0.03,
  trigger,
  className = '',
}: SplitTextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: splitBy });

    const animation = gsap.fromTo(
      split[splitBy],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger,
        duration: 0.6,
        ease: 'power2.out',
      }
    );

    if (trigger) {
      ScrollTrigger.create({
        trigger,
        start: 'top 80%',
        animation,
      });
    }

    return () => {
      split.revert();
      animation.kill();
    };
  }, [children, splitBy, stagger, trigger]);

  return (
    <Component ref={textRef as any} className={className}>
      {children}
    </Component>
  );
}
```

### SVG Circuit Animation System

```typescript
// components/circuit/CircuitBoard.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface CircuitBoardProps {
  variant: 'hero' | 'skills' | 'full';
  animateDataFlow?: boolean;
}

export function CircuitBoard({ variant, animateDataFlow = true }: CircuitBoardProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !animateDataFlow) return;

    const ctx = gsap.context(() => {
      // Animate data packets along circuit paths
      const packets = svgRef.current!.querySelectorAll('.data-packet');
      
      packets.forEach((packet, index) => {
        const pathId = packet.getAttribute('data-path');
        if (!pathId) return;

        gsap.to(packet, {
          motionPath: {
            path: pathId,
            align: pathId,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration: 3 + index * 0.5,
          repeat: -1,
          ease: 'none',
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [animateDataFlow]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      viewBox="0 0 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grid Pattern Background */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--color-trace)"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#grid)" />

      {/* Circuit Traces - variant specific */}
      {variant === 'hero' && (
        <>
          <path
            id="hero-path-1"
            d="M100 200 L500 200 L500 600"
            stroke="var(--color-copper)"
            strokeWidth="2"
            strokeDasharray="8 4"
            opacity="0.6"
          />
          <path
            id="hero-path-2"
            d="M1820 400 L1400 400 L1400 800"
            stroke="var(--color-copper)"
            strokeWidth="2"
            strokeDasharray="8 4"
            opacity="0.6"
          />
          
          {/* Data Packets */}
          {animateDataFlow && (
            <>
              <circle
                className="data-packet"
                data-path="#hero-path-1"
                cx="0"
                cy="0"
                r="4"
                fill="var(--color-signal-cyan)"
                filter="drop-shadow(0 0 8px var(--color-signal-cyan))"
              />
              <circle
                className="data-packet"
                data-path="#hero-path-2"
                cx="0"
                cy="0"
                r="4"
                fill="var(--color-signal-green)"
                filter="drop-shadow(0 0 8px var(--color-signal-green))"
              />
            </>
          )}
        </>
      )}

      {/* Component symbols (resistors, capacitors, ICs) */}
      <g className="component-symbols" opacity="0.4">
        <rect x="200" y="150" width="60" height="30" stroke="var(--color-copper)" strokeWidth="1.5" fill="none" />
        <circle cx="1600" cy="350" r="20" stroke="var(--color-copper)" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}
```

## Correctness Properties

**Property-Based Testing Assessment:** Property-based testing is NOT applicable to this feature.

**Rationale:**

The Schematic Network is a portfolio website focused on UI rendering, animations, and static content display. The workflow guidelines explicitly identify these as cases where PBT should not be used:

1. **UI Rendering and Layout** — React components, CSS animations, SVG visualizations
   - Alternative: Snapshot tests and visual regression testing

2. **Animation Effects** — GSAP animations, scroll-triggered effects, theme transitions
   - Alternative: Animation state tests and manual QA

3. **Static Content Display** — Project data, skills, education history
   - Alternative: Example-based unit tests

4. **Event-Driven Interactions** — Hover effects, cursor states, modal dialogs
   - Alternative: Integration tests for user flows

5. **No Pure Function Logic** — No parsers, serializers, or algorithms to test

**Testing Strategy:** See Testing Strategy section below for comprehensive alternative testing approaches including unit tests, integration tests, snapshot tests, visual regression tests, E2E tests, accessibility tests, and performance tests.

## Error Handling

### Error Boundaries

```typescript
// app/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-substrate p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Circuit Visual */}
        <svg className="w-32 h-32 mx-auto" viewBox="0 0 128 128">
          <path
            d="M20 64 L40 64 M40 40 L40 88 M40 64 L88 64"
            stroke="var(--color-signal-red)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
          />
          <circle cx="88" cy="64" r="8" fill="var(--color-signal-red)" />
          <text
            x="64"
            y="70"
            textAnchor="middle"
            className="font-mono text-xs fill-signal-red"
          >
            !
          </text>
        </svg>

        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-signal-red glitch-text">
            SYSTEM FAULT
          </h1>
          <p className="text-text-secondary font-mono text-sm">
            Error: {error.message || 'Unknown circuit malfunction'}
          </p>
          {error.digest && (
            <p className="text-text-tertiary font-mono text-xs">
              Diagnostic ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="primary" onClick={reset}>
            Retry Connection
          </Button>
          <Button variant="secondary" onClick={() => (window.location.href = '/')}>
            Return to Origin
          </Button>
        </div>
      </div>
    </div>
  );
}
```

```typescript
// app/not-found.tsx
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-substrate p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Broken Circuit Visual */}
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
          <path
            d="M20 100 L70 100"
            stroke="var(--color-copper)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M130 100 L180 100"
            stroke="var(--color-copper)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M80 90 L90 110 M110 90 L120 110"
            stroke="var(--color-signal-amber)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-pulse"
          />
          <text
            x="100"
            y="160"
            textAnchor="middle"
            className="font-mono text-sm fill-copper"
          >
            SIGNAL LOST
          </text>
        </svg>

        <div className="space-y-2">
          <h1 className="text-6xl font-display font-bold text-copper">404</h1>
          <p className="text-xl text-text-primary font-mono">
            The packet never arrived.
          </p>
          <p className="text-text-secondary text-sm">
            This route doesn't exist in the network topology.
          </p>
        </div>

        <Button variant="primary" asChild>
          <Link href="/">← Return to Origin</Link>
        </Button>
      </div>
    </div>
  );
}
```

### Form Validation & API Error Handling

```typescript
// components/sections/contact/HandshakeForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function HandshakeForm() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [currentStep, setCurrentStep] = useState<'SYN' | 'SYN-ACK' | 'ACK'>('SYN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formState.name.trim()) {
      setError('Name is required (SYN incomplete)');
      return;
    }
    if (!validateEmail(formState.email)) {
      setError('Valid email required (SYN-ACK failed)');
      return;
    }
    if (!formState.message.trim()) {
      setError('Message is required (ACK incomplete)');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Connection failed');
      }

      setSuccess(true);
      setFormState({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection refused');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: SYN (Name) */}
      <div className="space-y-2">
        <label className="block text-sm font-mono text-copper uppercase tracking-wider">
          Step 1: SYN
        </label>
        <input
          type="text"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          placeholder="Your name"
          className="w-full px-4 py-3 bg-substrate-raised border-2 border-trace rounded-md text-text-primary focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30 transition-all"
          disabled={isSubmitting}
        />
      </div>

      {/* Step 2: SYN-ACK (Email) */}
      <div className="space-y-2">
        <label className="block text-sm font-mono text-copper uppercase tracking-wider">
          Step 2: SYN-ACK
        </label>
        <input
          type="email"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 bg-substrate-raised border-2 border-trace rounded-md text-text-primary focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30 transition-all"
          disabled={isSubmitting}
        />
      </div>

      {/* Step 3: ACK (Message) */}
      <div className="space-y-2">
        <label className="block text-sm font-mono text-copper uppercase tracking-wider">
          Step 3: ACK
        </label>
        <textarea
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          placeholder="Your message"
          rows={6}
          className="w-full px-4 py-3 bg-substrate-raised border-2 border-trace rounded-md text-text-primary focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30 transition-all resize-none"
          disabled={isSubmitting}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-signal-red/10 border border-signal-red rounded-md">
          <p className="text-sm font-mono text-signal-red">{error}</p>
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div className="p-4 bg-signal-green/10 border border-signal-green rounded-md">
          <p className="text-sm font-mono text-signal-green">
            Connection Established ✓
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">Establishing Connection</span>
            <span className="inline-block w-4 h-4 border-2 border-substrate border-t-transparent rounded-full animate-spin" />
          </span>
        ) : (
          'Initiate Handshake'
        )}
      </Button>
    </form>
  );
}
```

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Resend API
    // const response = await resend.emails.send({
    //   from: 'portfolio@raflizaardiansa.com',
    //   to: 'rafli@example.com',
    //   subject: `Contact Form: ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    // });

    // Simulate successful send
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Testing Strategy

### Testing Approach

This portfolio is primarily a front-end showcase with complex animations and visual effects. The testing strategy focuses on:

1. **Unit Tests** for utility functions, hooks, and state management
2. **Integration Tests** for component interactions and form submissions
3. **E2E Tests** for critical user journeys
4. **Visual Regression Tests** for animation key frames (optional, manual)
5. **Accessibility Tests** for WCAG compliance
6. **Performance Monitoring** via Vercel Speed Insights

**Property-Based Testing is NOT applicable** for this project because:
- The portfolio is primarily visual/UI-focused with rendering, layouts, and animations
- Most features are side-effect operations (DOM manipulation, animations)
- No complex data transformations or algorithms that benefit from universal property testing
- Testing approach should focus on snapshot tests, visual regression, and interaction tests instead

### Unit Testing (Vitest)

```typescript
// hooks/__tests__/useScrollProgress.test.ts
import { renderHook, act } from '@testing-library/react';
import { useScrollProgress } from '../useScrollProgress';

describe('useScrollProgress', () => {
  it('should initialize with 0 progress', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('should update progress based on scroll position', () => {
    const { result, rerender } = renderHook(() => useScrollProgress());
    
    act(() => {
      // Simulate scroll event
      window.scrollY = 500;
      document.documentElement.scrollHeight = 2000;
      window.innerHeight = 1000;
      window.dispatchEvent(new Event('scroll'));
    });

    rerender();
    expect(result.current).toBeGreaterThan(0);
    expect(result.current).toBeLessThanOrEqual(100);
  });
});
```

```typescript
// lib/__tests__/animation-utils.test.ts
import { gsap } from 'gsap';
import { createScrollTrigger } from '../animation-utils';

describe('animation-utils', () => {
  it('should create ScrollTrigger with default config', () => {
    const trigger = createScrollTrigger({
      trigger: '.test-element',
      start: 'top center',
    });

    expect(trigger).toBeDefined();
    expect(trigger.vars.trigger).toBe('.test-element');
  });

  it('should merge custom config with defaults', () => {
    const trigger = createScrollTrigger({
      trigger: '.test-element',
      scrub: 2,
      pin: true,
    });

    expect(trigger.vars.scrub).toBe(2);
    expect(trigger.vars.pin).toBe(true);
  });
});
```

### Integration Testing (Playwright)

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to sections via nav links', async ({ page }) => {
    await page.goto('/');

    // Wait for preloader to complete
    await page.waitForSelector('[data-testid="hero-section"]', { timeout: 5000 });

    // Click About nav link
    await page.click('nav a[href="#about"]');
    await page.waitForTimeout(1000); // Wait for smooth scroll

    // Check if About section is in viewport
    const aboutSection = page.locator('#section-about');
    await expect(aboutSection).toBeInViewport();
  });

  test('should highlight active section in nav', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-section"]');

    // Scroll to Projects section
    await page.evaluate(() => {
      document.querySelector('#section-projects')?.scrollIntoView({ behavior: 'smooth' });
    });

    await page.waitForTimeout(1000);

    // Check active nav link
    const activeLink = page.locator('nav a[data-active="true"]');
    await expect(activeLink).toHaveText(/projects/i);
  });
});
```

```typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-section"]');

    // Navigate to contact section
    await page.click('nav a[href="#contact"]');
    await page.waitForTimeout(1000);

    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message.');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for success message
    await expect(page.locator('text=Connection Established')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-section"]');

    await page.click('nav a[href="#contact"]');
    await page.waitForTimeout(1000);

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'Test message');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Valid email required')).toBeVisible();
  });
});
```

### Accessibility Testing

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-section"]');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-section"]');

    // Tab through navigation
    await page.keyboard.press('Tab'); // Skip to content
    await page.keyboard.press('Tab'); // First nav link
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBe('A');
  });

  test('should respect prefers-reduced-motion', async ({ page, context }) => {
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });
    });

    await page.goto('/');
    
    // Check that animations are disabled
    const heroElement = page.locator('[data-testid="hero-statement"]');
    const animationState = await heroElement.evaluate(
      (el) => window.getComputedStyle(el).animationPlayState
    );
    
    // With reduced motion, animations should be paused or instant
    expect(animationState).not.toBe('running');
  });
});
```

### Performance Testing

```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should meet Core Web Vitals targets', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = window.performance.getEntriesByType('paint');
      
      const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
      const lcp = paintEntries.find((entry) => entry.name === 'largest-contentful-paint');

      return {
        fcp: fcp?.startTime || 0,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
        loadComplete: perfData.loadEventEnd - perfData.fetchStart,
      };
    });

    // Assert performance targets
    expect(metrics.fcp).toBeLessThan(1500); // FCP < 1.5s
    expect(metrics.domContentLoaded).toBeLessThan(3500); // TTI < 3.5s
  });

  test('should maintain 60fps during scroll animations', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-section"]');

    // Start performance measurement
    await page.evaluate(() => {
      (window as any).frameRates = [];
      let lastFrameTime = performance.now();
      
      function measureFrame() {
        const now = performance.now();
        const delta = now - lastFrameTime;
        const fps = 1000 / delta;
        (window as any).frameRates.push(fps);
        lastFrameTime = now;
        requestAnimationFrame(measureFrame);
      }
      
      measureFrame();
    });

    // Scroll through page
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    });

    await page.waitForTimeout(2000);

    // Get frame rate data
    const avgFrameRate = await page.evaluate(() => {
      const rates = (window as any).frameRates;
      return rates.reduce((sum: number, rate: number) => sum + rate, 0) / rates.length;
    });

    // Assert 60fps target (allow 55fps minimum for margin)
    expect(avgFrameRate).toBeGreaterThan(55);
  });
});
```

### Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Performance Optimization

### Animation Performance Strategy

**Core Principles:**
1. **GPU Compositing:** Animate only `transform` and `opacity`
2. **Layer Promotion:** Use `will-change` selectively and temporarily
3. **RAF Synchronization:** Single `requestAnimationFrame` loop for Lenis + GSAP
4. **Cleanup:** Proper `gsap.context()` usage in all components
5. **Reduced Motion:** Respect `prefers-reduced-motion` preference

```typescript
// lib/animation-utils.ts
import { gsap } from 'gsap';

/**
 * Promotes element to compositing layer temporarily during animation
 */
export function promoteLayer(element: HTMLElement, duration: number = 0) {
  element.style.willChange = 'transform, opacity';
  
  if (duration > 0) {
    setTimeout(() => {
      element.style.willChange = 'auto';
    }, duration * 1000);
  }
}

/**
 * Creates GSAP context with automatic cleanup
 */
export function createAnimationContext(
  scope: React.RefObject<HTMLElement>,
  setup: (ctx: gsap.Context) => void
) {
  const ctx = gsap.context(setup, scope);
  return () => ctx.revert();
}

/**
 * Safe ScrollTrigger creation with defaults
 */
export function createScrollTrigger(config: ScrollTrigger.Vars) {
  return gsap.to(config.trigger || '', {
    scrollTrigger: {
      ...config,
      invalidateOnRefresh: true,
    },
  });
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

```typescript
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```

**Usage in Components:**
```typescript
// components/sections/Hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animations only if motion is allowed
      gsap.from('.hero-statement', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} id="section-hero" data-testid="hero-section">
      {/* Hero content */}
    </section>
  );
}
```

### Bundle Size Optimization

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,

  // Compiler optimizations (React 19 + Babel compiler)
  experimental: {
    reactCompiler: true,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**Dynamic Imports:**
```typescript
// app/page.tsx
import dynamic from 'next/dynamic';

// Heavy animation components loaded dynamically
const CircuitBoard = dynamic(() => import('@/components/circuit/CircuitBoard').then(mod => ({ default: mod.CircuitBoard })), {
  loading: () => <div className="animate-pulse bg-substrate-raised h-64 rounded-lg" />,
  ssr: false,
});

const SkillGraph = dynamic(() => import('@/components/sections/skills/SkillGraph').then(mod => ({ default: mod.SkillGraph })), {
  loading: () => <div className="animate-pulse bg-substrate-raised h-96 rounded-lg" />,
  ssr: false,
});
```

### Responsive Performance

```typescript
// lib/scroll-config.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Configure ScrollTrigger defaults based on device
 */
export function initScrollTriggerDefaults() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  ScrollTrigger.defaults({
    // Disable parallax on mobile for performance
    scrub: isMobile ? false : 1,
    // Simplify markers on mobile
    markers: false,
  });

  // Disable complex animations on touch devices
  if (isTouch) {
    gsap.defaults({ duration: 0 });
  }
}
```

## SEO & Metadata

### Metadata Configuration

```typescript
// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0f0d' },
    { media: '(prefers-color-scheme: light)', color: '#f5f7f6' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://raflizaardiansa.com'),
  title: {
    default: 'Rafli Zaardiansa — Network, Hardware, Software & Cyber Security',
    template: '%s | Rafli Zaardiansa',
  },
  description:
    'Portfolio of Rafli Zaardiansa, a network, hardware, software, and cyber security engineer specializing in infrastructure design, network topology, and system security. Visualized as a living circuit board.',
  keywords: [
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
  authors: [{ name: 'Rafli Zaardiansa' }],
  creator: 'Rafli Zaardiansa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raflizaardiansa.com',
    siteName: 'The Schematic Network',
    title: 'Rafli Zaardiansa — Network, Hardware, Software & Cyber Security',
    description:
      'Engineering the invisible infrastructure that keeps the world connected. Portfolio visualized as an interactive circuit board.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'The Schematic Network - Rafli Zaardiansa Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafli Zaardiansa — Network, Hardware, Software & Cyber Security',
    description:
      'Engineering the invisible infrastructure that keeps the world connected.',
    images: ['/api/og'],
    creator: '@raflizaardiansa', // Update with actual Twitter handle
  },
  robots: {
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
    canonical: 'https://raflizaardiansa.com',
  },
};
```

### JSON-LD Structured Data

```typescript
// lib/metadata.ts
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rafli Zaardiansa',
    jobTitle: 'Network, Hardware, Software & Cyber Security Engineer',
    url: 'https://raflizaardiansa.com',
    sameAs: [
      'https://github.com/raflizaardiansa', // Update with actual profiles
      'https://linkedin.com/in/raflizaardiansa',
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'SMK Negeri 1 Cikarang Selatan',
        description: 'Teknik Komputer dan Jaringan',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'IPB University',
        description: 'Teknologi Rekayasa Komputer (D4) - Sedang Menempuh Pendidikan',
      },
    ],
    description:
      'Engineering the invisible infrastructure that keeps the world connected.',
  };
}

export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'The Schematic Network - Rafli Zaardiansa Portfolio',
    url: 'https://raflizaardiansa.com',
    mainEntity: generatePersonSchema(),
  };
}
```

```typescript
// app/layout.tsx (add to existing layout)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProfilePageSchema()),
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {/* ... providers and children ... */}
      </body>
    </html>
  );
}
```

### Dynamic OG Image Generation

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Rafli Zaardiansa';
  const subtitle = searchParams.get('subtitle') || 'Network, Hardware, Software & Cyber Security';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#0a0f0d',
          backgroundImage: 'radial-gradient(ellipse at 30% 20%, #111a16, #0a0f0d)',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Circuit pattern background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            backgroundImage:
              'linear-gradient(#1a3a2a 1px, transparent 1px), linear-gradient(90deg, #1a3a2a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            width: '80px',
            height: '80px',
            border: '3px solid #d4a574',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: '#d4a574',
            fontWeight: 'bold',
          }}
        >
          RZ
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#e8ede9',
            margin: 0,
            lineHeight: 1.2,
            maxWidth: '800px',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '32px',
            color: '#d4a574',
            margin: '24px 0 0 0',
            fontFamily: 'monospace',
          }}
        >
          {subtitle}
        </p>

        {/* Tagline */}
        <p
          style={{
            fontSize: '20px',
            color: '#a8b5ad',
            margin: '16px 0 0 0',
            maxWidth: '700px',
          }}
        >
          Engineering the invisible infrastructure that keeps the world connected.
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

## Deployment & Infrastructure

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Environment Variables

```bash
# .env.example
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://raflizaardiansa.com

# Contact Form (Resend)
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL_TO=rafli@example.com

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_vercel_analytics_id
```

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm run start &
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
          uploadArtifacts: true
          temporaryPublicStorage: true
          budgetPath: ./lighthouse-budget.json
```

```json
// lighthouse-budget.json
{
  "performance": 95,
  "accessibility": 95,
  "best-practices": 90,
  "seo": 100
}
```

---

This comprehensive design document provides the technical blueprint for building The Schematic Network portfolio website. The architecture prioritizes performance, accessibility, and maintainability while delivering a visually stunning, Awwwards-level experience that embodies the "portfolio as living infrastructure" metaphor.
