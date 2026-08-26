# Requirements Document

## Introduction

The Schematic Network is an elite, Awwwards-level portfolio website for Rafli Zaardiansa, a Network, Hardware, Software & Cyber Security engineer. The philosophy is "portfolio as living infrastructure" — every section is a node, every transition is data flow, every interaction is a signal. The site visualizes professional identity as an interactive circuit board / engineering schematic, where the PCB aesthetic meets network topology, creating an immersive digital experience that reflects the invisible infrastructure that keeps the world connected.

**Core Philosophy:** The best infrastructure is invisible. This portfolio makes the invisible visible through engineering visualization.

**Target Audience:** Technical recruiters, engineering managers, potential collaborators, and fellow engineers who appreciate both technical depth and aesthetic excellence.

**Performance Targets:**
- Lighthouse Score: >95 across all categories
- Frame Rate: Consistent 60fps for all animations
- First Contentful Paint (FCP): <1.5s
- Time to Interactive (TTI): <3.5s

## Glossary

- **Application**: The Schematic Network portfolio website
- **System**: The complete Next.js web application including all components, services, and infrastructure
- **User**: A visitor to the portfolio website (recruiter, collaborator, or fellow engineer)
- **Circuit_Board**: SVG-based visual system representing PCB (Printed Circuit Board) aesthetic
- **Network_Topology**: Interactive graph visualization of skills and their relationships
- **Boot_Sequence**: The preloader animation that mimics device startup
- **Scroll_Narrative**: The scroll-driven animation system that links sections as network nodes
- **Data_Packet**: Visual representation of data flowing through circuit traces
- **Node**: A connection point in the network topology representing a section or skill
- **Trace**: Visual circuit path connecting nodes, animated with DrawSVG
- **Signal**: Visual feedback for user interactions (hover, click, focus)
- **Theme_System**: Dark/light mode implementation (PCB view vs blueprint view)
- **Custom_Cursor**: Pointer replacement that acts as a probe/test point
- **Magnetic_Element**: Interactive element that responds to cursor proximity with pull effect
- **Handshake_Form**: Contact form designed as TCP 3-way handshake sequence
- **Certificate_Card**: LinkedIn-style credential display component
- **Modal**: Overlay dialog for detailed project case studies
- **Primitive**: Base UI component with CVA variant system
- **Animation_Engine**: GSAP + Lenis + Motion combination for animations
- **Performance_Budget**: Target metrics for loading and runtime performance

## Requirements

### Requirement 1: Design System Foundation

**User Story:** As a developer, I want a comprehensive design token system, so that the visual identity remains consistent across all components and supports both dark and light themes.

#### Acceptance Criteria

1. THE Typography_System SHALL implement three font families: Space Grotesk for display text, Inter for body text, and JetBrains Mono for code/data
2. THE Typography_System SHALL provide a modular type scale with ratio 1.25 from 0.64rem to 3.81rem
3. THE Color_System SHALL provide PCB-inspired color tokens including substrate backgrounds, copper accents, solder metallics, and LED signal colors
4. THE Color_System SHALL define gradient tokens for copper-flow, signal-pulse, and substrate effects
5. THE Spacing_System SHALL implement an 8px-based spacing scale from 4px to 128px
6. THE Grid_System SHALL provide responsive breakpoints at 640px, 768px, 1024px, 1280px, and 1536px
7. THE Icon_System SHALL use Lucide React base icons supplemented with custom network-concept SVG icons
8. THE Icon_System SHALL maintain consistent stroke width of 1.5px and sizes of 16/20/24/32px
9. WHERE dark mode is active, THE Theme_System SHALL apply PCB view color tokens
10. WHERE light mode is active, THE Theme_System SHALL apply blueprint/schematic print color tokens

### Requirement 2: Visual Identity System

**User Story:** As a user, I want a distinctive logo and consistent visual language, so that I immediately recognize the engineering-focused brand identity.

#### Acceptance Criteria

