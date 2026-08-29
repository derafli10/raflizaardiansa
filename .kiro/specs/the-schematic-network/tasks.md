# Implementation Plan: The Schematic Network

## Overview

This implementation plan transforms the elite portfolio website design into a fully functional Next.js application with advanced animations and interactive circuit board visualizations. The build follows a bottom-up approach: design system foundations first, then core infrastructure (providers, state management), followed by atomic UI components, animation systems, page sections, and finally integration and polish.

**Key Implementation Principles:**
- Build reusable primitives before composites
- Establish animation infrastructure early
- Test incrementally with visual validation
- Maintain 60fps performance throughout
- Follow accessibility standards from the start

## Tasks

- [x] 1. Design System Foundation & Configuration
  - [x] 1.1 Create design token CSS modules and configure fonts
    - Create `src/styles/tokens/` directory with typography.css, colors.css, spacing.css files
    - Implement CSS custom properties for type scale (modular scale 1.25), color palette (PCB-inspired), and spacing system (8px-based)
    - Configure `src/lib/fonts.ts` with Space Grotesk, Inter, and JetBrains Mono using next/font/google
    - Create theme CSS files: `theme-dark.css` and `theme-light.css` with data-theme attribute selectors
    - Update `src/app/globals.css` to import all token modules and apply base styles
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 1.2 Configure Next.js, Tailwind CSS, and TypeScript
    - Update `next.config.ts` with image optimization (AVIF, WebP), security headers, and React strict mode
    - Configure `tailwind.config.ts` with responsive breakpoints, custom colors from tokens, spacing scale, and font families
    - Extend Tailwind with custom utilities for circuit animations, glow effects, and GPU-accelerated transforms
    - Configure `postcss.config.mjs` for Tailwind CSS 4
    - Update `tsconfig.json` with path aliases (@/components, @/lib, @/stores, etc.)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 24.1, 24.2, 24.3, 24.4, 24.5_

  - [x] 1.3 Set up development quality infrastructure
    - Configure ESLint with TypeScript rules in `eslint.config.mjs`
    - Create `.prettierrc` with code formatting rules
    - Set up Husky pre-commit hooks with `npx husky init`
    - Configure lint-staged in `package.json` to run ESLint and Prettier on staged files
    - Create `.husky/pre-commit` hook to run lint-staged
    - Add npm scripts: `lint`, `format`, `type-check`
    - _Requirements: 29.1, 29.2, 29.3, 29.4_

- [x] 2. Core Infrastructure & State Management
  - [x] 2.1 Create TypeScript type definitions
    - Create `src/types/project.ts` with Project, ProjectMetric, TopologyNode interfaces
    - Create `src/types/skill.ts` with Skill, SkillCategory, ProficiencyLevel types
    - Create `src/types/certificate.ts` with Certificate interface
    - Create `src/types/index.ts` to export all types
    - _Requirements: 19.9, 19.10_

  - [x] 2.2 Create Zustand state stores
    - Create `src/stores/theme-store.ts` with mode, resolved theme, setMode, and localStorage persistence
    - Create `src/stores/nav-store.ts` with activeSection, isMenuOpen, scrollProgress state
    - Create `src/stores/app-store.ts` with isLoaded, isPreloaderComplete, cursorState management
    - Create `src/stores/audio-store.ts` with isMuted, volume, isAmbientPlaying state (optional)
    - Implement shallow selectors for performance optimization
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7_

  - [x] 2.3 Create utility functions and helpers
    - Create `src/lib/utils.ts` with cn() function using clsx and tailwind-merge
    - Create `src/lib/animation-utils.ts` with GSAP helper functions and prefers-reduced-motion detection
    - Create `src/lib/scroll-config.ts` with ScrollTrigger default configuration
    - Create `src/lib/lenis-gsap-bridge.ts` with Lenis + GSAP synchronization utilities
    - Create `src/lib/metadata.ts` with SEO helper functions for structured data
    - _Requirements: 20.10, 22.1, 22.2, 22.3, 22.4, 22.5, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9_

  - [x] 2.4 Create React context providers
    - Create `src/providers/ThemeProvider.tsx` using next-themes for theme management
    - Create `src/providers/LenisProvider.tsx` with Lenis initialization and GSAP ticker synchronization
    - Create `src/providers/AnimationProvider.tsx` for GSAP plugin registration and global animation setup
    - Implement context export hooks: useTheme(), useLenis()
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7_