1. THE Logo_Mark SHALL be an SVG-based node network forming circuit-abstract initials
2. THE Logo_Mark SHALL provide three variants: Mark (32x32px), Type (text), and Full (combined)
3. THE Logo_Mark SHALL contain animatable paths for the boot sequence
4. THE Illustration_System SHALL use engineering diagram style with thin strokes on substrate background
5. THE Illustration_System SHALL incorporate decorative elements including resistor shapes, capacitor symbols, and IC chip outlines
6. WHEN decorative patterns are rendered, THE Circuit_Pattern SHALL use copper-colored strokes on substrate backgrounds
7. THE Application SHALL maintain SVG-first approach for all iconography and illustrations for scalability and accessibility

### Requirement 3: Custom Cursor System

**User Story:** As a user on desktop, I want an interactive cursor that responds to interface elements, so that the experience feels like probing a live circuit board.

#### Acceptance Criteria

1. THE Custom_Cursor SHALL render as an 8px circle with copper color and outline in default state
2. WHEN the Custom_Cursor hovers over links or buttons, THE Custom_Cursor SHALL expand to 48px with semi-transparent fill
3. WHEN the Custom_Cursor hovers over text, THE Custom_Cursor SHALL expand to 64px with mix-blend-mode difference
4. WHEN the Custom_Cursor hovers over project cards, THE Custom_Cursor SHALL expand and display "VIEW" label
5. WHERE the user device has coarse pointer (mobile/tablet), THE Custom_Cursor SHALL be hidden
6. THE Custom_Cursor SHALL update position using requestAnimationFrame with lerp smoothing
7. THE Custom_Cursor SHALL transition between states using GSAP animations
8. THE Custom_Cursor SHALL have pointer-events none to avoid interfering with underlying elements

### Requirement 4: Theme System

**User Story:** As a user, I want to toggle between dark and light themes, so that I can view the portfolio in my preferred color scheme with persistence across sessions.

#### Acceptance Criteria

1. THE Theme_System SHALL support three modes: system, dark, and light
2. THE Theme_System SHALL resolve the active theme in priority order: user toggle, localStorage, system preference, then default to dark
3. WHEN the user toggles theme, THE Theme_System SHALL persist the preference to localStorage with key "tsn-theme"
4. THE Theme_System SHALL apply the theme by setting data-theme attribute on the HTML element
5. THE Theme_System SHALL transition colors and backgrounds with 300ms duration when theme changes
6. THE Theme_Toggle component SHALL be accessible via keyboard navigation with appropriate ARIA labels
7. WHERE system preference is active, THE Theme_System SHALL listen for prefers-color-scheme media query changes

### Requirement 5: Preloader and Boot Sequence

**User Story:** As a user visiting the site for the first time in a session, I want to see a compelling boot sequence, so that I'm immersed in the network device startup metaphor.

#### Acceptance Criteria

1. WHEN the Application loads initially, THE Boot_Sequence SHALL display for 3.5 seconds
2. THE Boot_Sequence SHALL animate circuit traces from center outward using DrawSVG from 0.0s to 0.5s
3. THE Boot_Sequence SHALL form the logo mark from traces between 0.5s and 1.5s
4. THE Boot_Sequence SHALL pulse the logo and display "INITIALIZING" text between 1.5s and 2.0s
5. THE Boot_Sequence SHALL fill a progress bar between 2.0s and 2.5s
6. THE Boot_Sequence SHALL scale down logo to navigation position and reveal content wipe between 2.5s and 3.0s
7. THE Boot_Sequence SHALL stagger in hero content between 3.0s and 3.5s
8. THE Application SHALL check sessionStorage to display the Boot_Sequence only once per session
9. WHERE the Boot_Sequence has completed, THE Application SHALL set a sessionStorage flag to skip on subsequent page loads

### Requirement 6: Scroll-Driven Narrative System

**User Story:** As a user, I want the page sections to feel connected through visual continuity, so that scrolling feels like following a data packet through a network.

#### Acceptance Criteria