- [x] 3. Custom React Hooks
  - [x] 3.1 Create scroll and navigation hooks
    - Create `src/hooks/useScrollProgress.ts` to track scroll percentage
    - Create `src/hooks/useActiveSection.ts` with IntersectionObserver for section detection
    - Create `src/hooks/useScrollDirection.ts` to detect scroll up/down
    - Create `src/hooks/useLenis.ts` to access Lenis context for imperative scrollTo calls
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 22.6, 22.7_

  - [x] 3.2 Create interaction effect hooks
    - Create `src/hooks/useMagneticElement.ts` with GSAP-based magnetic pull effect
    - Create `src/hooks/useTiltEffect.ts` for 3D card tilt on mouse move
    - Create `src/hooks/useCursorState.ts` to manage custom cursor state changes
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

  - [x] 3.3 Create accessibility and performance hooks
    - Create `src/hooks/useReducedMotion.ts` to detect prefers-reduced-motion preference
    - Implement hook to disable animations when preference is active
    - _Requirements: 11.7, 28.5_

- [ ] 4. UI Primitive Components (Atoms)
  - [x] 4.1 Create Button primitive component
    - Create `src/components/ui/Button.tsx` with CVA variants: primary, secondary, ghost
    - Implement sizes: sm, md, lg with proper spacing and font sizing
    - Add magnetic hover effect with data-magnetic attribute support
    - Implement circuit-border animation for secondary variant
    - Add proper focus states with copper glow ring
    - Export buttonVariants and ButtonProps
    - _Requirements: 7.1, 7.2, 20.1, 20.2, 28.2, 28.3_

  - [x] 4.2 Create Card primitive component
    - Create `src/components/ui/Card.tsx` with variants: default, elevated, interactive
    - Implement CardHeader, CardTitle, CardDescription, CardContent, CardFooter subcomponents
    - Add 3D tilt effect for interactive variant
    - Implement glow border on hover with copper color
    - Use forwardRef for all components
    - _Requirements: 7.3, 20.3_

  - [-] 4.3 Create form input components
    - Create `src/components/ui/Input.tsx` with floating label and focus glow
    - Create `src/components/ui/Textarea.tsx` with similar styling
    - Implement proper ARIA labels and error state handling
    - Add copper border on focus with ring effect
    - Ensure 44x44px minimum touch target size
    - _Requirements: 7.6, 16.6, 16.7, 16.9, 27.3, 28.2, 28.10_

  - [-] 4.4 Create Badge and Tooltip components
    - Create `src/components/ui/Badge.tsx` with color-coding by category: skill, status, tag
    - Implement slide background fill animation on hover
    - Create `src/components/ui/Tooltip.tsx` with positioning: top, bottom, left, right
    - Use Headless UI Popover as base for accessible tooltips
    - Add fade and translate entrance animations
    - _Requirements: 7.5, 20.4, 20.7_

  - [ ] 4.5 Create Modal and Skeleton components
    - Create `src/components/ui/Modal.tsx` using Headless UI Dialog with AnimatePresence
    - Implement sizes: sm, md, lg, xl, full with responsive behavior
    - Add circuit-trace border expansion animation on open/close
    - Create close button with keyboard accessibility (Escape key)
    - Create `src/components/ui/Skeleton.tsx` with shapes: line, circle, card
    - Implement pulse animation matching component structure
    - _Requirements: 8.3, 8.4, 8.7, 20.5, 20.8, 26.3, 28.6_

  - [ ] 4.6 Create Certificate Card component
    - Create `src/components/ui/CertificateCard.tsx` with LinkedIn-style layout
    - Display issuer logo/icon, title, organization, dates, credential ID
    - Add "Show credential" button with ExternalLink icon
    - Implement proper spacing and typography hierarchy
    - Ensure external links open in new tab with rel="noopener noreferrer"
    - _Requirements: 13.5, 13.6, 13.7, 13.8, 20.9, 18.6_

- [ ] 5. Layout and Decorative Components
  - [ ] 5.1 Create layout components
    - Create `src/components/layout/Container.tsx` with responsive max-width and padding
    - Create `src/components/layout/Grid.tsx` with responsive grid system
    - Implement proper breakpoints matching Tailwind config
    - _Requirements: 19.4, 27.1, 27.2, 27.4, 27.5, 27.6, 27.7_

  - [ ] 5.2 Create decorative pattern components
    - Create `src/components/decorative/GridPattern.tsx` for background grid with SVG pattern
    - Create `src/components/decorative/CircuitTrace.tsx` for animated circuit path decorations
    - Create `src/components/decorative/SchematicPattern.tsx` with resistor, capacitor, IC symbols
    - Implement proper opacity and blend modes for background effects
    - _Requirements: 2.6, 10.1, 10.2_