1. THE Scroll_Narrative SHALL render a persistent SVG circuit path visible throughout the page
2. THE Circuit_Path SHALL connect six nodes representing Hero, About, Skills, Projects, Experience, and Contact sections
3. WHEN the user scrolls, THE Circuit_Path SHALL progressively illuminate traces using DrawSVG based on scroll progress
4. WHEN a section enters the viewport, THE corresponding Node SHALL activate with scale and glow animation
5. THE Scroll_Narrative SHALL use GSAP ScrollTrigger with scrub value of 1 for smooth synchronized animation
6. THE Scroll_Narrative SHALL pin each section during its scroll animation sequence
7. THE Scroll_Narrative SHALL use gsap.context() for cleanup in all scroll-driven components
8. THE Scroll_Narrative SHALL update a scroll progress indicator in the navigation bar

### Requirement 7: Micro-Interactions System

**User Story:** As a user, I want every interactive element to provide tactile visual feedback, so that the interface feels responsive and alive like real hardware signals.

#### Acceptance Criteria

1. WHEN the user hovers over primary buttons, THE Button SHALL display copper glow border pulse and scale to 1.02
2. WHEN the user hovers over secondary buttons, THE Button SHALL animate border trace using DrawSVG from left to right
3. WHEN the user hovers over project cards, THE Card SHALL apply 3D tilt effect and magnetic pull within 100px radius
4. WHEN the user hovers over navigation links, THE Nav_Link SHALL animate underline using DrawSVG from left to right
5. WHEN the user hovers over badges or tags, THE Badge SHALL fill background with slide animation
6. WHEN the user focuses on input fields, THE Input SHALL display border glow and float the label upward
7. THE Magnetic_Element hook SHALL calculate cursor distance and apply transform with smooth easing
8. THE Tilt_Effect hook SHALL calculate mouse position relative to element center and apply 3D rotation

### Requirement 8: Page Transition System

**User Story:** As a user, I want smooth transitions between page states, so that content changes feel like packet switching through network routes.

#### Acceptance Criteria

1. WHEN the user scrolls to a new section, THE Section SHALL fade in with staggered children animation
2. WHEN the user opens a modal, THE Modal SHALL expand circuit-trace border from center and fade in content
3. WHEN the user closes a modal, THE Modal SHALL reverse circuit-trace animation and fade out content
4. WHEN the user navigates to an invalid route, THE 404_Page SHALL display "SIGNAL LOST" glitch animation
5. THE Page_Transition system SHALL use AnimatePresence wrapper in root layout
6. THE Page_Transition system SHALL define exit variants for all animated components
7. THE Modal_Transition SHALL use Headless UI Dialog with AnimatePresence for enter/exit animations

### Requirement 9: Kinetic Typography System

**User Story:** As a user, I want text to appear dynamically as if being transmitted, so that content feels like data streaming through the network.

#### Acceptance Criteria

1. WHEN the hero heading renders, THE Hero_H1 SHALL reveal per-character using SplitText with 0.03s delay per character
2. WHEN section titles enter viewport, THE Section_Title SHALL reveal per-word with slide up animation at 0.08s per word using ScrollTrigger
3. WHEN numeric stats enter viewport, THE Stats_Counter SHALL count up from 0 to target value over 2 seconds with ScrollTrigger
4. WHEN code snippets render, THE Code_Text SHALL display typewriter animation at 0.02s per character
5. WHEN the tagline renders, THE Tagline_Text SHALL scramble from random characters to resolved text using GSAP TextPlugin
6. THE Kinetic_Typography components SHALL support prefers-reduced-motion to display instantly without animation

### Requirement 10: SVG Circuit Animation System

**User Story:** As a user, I want to see living circuit board animations, so that the engineering schematic metaphor is visually realized throughout the experience.

#### Acceptance Criteria

1. THE Circuit_Board SHALL layer five visual elements: grid pattern, trace paths, component symbols, data dots, and glow effects
2. WHEN the user scrolls, THE Trace paths SHALL animate using DrawSVG from 0% to 100%
3. WHEN a section enters viewport, THE Node SHALL activate with scale and glow animation
4. THE Data_Flow dots SHALL animate along traces using GSAP MotionPath in continuous loops
5. WHEN transitioning between sections, THE Component_Symbol SHALL morph from one shape to another using MorphSVG
6. THE Circuit_Board SHALL provide three SVG variants: circuit-hero.svg, circuit-skills.svg, and circuit-full.svg
7. THE Circuit animation SHALL apply blur and opacity filters for glow effects on active traces
8. THE Circuit animation SHALL use only transform and opacity properties for GPU acceleration

### Requirement 11: Performance Optimization System

**User Story:** As a user on any device, I want smooth 60fps animations and fast load times, so that the experience feels premium regardless of my hardware.

#### Acceptance Criteria

1. THE Animation_System SHALL use only GPU-accelerated properties: transform and opacity
2. THE Animation_System SHALL avoid animating layout properties: width, height, top, left, margin, padding
3. THE Animation_System SHALL apply will-change property only during active animations and remove after completion
4. THE Animation_System SHALL use gsap.context() cleanup in all useLayoutEffect hooks
5. THE Application SHALL synchronize Lenis smooth scroll with GSAP ticker in a single requestAnimationFrame loop
6. THE Application SHALL dynamically import Rive canvas components to reduce initial bundle size
7. WHERE the user has prefers-reduced-motion enabled, THE Application SHALL disable all animations
8. THE Application SHALL maintain frame times at or below 16.67ms per frame as measured by Chrome DevTools
9. THE Application SHALL achieve Lighthouse performance score above 95
10. THE Application SHALL achieve First Contentful Paint below 1.5 seconds and Time to Interactive below 3.5 seconds

### Requirement 12: Hero Section

**User Story:** As a user landing on the site, I want to immediately understand who Rafli is and what he does, so that I know I'm in the right place.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the name "Rafli Zaardiansa" as the primary heading with SplitText reveal animation
2. THE Hero_Section SHALL display the role statement "Network, Hardware, Software & Cyber Security" with typewriter animation
3. THE Hero_Section SHALL display the tagline "Engineering the invisible infrastructure that keeps the world connected" with fade-in animation
4. THE Hero_Section SHALL render an animated Circuit_Board as the background visual
5. THE Hero_Section SHALL display a scroll indicator at the bottom with animated pulse
6. WHEN the user clicks the scroll indicator, THE Application SHALL smooth scroll to the About section using Lenis
7. THE Hero_Section SHALL occupy at least 100vh on all devices
8. THE Navigation SHALL be transparent over the hero section and become solid on scroll

### Requirement 13: About Section with Education

**User Story:** As a user, I want to learn Rafli's background, education, and philosophy, so that I understand his qualifications and approach to engineering.

#### Acceptance Criteria

1. THE About_Section SHALL present origin story narrating why Rafli entered network, hardware, software, and cyber security engineering
2. THE About_Section SHALL display education history including SMK Negeri 1 Cikarang Selatan with specialization in Teknik Komputer dan Jaringan
3. THE About_Section SHALL display current education at IPB University in Teknologi Rekayasa Komputer D4 program with status "Sedang Menempuh Pendidikan"
4. THE About_Section SHALL articulate engineering philosophy: "The best infrastructure is invisible"
5. THE About_Section SHALL display credentials section with LinkedIn-style Certificate_Card components
6. THE Certificate_Card SHALL display issuer logo or icon
7. THE Certificate_Card SHALL display certificate title, issuing organization, issue date, expiry date (if applicable), and credential ID
8. THE Certificate_Card SHALL provide "Show credential" button with ExternalLink icon linking to official verification URL
9. THE About_Section SHALL focus on current technical focus areas and specializations
10. THE About_Section SHALL avoid generic skill lists in favor of narrative context

### Requirement 14: Project Case Studies

**User Story:** As a user, I want to explore Rafli's projects in detail, so that I can understand his problem-solving approach and technical execution.

#### Acceptance Criteria