- [ ] 6. Custom Cursor System
  - [ ] 6.1 Implement custom cursor component
    - Create `src/components/cursor/CustomCursor.tsx` with RAF-based position tracking
    - Implement lerp smoothing for fluid cursor movement
    - Create cursor states: dot (8px), grow (48px), blend (64px), view (64px with label)
    - Add GSAP transitions between states
    - Hide cursor on mobile/tablet (pointer: coarse detection)
    - Sync cursor state with Zustand app-store
    - Apply pointer-events: none to avoid interference
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ] 7. Animation System Components
  - [ ] 7.1 Create kinetic typography components
    - Create `src/components/typography/SplitTextReveal.tsx` with GSAP SplitText
    - Support split by chars, words, lines with configurable stagger
    - Implement ScrollTrigger integration for viewport-triggered reveals
    - Create `src/components/typography/TypewriterText.tsx` with character-by-character reveal
    - Create `src/components/typography/ScrambleText.tsx` using GSAP TextPlugin
    - Create `src/components/typography/CountUp.tsx` for numeric stat animations
    - Respect prefers-reduced-motion by showing text instantly
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ] 7.2 Create SVG circuit animation components
    - Create `src/components/circuit/CircuitBoard.tsx` with variants: hero, skills, full
    - Implement layers: grid pattern, trace paths, component symbols, data dots, glow effects
    - Create `src/components/circuit/Trace.tsx` for DrawSVG path animations
    - Create `src/components/circuit/Node.tsx` for circuit connection points with scale/glow on activation
    - Create `src/components/circuit/DataFlow.tsx` for animated data packets using MotionPath
    - Create `src/components/circuit/ComponentSymbol.tsx` with MorphSVG shape transitions
    - Apply blur and opacity filters for glow effects
    - Use only transform and opacity for GPU acceleration
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8_

  - [ ] 7.3 Create scroll narrative system
    - Create `src/components/scroll/ScrollNarrative.tsx` with persistent circuit path SVG
    - Implement six nodes for Hero, About, Skills, Projects, Experience, Contact sections
    - Use GSAP ScrollTrigger with scrub: 1 for scroll-synchronized trace animation
    - Create `src/components/scroll/CircuitPath.tsx` for the main SVG circuit path
    - Create `src/components/scroll/SectionNode.tsx` for individual node activation
    - Update scroll progress in nav-store
    - Implement gsap.context() cleanup on unmount
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

  - [ ] 7.4 Create preloader and boot sequence
    - Create `src/components/preloader/Preloader.tsx` with 3.5s boot animation
    - Implement 6 phases: circuit traces (0-0.5s), logo formation (0.5-1.5s), pulse (1.5-2.0s), progress bar (2.0-2.5s), scale/wipe (2.5-3.0s), hero stagger (3.0-3.5s)
    - Use DrawSVG for circuit trace animations from center outward
    - Check sessionStorage to show preloader only once per session
    - Set preloader completion flag in app-store
    - Create `src/components/preloader/CircuitAssembly.tsx` for logo SVG
    - Create `src/components/preloader/BootSequence.tsx` for animation timeline
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 26.1_

  - [ ] 7.5 Create page transition components
    - Create `src/components/transitions/PageTransition.tsx` with AnimatePresence wrapper
    - Create `src/components/transitions/CircuitWipe.tsx` for circuit-trace border expansion/collapse
    - Create `src/components/transitions/variants.ts` with reusable Motion variants
    - Implement fade, slide, scale, and circuit-trace animations
    - Define exit variants for all animated components
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 26.2_