1. THE Projects_Section SHALL display project cards in a responsive grid layout
2. THE Project_Card SHALL display thumbnail image, project name, project type, and technology tags
3. WHEN the user clicks a Project_Card, THE Project_Modal SHALL open with detailed case study
4. THE Project_Modal SHALL structure content as: PROBLEM → PROCESS → SOLUTION with visual separators
5. THE Project_Modal SHALL include interactive network topology diagram showing system architecture
6. THE Project_Modal SHALL display quantitative metrics demonstrating project success
7. THE Project_Modal SHALL provide links to live demo and source code repository where applicable
8. WHEN the user closes the modal via X button or Escape key, THE Project_Modal SHALL animate out with circuit-trace border collapse
9. THE Project_Card SHALL apply magnetic hover effect and 3D tilt when cursor is nearby
10. THE Projects_Section SHALL support lazy loading of modal content until first open

### Requirement 15: Skills Network Topology

**User Story:** As a user, I want to visualize Rafli's skills as an interactive network, so that I understand relationships between technologies and proficiency levels.

#### Acceptance Criteria

1. THE Skills_Section SHALL render an interactive SVG-based network topology graph
2. THE Skill_Graph SHALL represent each skill as a node with connections showing relationships
3. THE Skill_Node SHALL color-code by proficiency: green for proficient, cyan for intermediate, amber for learning
4. WHEN the user hovers over a Skill_Node, THE Skill_Graph SHALL highlight connected nodes and dim unrelated nodes
5. WHEN the user clicks a Skill_Node, THE Skill_Detail panel SHALL display description, proficiency level, and related projects
6. THE Skill_Graph SHALL group skills by category: Networking, Hardware, Software, Cyber Security
7. THE Skill_Graph SHALL scale appropriately across responsive breakpoints with simplified layout on mobile
8. THE Skill_Graph SHALL be keyboard navigable with focus states on all nodes
9. THE Skill_Graph SHALL provide alternative text descriptions for screen readers
10. THE Skill_Graph SHALL animate node entrance with stagger when section enters viewport

### Requirement 16: Contact Form as TCP Handshake

**User Story:** As a user, I want to contact Rafli through an engaging form, so that the contact process feels thematic and memorable.

#### Acceptance Criteria

1. THE Contact_Form SHALL structure input flow as TCP 3-way handshake: SYN (name), SYN-ACK (email), ACK (message)
2. THE Contact_Form SHALL display step labels "SYN", "SYN-ACK", and "ACK" corresponding to each input field
3. WHEN the user submits the form, THE Contact_Form SHALL send data to /api/contact route
4. WHEN the submission succeeds, THE Connection_Status SHALL display "Connection Established ✓" with animated circuit morphing to checkmark
5. WHEN the submission fails, THE Connection_Status SHALL display error message with retry option
6. THE Contact_Form SHALL validate email format before allowing submission
7. THE Contact_Form SHALL validate that all required fields are filled
8. THE Contact_Form SHALL disable submit button during processing and show loading state with circuit trace animation
9. THE Contact_Form SHALL provide clear focus states and error messages for accessibility
10. THE api/contact route SHALL integrate with Resend API for email delivery

### Requirement 17: Navigation System

**User Story:** As a user, I want intuitive navigation with visual progress indication, so that I can easily jump between sections and understand where I am.

#### Acceptance Criteria

1. THE Navigation SHALL display logo, section links (Hero, About, Skills, Projects, Contact), and theme toggle on desktop
2. THE Navigation SHALL display scroll progress bar showing percentage through the page
3. THE Navigation SHALL transition from transparent background to solid when user scrolls past hero section
4. THE Navigation SHALL hide on scroll down and reveal on scroll up for maximum content visibility
5. THE Navigation SHALL highlight the active section link based on IntersectionObserver detection
6. WHEN the user clicks a navigation link, THE Application SHALL smooth scroll to the target section using Lenis scrollTo
7. WHERE viewport width is below 768px, THE Navigation SHALL display hamburger menu icon
8. WHEN the user opens mobile menu, THE Mobile_Menu SHALL display fullscreen overlay with circuit trace animation
9. THE Navigation SHALL be keyboard accessible with proper focus management
10. THE Navigation SHALL provide skip-to-content link as first focusable element

### Requirement 18: Footer

**User Story:** As a user reaching the end of the page, I want to find social links and site map, so that I can connect on other platforms or navigate back.

#### Acceptance Criteria

1. THE Footer SHALL display decorative circuit traces leading to ground symbol ⏚
2. THE Footer SHALL provide social links: GitHub, LinkedIn, Email, and Resume
3. THE Footer SHALL provide site navigation links: About, Projects, Skills, Contact
4. THE Footer SHALL display copyright notice "© 2026 Rafli Zaardiansa"
5. THE Footer SHALL display tagline "Every packet finds its destination. 🌐"
6. THE Social_Links SHALL open in new tab with appropriate rel attributes for security
7. THE Footer SHALL maintain consistent spacing and alignment across responsive breakpoints

### Requirement 19: Component Architecture with Atomic Design

**User Story:** As a developer, I want a well-organized component structure, so that components are discoverable, reusable, and maintainable.

#### Acceptance Criteria

1. THE Application SHALL organize components following Atomic Design pattern: atoms in /ui, molecules and organisms in feature directories
2. THE Application SHALL place page sections in /components/sections with nested subdirectories per section
3. THE Application SHALL place animation-specific components in dedicated directories: /preloader, /scroll, /transitions, /typography, /circuit
4. THE Application SHALL place layout components (Container, Grid) in /components/layout
5. THE Application SHALL place navigation components (Navbar, NavLink, MobileMenu) in /components/navigation
6. THE Application SHALL place decorative components (patterns, backgrounds) in /components/decorative
7. THE Application SHALL store custom React hooks in /hooks directory
8. THE Application SHALL store Zustand state stores in /stores directory
9. THE Application SHALL store utility functions in /lib directory
10. THE Application SHALL store static data (projects, skills) in /data directory with TypeScript types

### Requirement 20: UI Primitive Component System

**User Story:** As a developer, I want consistent primitive components with variants, so that UI elements are reusable and maintain design system compliance.

#### Acceptance Criteria

1. THE Button primitive SHALL implement variants: primary, secondary, ghost with sizes sm, md, lg using Class Variance Authority
2. THE Button primitive SHALL support magnetic hover effect and circuit-border animation
3. THE Card primitive SHALL implement variants: default, elevated, interactive with 3D tilt on hover and glow border
4. THE Badge primitive SHALL implement color-coding by category: skill, status, tag
5. THE Modal primitive SHALL use Headless UI Dialog with AnimatePresence for transitions
6. THE Input primitive SHALL implement floating label and focus glow effects
7. THE Tooltip primitive SHALL support positioning: top, bottom, left, right with fade and translate animation
8. THE Skeleton primitive SHALL provide shapes: line, circle, card with pulse animation matching component structure
9. THE Certificate_Card primitive SHALL implement LinkedIn-style layout with issuer logo, title, organization, dates, credential ID, and verification link
10. THE Primitive components SHALL use tailwind-merge and clsx for className composition

### Requirement 21: Global State Management

**User Story:** As a developer, I want centralized state management for global concerns, so that state is predictable and accessible across components.

#### Acceptance Criteria

1. THE theme-store SHALL manage state: mode (system/dark/light) and resolved theme
2. THE theme-store SHALL persist mode to localStorage
3. THE audio-store SHALL manage state: isMuted, volume, isAmbientPlaying
4. THE nav-store SHALL manage state: activeSection, isMenuOpen, scrollProgress
5. THE app-store SHALL manage state: isLoaded, isPreloaderComplete, cursorState
6. THE Zustand stores SHALL be collocated in /stores directory with TypeScript types
7. THE Zustand stores SHALL use shallow comparison for selector optimization where appropriate

### Requirement 22: Animation Engine Integration