- [ ] 8. Navigation System
  - [ ] 8.1 Create navigation components
    - Create `src/components/navigation/Navbar.tsx` with logo, section links, theme toggle
    - Implement scroll progress bar showing page percentage
    - Add transparent to solid background transition on scroll
    - Implement hide on scroll down, reveal on scroll up behavior
    - Create `src/components/navigation/NavLink.tsx` with underline DrawSVG animation on hover
    - Highlight active section based on useActiveSection hook
    - Implement smooth scroll to section using Lenis scrollTo
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.9_

  - [ ] 8.2 Create mobile navigation
    - Create `src/components/navigation/MobileMenu.tsx` with hamburger icon
    - Implement fullscreen overlay with circuit trace animation
    - Show menu below 768px breakpoint
    - Add proper focus trap when menu is open
    - Implement slide-in animation with Motion AnimatePresence
    - Update nav-store isMenuOpen state
    - _Requirements: 17.7, 17.8, 27.1, 28.6_

  - [ ] 8.3 Create scroll progress indicator
    - Create `src/components/navigation/ScrollProgress.tsx` component
    - Display as horizontal bar in navbar showing scroll percentage
    - Sync with useScrollProgress hook
    - Animate bar width with smooth transitions
    - _Requirements: 17.2, 6.8_

  - [ ] 8.4 Create theme toggle component
    - Create `src/components/navigation/ThemeToggle.tsx` with sun/moon icons
    - Support three modes: system, dark, light
    - Persist selection to localStorage via theme-store
    - Add keyboard accessibility with ARIA labels
    - Implement smooth icon transition animation
    - Apply 300ms transition to colors when theme changes
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ] 8.5 Implement skip-to-content link
    - Create skip link as first focusable element in Navbar
    - Position offscreen until keyboard focused
    - Smooth scroll to main content on activation
    - Style with copper glow focus ring
    - _Requirements: 17.9, 28.4_

- [ ] 9. Static Data and Content
  - [ ] 9.1 Create project data
    - Create `src/data/projects.ts` with array of Project objects
    - Include all required fields: id, slug, name, type, thumbnail, tags, summary
    - Add detailed case study content: problem, process, solution, metrics
    - Include topology data for network diagrams
    - Add demo and repo URLs where applicable
    - Create at least 4-6 diverse projects showcasing different engineering domains
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [ ] 9.2 Create skills data
    - Create `src/data/skills.ts` with array of Skill objects
    - Group skills by category: networking, hardware, software, security
    - Assign proficiency levels: proficient, intermediate, learning
    - Define skill connections for graph visualization
    - Calculate x, y positions for network topology layout
    - Link skills to related projects by ID
    - Create at least 15-20 skills with proper relationships
    - _Requirements: 15.1, 15.2, 15.3, 15.6_

  - [ ] 9.3 Create certificate data
    - Create `src/data/certificates.ts` with array of Certificate objects
    - Include issuer information, dates, credential IDs
    - Add verification URLs for each certificate
    - Organize chronologically with most recent first
    - _Requirements: 13.5, 13.6, 13.7, 13.8_

- [ ] 10. Hero Section
  - [ ] 10.1 Create hero section component
    - Create `src/components/sections/Hero.tsx` as main section wrapper
    - Occupy 100vh on all devices
    - Create `src/components/sections/hero/HeroStatement.tsx` with name, role, tagline
    - Implement SplitText reveal for name "Rafli Zaardiansa"
    - Add typewriter animation for role "Network, Hardware, Software & Cyber Security"
    - Add fade-in for tagline "Engineering the invisible infrastructure..."
    - Create `src/components/sections/hero/HeroCircuit.tsx` for animated background
    - Create `src/components/sections/hero/ScrollIndicator.tsx` with pulse animation
    - Implement smooth scroll to About section on click using Lenis
    - Stagger in hero content between 3.0s-3.5s after preloader
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8_

- [ ] 11. About Section
  - [ ] 11.1 Create about section component
    - Create `src/components/sections/About.tsx` as main section wrapper
    - Create `src/components/sections/about/OriginStory.tsx` with narrative paragraph
    - Create `src/components/sections/about/EducationPath.tsx` displaying education history
    - Show SMK Negeri 1 Cikarang Selatan (Teknik Komputer dan Jaringan)
    - Show IPB University (Teknologi Rekayasa Komputer D4) with "Sedang Menempuh Pendidikan" status
    - Create `src/components/sections/about/Philosophy.tsx` with "The best infrastructure is invisible" quote
    - Create `src/components/sections/about/Credentials.tsx` section
    - Map certificates data to CertificateCard components
    - Implement responsive 2-column layout on md+ breakpoints
    - Add scroll-triggered fade-in animations for each subsection
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 13.10, 27.5_