**User Story:** As a developer, I want seamless integration between Lenis and GSAP, so that smooth scrolling and scroll-triggered animations work together without conflicts.

#### Acceptance Criteria

1. THE Lenis_Provider SHALL initialize Lenis smooth scroll in root layout
2. THE Lenis_Provider SHALL synchronize Lenis with GSAP ticker using gsap.ticker.add
3. THE Lenis_Provider SHALL call ScrollTrigger.update on Lenis scroll events
4. THE Lenis_Provider SHALL set gsap.ticker.lagSmoothing to 0 to disable lag compensation
5. THE Lenis_Provider SHALL run in a single requestAnimationFrame loop for performance
6. THE Lenis_Provider SHALL expose Lenis instance via React context for imperative scrollTo calls
7. THE Lenis_Provider SHALL cleanup ticker and scroll listeners on unmount

### Requirement 23: SEO and Metadata System

**User Story:** As a site owner, I want comprehensive SEO optimization, so that the portfolio ranks well in search results and shares beautifully on social platforms.

#### Acceptance Criteria

1. THE Application SHALL define metadata using Next.js Metadata API with title "Rafli Zaardiansa — Network, Hardware, Software & Cyber Security"
2. THE Application SHALL provide descriptive meta description summarizing portfolio purpose and expertise
3. THE Application SHALL generate Open Graph metadata with custom OG image via /api/og route
4. THE Application SHALL generate Twitter Card metadata with summary_large_image card type
5. THE Application SHALL embed JSON-LD structured data with Person and ProfilePage schemas
6. THE Application SHALL implement canonical URLs for all pages
7. THE /api/og route SHALL use Vercel OG (next/og) to generate dynamic social preview images
8. THE Application SHALL define language attribute lang="en" on HTML element
9. THE Application SHALL provide descriptive title and meta tags for 404 and error pages

### Requirement 24: Next.js Configuration

**User Story:** As a developer, I want optimized Next.js configuration, so that images are efficient and security headers are properly set.

#### Acceptance Criteria

1. THE next.config.ts SHALL configure image formats: AVIF and WebP
2. THE next.config.ts SHALL set security headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy origin-when-cross-origin
3. THE next.config.ts SHALL set cache headers for static assets: max-age 31536000 immutable for fonts
4. THE next.config.ts SHALL enable React strict mode
5. THE next.config.ts SHALL configure GSAP trial license detection (if required based on licensing verification)

### Requirement 25: Error Pages

**User Story:** As a user encountering an error, I want clear, thematic error pages, so that I understand what happened and how to recover.

#### Acceptance Criteria

1. THE 404_Page SHALL display "SIGNAL LOST · 404" heading with broken circuit trace visual
2. THE 404_Page SHALL display message "The packet never arrived."
3. THE 404_Page SHALL provide "Return to Origin" link to home page
4. THE Error_Page SHALL display "SYSTEM FAULT" heading with red glitch text and traces
5. THE Error_Page SHALL provide "Retry" button to attempt recovery
6. THE Error_Page SHALL provide "Return to Origin" link to home page
7. THE Global_Error_Page SHALL catch root-level errors with similar thematic treatment
8. THE Error pages SHALL maintain accessibility with proper heading hierarchy and keyboard navigation

### Requirement 26: Loading States

**User Story:** As a user, I want clear loading feedback, so that I know content is being fetched and the application hasn't frozen.

#### Acceptance Criteria

1. WHERE the Application is initially loading, THE Boot_Sequence SHALL serve as the loading indicator
2. WHERE route transitions occur, THE CircuitWipe transition SHALL indicate loading
3. WHERE modal content is loading, THE Skeleton components SHALL display with pulse animation
4. WHERE images are loading, THE Image component SHALL display blur placeholder before sharp image
5. WHERE form is submitting, THE Submit_Button SHALL display circuit trace spinning animation
6. THE loading.tsx page SHALL provide fallback UI for Next.js loading states
7. THE Loading indicators SHALL be announced to screen readers with appropriate ARIA labels