- [ ] 12. Skills Section
  - [ ] 12.1 Create skills network topology
    - Create `src/components/sections/Skills.tsx` as main section wrapper
    - Create `src/components/sections/skills/SkillGraph.tsx` with interactive SVG network graph
    - Render nodes with color-coding: green (proficient), cyan (intermediate), amber (learning)
    - Draw connection lines between related skills
    - Implement hover state to highlight connected nodes and dim unrelated nodes
    - Create `src/components/sections/skills/SkillNode.tsx` for individual skill circles
    - Add entrance animation with stagger when section enters viewport
    - Implement keyboard navigation with focus states
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.6, 15.8, 15.10_

  - [ ] 12.2 Create skill detail panel
    - Create `src/components/sections/skills/SkillDetail.tsx` component
    - Display on skill node click with skill description, proficiency level, related projects
    - Implement slide-in animation from right
    - Show connected skills as clickable badges
    - Add close button with keyboard support
    - Provide ARIA descriptions for screen readers
    - _Requirements: 15.5, 15.9_

  - [ ] 12.3 Implement responsive skill graph
    - Simplify graph layout on mobile (single column or simplified grid)
    - Scale graph appropriately across breakpoints
    - Disable complex interactions on mobile for performance
    - _Requirements: 15.7, 27.1, 27.2, 27.8_

- [ ] 13. Projects Section
  - [ ] 13.1 Create project card grid
    - Create `src/components/sections/Projects.tsx` as main section wrapper
    - Create `src/components/sections/projects/ProjectCard.tsx` component
    - Display thumbnail, project name, type, technology tags
    - Implement responsive grid: 1 column (mobile), 2 columns (sm-md), 3 columns (lg+)
    - Add magnetic hover effect and 3D tilt using hooks
    - Update cursor state to "view" on hover
    - Implement lazy loading for project images with blur placeholders
    - _Requirements: 14.1, 14.2, 14.9, 14.10, 26.4, 27.4, 27.6_

  - [ ] 13.2 Create project modal and case study
    - Create `src/components/sections/projects/ProjectModal.tsx` using Modal primitive
    - Structure content as PROBLEM → PROCESS → SOLUTION with visual separators
    - Display quantitative metrics with CountUp animations
    - Create `src/components/sections/projects/TopologyDiagram.tsx` for network architecture
    - Render interactive SVG diagram from topology data
    - Add links to live demo and source code repository
    - Implement circuit-trace border animation on open/close
    - Support keyboard close with Escape key and focus trap
    - _Requirements: 14.3, 14.4, 14.5, 14.6, 14.7, 14.8_

- [ ] 14. Contact Section
  - [ ] 14.1 Create TCP handshake contact form
    - Create `src/components/sections/Contact.tsx` as main section wrapper
    - Create `src/components/sections/contact/HandshakeForm.tsx` component
    - Structure inputs as 3-way handshake: SYN (name), SYN-ACK (email), ACK (message)
    - Display step labels "SYN", "SYN-ACK", "ACK" for each field
    - Implement email format validation before submission
    - Validate all required fields are filled
    - Disable submit button during processing with loading state
    - Create `src/components/sections/contact/ConnectionStatus.tsx` for success/error display
    - Show "Connection Established ✓" with circuit-to-checkmark morph on success
    - Display error message with retry option on failure
    - Ensure proper focus states and ARIA labels
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9_

  - [ ] 14.2 Create contact API route
    - Create `src/app/api/contact/route.ts` with POST handler
    - Integrate with Resend API for email delivery
    - Validate request body with proper error responses
    - Return JSON with success/error status
    - Add rate limiting considerations
    - Handle environment variables for API keys
    - _Requirements: 16.3, 16.10_

- [ ] 15. Footer
  - [ ] 15.1 Create footer component
    - Create `src/components/sections/Footer.tsx` component
    - Add decorative circuit traces leading to ground symbol ⏚
    - Display social links: GitHub, LinkedIn, Email, Resume
    - Display site navigation: About, Projects, Skills, Contact
    - Show copyright "© 2026 Rafli Zaardiansa"
    - Show tagline "Every packet finds its destination. 🌐"
    - Open social links in new tab with rel="noopener noreferrer"
    - Maintain consistent spacing across responsive breakpoints
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7_

- [ ] 16. Error Pages
  - [ ] 16.1 Create 404 page
    - Create `src/app/not-found.tsx` with "SIGNAL LOST · 404" heading
    - Display broken circuit trace SVG visual
    - Show message "The packet never arrived."
    - Add "Return to Origin" link to home page
    - Maintain proper heading hierarchy and keyboard navigation
    - _Requirements: 25.1, 25.2, 25.3, 25.8_

  - [ ] 16.2 Create error boundary pages
    - Create `src/app/error.tsx` with "SYSTEM FAULT" heading and red glitch effect
    - Implement retry button and return to home link
    - Create `src/app/global-error.tsx` for root-level errors
    - Log errors to console for debugging
    - Apply thematic circuit visualization to all error states
    - _Requirements: 25.4, 25.5, 25.6, 25.7, 25.8_

  - [ ] 16.3 Create loading fallback
    - Create `src/app/loading.tsx` with circuit trace animation
    - Use CircuitWipe transition component
    - Provide ARIA labels for screen reader announcement
    - _Requirements: 26.1, 26.2, 26.6, 26.7_

- [ ] 17. Root Layout and Page Integration
  - [ ] 17.1 Configure root layout with providers
    - Update `src/app/layout.tsx` with provider composition
    - Wrap app with ThemeProvider → LenisProvider → AnimationProvider hierarchy
    - Apply font variables to HTML element
    - Add metadata configuration with title, description, Open Graph, Twitter Card
    - Embed JSON-LD structured data for Person and ProfilePage schemas
    - Add Vercel Speed Insights and Analytics components
    - Set lang="en" attribute on HTML element
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.8, 28.11, 30.1, 30.2_

  - [ ] 17.2 Compose main page from sections
    - Update `src/app/page.tsx` to compose all sections
    - Render sections in order: Preloader, Navbar, ScrollNarrative, Hero, About, Skills, Projects, Contact, Footer
    - Add CustomCursor component
    - Wrap content with proper semantic HTML5: main, section elements with IDs
    - Apply section IDs for scroll navigation: #hero, #about, #skills, #projects, #contact
    - Add ARIA landmarks for major regions
    - _Requirements: 28.9, 28.12_

  - [ ] 17.3 Create dynamic OG image generation
    - Create `src/app/api/og/route.tsx` using next/og ImageResponse
    - Generate dynamic social preview images with circuit board background
    - Include name, role, and circuit graphic
    - Configure proper dimensions for Open Graph (1200x630)
    - _Requirements: 23.7_

- [ ] 18. Checkpoint - Core functionality validation
  - Verify all sections render correctly
  - Test smooth scrolling with Lenis
  - Validate theme toggle between dark/light modes
  - Check custom cursor states on desktop
  - Ensure preloader shows only once per session
  - Test navigation menu on mobile
  - Verify all animations respect prefers-reduced-motion
  - Ensure all tests pass, ask the user if questions arise

- [ ] 19. Testing Infrastructure
  - [ ] 19.1 Set up Vitest for unit testing
    - Create `vitest.config.ts` with React testing configuration
    - Configure path aliases matching tsconfig.json
    - Set up @testing-library/react for component testing
    - Add test scripts to package.json: `test`, `test:watch`, `test:coverage`
    - Create example tests for utility functions in `src/lib/__tests__/`
    - Create example tests for custom hooks in `src/hooks/__tests__/`
    - _Requirements: 29.5_

  - [ ]* 19.2 Write unit tests for core utilities
    - Test animation-utils functions (easing, timeline helpers)
    - Test metadata helpers (structured data generation)
    - Test custom hooks (useScrollProgress, useMagneticElement, useTiltEffect)
    - Test Zustand store actions and state updates
    - Achieve >80% coverage for utility functions

  - [ ] 19.3 Set up Playwright for E2E testing
    - Create `playwright.config.ts` with browser configurations
    - Configure test projects for Chromium, Firefox, WebKit
    - Set base URL for local development
    - Add test scripts: `test:e2e`, `test:e2e:headed`, `test:e2e:debug`
    - Create `e2e` directory for test files
    - _Requirements: 29.6_

  - [ ]* 19.4 Write E2E tests for critical user flows
    - Create `e2e/navigation.spec.ts` for scroll navigation and section activation
    - Create `e2e/contact-form.spec.ts` for form validation and submission
    - Create `e2e/theme-toggle.spec.ts` for dark/light mode switching
    - Create `e2e/mobile-menu.spec.ts` for responsive navigation
    - Test preloader behavior and sessionStorage persistence

  - [ ]* 19.5 Write accessibility tests
    - Create `e2e/accessibility.spec.ts` using @axe-core/playwright
    - Test keyboard navigation through all interactive elements
    - Verify ARIA labels and landmarks
    - Check color contrast ratios
    - Test focus management in modals
    - Validate heading hierarchy
    - Test skip-to-content link functionality
    - _Requirements: 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7, 28.8, 28.9, 28.10, 28.11, 28.12_

  - [ ]* 19.6 Write performance tests
    - Create `e2e/performance.spec.ts` to measure Core Web Vitals
    - Test Largest Contentful Paint (LCP) < 2.5s
    - Test First Input Delay (FID) < 100ms
    - Test Cumulative Layout Shift (CLS) < 0.1
    - Verify frame rate consistency during animations using Chrome DevTools protocol
    - Test bundle size and ensure it's within reasonable limits
    - _Requirements: 11.8, 11.9, 11.10, 30.3_