### Requirement 27: Responsive Design

**User Story:** As a user on any device, I want the portfolio to adapt seamlessly to my screen size, so that I have an optimal experience whether on mobile, tablet, or desktop.

#### Acceptance Criteria

1. WHERE viewport width is below 640px, THE Application SHALL display single-column layout with hamburger navigation
2. WHERE viewport width is below 640px, THE Application SHALL simplify circuit animations to reduce complexity
3. WHERE viewport width is below 640px, THE Application SHALL ensure touch targets are minimum 44x44 pixels
4. WHERE viewport width is between 640px and 768px, THE Projects_Section SHALL display 2-column grid
5. WHERE viewport width is between 768px and 1024px, THE Navigation SHALL display full horizontal nav and About_Section SHALL use 2-column layout
6. WHERE viewport width is between 1024px and 1280px, THE Application SHALL display full desktop layout with 3-column project grid
7. WHERE viewport width is above 1280px, THE Application SHALL apply max-width container and increase type scale
8. THE Application SHALL disable parallax effects on mobile devices for performance
9. THE Application SHALL reduce type scale by one step on mobile devices
10. THE Application SHALL test responsive behavior at all defined breakpoints

### Requirement 28: Accessibility Compliance

**User Story:** As a user with disabilities, I want the portfolio to be fully accessible, so that I can navigate and understand content using assistive technologies.

#### Acceptance Criteria

1. THE Application SHALL maintain color contrast ratio of at least 4.5:1 between text and backgrounds for WCAG 2.1 AA compliance
2. THE Application SHALL make all interactive elements keyboard accessible with visible focus indicators
3. THE Application SHALL use copper glow border for focus states on all focusable elements
4. THE Application SHALL implement skip-to-content link as first focusable element
5. WHERE the user has prefers-reduced-motion preference, THE Application SHALL disable all animations and show static content
6. WHERE modals are open, THE Application SHALL trap focus within modal boundaries
7. THE Application SHALL provide descriptive alt text for all images and SVG graphics
8. THE Application SHALL maintain proper heading hierarchy with single h1 and sequential h2-h6 elements
9. THE Application SHALL use semantic HTML5 elements: nav, main, footer, section with aria-label attributes
10. THE Application SHALL ensure minimum touch target size of 44x44 pixels on all interactive elements
11. THE Application SHALL set lang="en" attribute on HTML element
12. THE Application SHALL implement ARIA landmarks for major page regions

### Requirement 29: Development Quality Infrastructure

**User Story:** As a developer, I want automated quality checks, so that code consistency and correctness are maintained throughout development.

#### Acceptance Criteria

1. THE Application SHALL configure ESLint for TypeScript code linting
2. THE Application SHALL configure Prettier for code formatting
3. THE Application SHALL configure Husky pre-commit hooks to run lint-staged
4. THE lint-staged configuration SHALL run ESLint and Prettier on staged files before commit
5. THE Application SHALL configure Vitest for unit testing
6. THE Application SHALL configure Playwright for end-to-end testing
7. THE Application SHALL implement GitHub Actions workflow for continuous integration
8. THE CI workflow SHALL run on pull requests and main branch commits
9. THE CI workflow SHALL execute lint, type-check, build, and test steps
10. THE README SHALL display build status badge from GitHub Actions

### Requirement 30: Performance Monitoring

**User Story:** As a site owner, I want real-time performance monitoring, so that I can identify and address performance regressions.

#### Acceptance Criteria

1. THE Application SHALL integrate Vercel Speed Insights for real-user monitoring
2. THE Application SHALL integrate Vercel Analytics for privacy-friendly page analytics
3. THE Speed_Insights SHALL report Core Web Vitals: LCP, FID, CLS
4. THE Analytics SHALL track page views without collecting personal information
5. THE Application SHALL configure Lighthouse CI in GitHub Actions to enforce performance budgets
6. THE Lighthouse CI SHALL fail builds if performance score drops below 95
7. THE Lighthouse CI SHALL fail builds if accessibility score drops below 95