- [ ] 20. Performance Optimization
  - [ ] 20.1 Optimize animations for 60fps
    - Audit all animations to use only transform and opacity properties
    - Add will-change property during active animations via GSAP
    - Remove will-change after animation completion
    - Implement gsap.context() cleanup in all useLayoutEffect hooks
    - Verify no layout properties are animated (width, height, top, left, margin, padding)
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ] 20.2 Implement lazy loading and code splitting
    - Dynamically import Rive canvas components
    - Lazy load modal content until first open
    - Implement route-based code splitting for large components
    - Use next/dynamic for heavy animation components
    - _Requirements: 11.6, 14.10_

  - [ ] 20.3 Configure bundle size optimization
    - Update next.config.ts with webpack bundle analyzer
    - Enable React compiler if available in Next.js 16.3
    - Minimize third-party library imports (tree-shaking)
    - Optimize image sizes and formats (AVIF, WebP)
    - Configure proper cache headers for static assets
    - _Requirements: 24.1, 24.2, 24.3_

  - [ ] 20.4 Optimize responsive performance
    - Disable parallax effects on mobile devices
    - Simplify circuit animations on viewports < 640px
    - Reduce animation complexity on touch devices
    - Implement responsive image loading with proper srcset
    - _Requirements: 27.2, 27.8, 27.9_

- [ ] 21. SEO and Metadata
  - [ ] 21.1 Implement comprehensive metadata
    - Ensure all metadata is configured in layout.tsx
    - Verify Open Graph image generation works correctly
    - Test social media preview cards (Twitter, LinkedIn, Facebook)
    - Implement canonical URLs for all pages
    - Add robots.txt and sitemap.xml
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.9_

  - [ ] 21.2 Validate structured data
    - Test JSON-LD schemas with Google Rich Results Test
    - Verify Person schema with correct properties
    - Verify ProfilePage schema
    - Add breadcrumb schema if applicable
    - _Requirements: 23.5_

- [ ] 22. CI/CD and Monitoring
  - [ ] 22.1 Set up GitHub Actions workflow
    - Create `.github/workflows/ci.yml` for continuous integration
    - Configure workflow to run on pull requests and main branch commits
    - Add job steps: checkout, setup Node.js, install dependencies
    - Add lint step: run ESLint
    - Add type-check step: run tsc --noEmit
    - Add build step: run next build
    - Add test step: run vitest and Playwright tests
    - Display build status badge in README
    - _Requirements: 29.7, 29.8, 29.9, 29.10_

  - [ ] 22.2 Configure Lighthouse CI
    - Create `.github/workflows/lighthouse.yml`
    - Set up Lighthouse CI to run on pull requests
    - Configure performance budget: performance score > 95
    - Configure accessibility budget: accessibility score > 95
    - Fail builds if scores drop below thresholds
    - _Requirements: 30.5, 30.6, 30.7_

  - [ ] 22.3 Verify monitoring integrations
    - Test Vercel Speed Insights data collection
    - Verify Vercel Analytics tracking
    - Check Core Web Vitals reporting: LCP, FID, CLS
    - Ensure privacy-friendly tracking (no personal data)
    - _Requirements: 30.1, 30.2, 30.3, 30.4_

- [ ] 23. Final Polish and Validation
  - [ ] 23.1 Cross-browser testing
    - Test in Chrome, Firefox, Safari, Edge
    - Verify all animations work consistently
    - Check GSAP plugin compatibility
    - Test WebKit-specific issues (Safari)
    - Validate touch interactions on mobile devices

  - [ ] 23.2 Accessibility audit
    - Run complete keyboard navigation test
    - Use screen reader (NVDA/JAWS/VoiceOver) to test content
    - Verify all images have alt text
    - Check focus indicators are visible
    - Validate ARIA labels and landmarks
    - Test with prefers-reduced-motion enabled
    - _Requirements: 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7, 28.8, 28.9, 28.10, 28.11, 28.12_

  - [ ] 23.3 Performance validation
    - Run Lighthouse audit and verify >95 score across all categories
    - Measure FCP < 1.5s and TTI < 3.5s
    - Verify 60fps during scroll and animations using Chrome DevTools
    - Test on throttled network (3G, 4G)
    - Test on low-end devices
    - _Requirements: 11.8, 11.9, 11.10, 30.5, 30.6, 30.7_

  - [ ] 23.4 Content and copy review
    - Proofread all text content for typos
    - Verify project case studies are compelling
    - Check certificate data accuracy
    - Validate social links and external URLs
    - Ensure resume link is functional

  - [ ] 23.5 Responsive design validation
    - Test at all breakpoints: 640px, 768px, 1024px, 1280px, 1536px
    - Verify touch targets are 44x44px minimum
    - Check mobile menu functionality
    - Test horizontal scrolling issues
    - Validate tablet landscape and portrait layouts
    - _Requirements: 27.1, 27.2, 27.3, 27.4, 27.5, 27.6, 27.7, 27.10_

- [ ] 24. Final Checkpoint and Deployment Preparation
  - Run complete test suite (unit + E2E + accessibility + performance)
  - Verify all Lighthouse scores > 95
  - Check bundle size is optimized
  - Ensure environment variables are configured for production
  - Test production build locally with `npm run build && npm run start`
  - Validate all external API integrations (Resend)
  - Ensure all tasks pass, ask the user if questions arise

## Notes

- **Animation Performance:** All animations use GPU-accelerated properties (transform, opacity) only. This ensures 60fps on all devices.
- **Testing Strategy:** Tasks marked with `*` are optional test tasks. Core functionality tests are prioritized. Property-based testing is not applicable for this UI-focused portfolio site.
- **Accessibility First:** Focus states, keyboard navigation, and ARIA labels are implemented from the start, not bolted on later.
- **Progressive Enhancement:** The site works with JavaScript disabled for core content, with animations enhancing the experience.
- **Mobile Optimization:** Complex animations are simplified on mobile devices to maintain performance.
- **Checkpoint Tasks:** Use checkpoint tasks to verify functionality before proceeding to dependent features.
- **Incremental Development:** Each task builds on previous tasks, ensuring stable progress without orphaned code.

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1.1", "1.2", "1.3"]
    },
    {
      "id": 1,
      "tasks": ["2.1", "2.2", "2.3"]
    },
    {
      "id": 2,
      "tasks": ["2.4", "3.1", "3.2", "3.3"]
    },
    {
      "id": 3,
      "tasks": ["4.1", "4.2", "4.3", "4.4", "5.1", "5.2"]
    },
    {
      "id": 4,
      "tasks": ["4.5", "4.6", "6.1", "9.1", "9.2", "9.3"]
    },
    {
      "id": 5,
      "tasks": ["7.1", "7.2"]
    },
    {
      "id": 6,
      "tasks": ["7.3", "7.4", "7.5"]
    },
    {
      "id": 7,
      "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5"]
    },
    {
      "id": 8,
      "tasks": ["10.1", "11.1"]
    },
    {
      "id": 9,
      "tasks": ["12.1", "13.1"]
    },
    {
      "id": 10,
      "tasks": ["12.2", "12.3", "13.2", "14.1"]
    },
    {
      "id": 11,
      "tasks": ["14.2", "15.1", "16.1", "16.2", "16.3"]
    },
    {
      "id": 12,
      "tasks": ["17.1", "17.2", "17.3"]
    },
    {
      "id": 13,
      "tasks": ["19.1", "19.2", "19.3"]
    },
    {
      "id": 14,
      "tasks": ["19.4", "19.5", "19.6", "20.1", "20.2"]
    },
    {
      "id": 15,
      "tasks": ["20.3", "20.4", "21.1", "21.2"]
    },
    {
      "id": 16,
      "tasks": ["22.1", "22.2", "22.3"]
    },
    {
      "id": 17,
      "tasks": ["23.1", "23.2", "23.3", "23.4", "23.5"]
    }
  ]
}
```
