# The Schematic Network — Final Tech Stack & Implementation Reference

> Konsolidasi antara stack wajib di _Developer Requirements_, plan implementasi 30 fitur Awwwards-level, dan spesifikasi teknis per komponen. Gunakan dokumen ini sebagai **master checklist** saat membangun project.
>
> **Konsep inti:** Portfolio seorang network, hardware, software, dan cyber security engineer yang divisualisasikan sebagai **circuit board / engineering schematic hidup** — setiap section adalah node, setiap transisi adalah data flow, setiap interaksi adalah signal.

---

## 1. Core Stack (Wajib — sudah ditentukan di requirements)

| Layer            | Package                    | Versi   | Install                                                  |
| ---------------- | -------------------------- | ------- | -------------------------------------------------------- |
| Framework        | `next`                     | ^14.2.0 | `npx create-next-app@14 . --typescript --tailwind --app` |
| Bahasa           | `typescript`               | ^5.4.0  | (bawaan create-next-app)                                 |
| Styling          | `tailwindcss`              | ^3.4.0  | (bawaan create-next-app)                                 |
| Animasi utama    | `gsap`                     | ^3.12.5 | `npm install gsap`                                       |
| Smooth scroll    | `lenis`                    | ^1.0.42 | `npm install lenis`                                      |
| Vector motion    | `@rive-app/react-canvas`   | ^4.12.0 | `npm install @rive-app/react-canvas`                     |
| Audio engine     | `howler` + `@types/howler` | ^2.2.4  | `npm install howler @types/howler`                       |
| State management | `zustand`                  | ^4.5.2  | `npm install zustand`                                    |

**Catatan:** Package Lenis dulu bernama `@studio-freight/lenis`, sekarang dipublikasikan langsung sebagai `lenis` di npm. Cek `npm view lenis versions` sebelum instal untuk memastikan versi terbaru masih kompatibel.

GSAP plugin yang dipakai (semua dari paket `gsap` yang sama, tinggal `import` dan `gsap.registerPlugin(...)`):

- `ScrollTrigger`
- `DrawSVGPlugin`
- `MotionPathPlugin`
- `TextPlugin`
- `MorphSVGPlugin`
- `SplitText`

> Sebelumnya plugin-plugin ini termasuk "Club GreenSock" (berbayar). Sepengetahuan saya GreenSock kini di bawah Webflow dan semua plugin sudah gratis untuk umum — **verifikasi ulang di gsap.com/pricing** sebelum mengasumsikan akses gratis, karena ini di luar jendela pengetahuan saya yang terverifikasi.

---

## 2. Animation Layer Tambahan

| Package                               | Fungsi                                                                                                                                   | Install                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `motion` (rebrand dari Framer Motion) | Micro-interaction React-native: hover state, `AnimatePresence` untuk exit animation modal (Legacy Protocol), layout animation Bento Grid | `npm install motion`                                |
| GSAP `SplitText`                      | Kinetic typography di Hero Section (animasi huruf/kata) — disebut di requirements tapi belum ada plugin spesifik                         | Sudah termasuk di `gsap` (cek status free/berbayar) |

**Prinsip pembagian tugas:** GSAP untuk scroll-driven timeline kompleks & SVG (Silicon-to-Syntax sequence), Motion untuk interaksi komponen React biasa. Jangan pakai dua-duanya untuk hal yang sama — boros bundle size.

---

## 3. UI Component System

| Package                    | Fungsi                                                                     | Install                                |
| -------------------------- | -------------------------------------------------------------------------- | -------------------------------------- |
| `@headlessui/react`        | Dialog untuk Legacy Protocol Modal (sudah di kode contoh requirements)     | `npm install @headlessui/react`        |
| `class-variance-authority` | Variant management untuk button/badge/card (state hover, active, disabled) | `npm install class-variance-authority` |
| `tailwind-merge` + `clsx`  | Merge className Tailwind secara aman tanpa konflik utility                 | `npm install tailwind-merge clsx`      |
| `lucide-react`             | Icon set (sudah dipakai di kode contoh: `Terminal`, `X`, `ExternalLink`)   | `npm install lucide-react`             |

---

## 4. Performance, SEO & Observability

| Package                  | Fungsi                                                                        | Install                              |
| ------------------------ | ----------------------------------------------------------------------------- | ------------------------------------ |
| `@vercel/speed-insights` | Real-user performance data (melengkapi target Lighthouse >95 di requirements) | `npm install @vercel/speed-insights` |
| `@vercel/analytics`      | Privacy-friendly page analytics                                               | `npm install @vercel/analytics`      |
| Next.js Metadata API     | Structured SEO + JSON-LD `Person`/`ProfilePage` schema                        | Built-in, tidak perlu install        |
| `next/og` (Vercel OG)    | Generate social preview image dinamis saat link di-share                      | Built-in di Next.js App Router       |

---

## 5. Dev Quality & Engineering Signal

| Package                 | Fungsi                                                       | Install                                        |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `eslint` + `prettier`   | Konsistensi kode                                             | Bawaan create-next-app, tambah Prettier manual |
| `husky` + `lint-staged` | Pre-commit hook — cegah commit kode berantakan               | `npm install -D husky lint-staged`             |
| `vitest`                | Unit test                                                    | `npm install -D vitest`                        |
| `@playwright/test`      | E2E test (misal: pastikan modal Legacy Protocol bisa dibuka) | `npm install -D @playwright/test`              |
| GitHub Actions          | CI badge "build passing" di README                           | Config `.github/workflows/ci.yml`              |

---

## 6. Opsional — Untuk Skalabilitas Jangka Panjang

| Package                       | Fungsi                                                     | Kapan dipakai                         |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------------- |
| `velite` atau `contentlayer2` | MDX-based case study per project, edit tanpa redeploy code | Kalau mau nambah detail project rutin |
| `resend`                      | API email modern untuk contact form                        | Kalau ada form kontak                 |

---

## 7. Ringkasan Install (Copy-Paste)

```bash
# Core
npm install gsap lenis @rive-app/react-canvas howler @types/howler zustand

# Animation tambahan
npm install motion

# UI Component System
npm install @headlessui/react class-variance-authority tailwind-merge clsx lucide-react

# Performance & Observability
npm install @vercel/speed-insights @vercel/analytics

# Dev Quality (devDependencies)
npm install -D husky lint-staged vitest @playwright/test prettier
```

---

## 8. Catatan Arsitektur Penting

1. **Satu animation engine per konteks** — GSAP untuk scroll narrative & SVG, Motion untuk UI micro-interaction. Jangan tumpang tindih.
2. **`gsap.context()` wajib** di setiap `useLayoutEffect` yang pakai ScrollTrigger, untuk cleanup dan cegah memory leak (sudah ditekankan di requirements, konsisten pertahankan di semua komponen scroll-driven lain).
3. **Verifikasi versi & lisensi GSAP plugin** sebelum deploy produksi — informasi soal status gratis/berbayar plugin bisa berubah setelah tanggal pengetahuan saya.
4. **Hindari 3D WebGL berat** — requirements sudah eksplisit membatasi diri ke 2D (SVG + Rive) demi 60 FPS di semua device. Kalau nanti tergoda nambah Three.js/React Three Fiber untuk efek depth, pertimbangkan ulang — ini bertentangan langsung dengan constraint performa yang sudah ditetapkan.

---

---

# BAGIAN II — Implementation Plan: 30 Fitur Awwwards-Level

> Setiap fitur dipetakan ke konsep **"The Schematic Network"** — circuit board / engineering schematic hidup.

---

## 9. Design System Foundation

### 9.1 Typography System _(Fitur #1)_

**Konsep:** Typeface yang terasa _engineered_ — monospace untuk data/kode, geometric sans untuk heading, humanist untuk body. Seperti label pada schematic diagram.

| Role         | Font                          | Weight   | Penggunaan                              |
| ------------ | ----------------------------- | -------- | --------------------------------------- |
| Display / H1 | Space Grotesk (Google Fonts)  | 700, 500 | Hero statement, section titles          |
| Body         | Inter (Google Fonts)          | 400, 500 | Paragraf, deskripsi                     |
| Code / Data  | JetBrains Mono (Google Fonts) | 400, 700 | Terminal output, skill labels, metadata |

**Type Scale (modular — ratio 1.25 "Major Third"):**

```
--font-xs:    0.64rem   (10.24px)   — caption, metadata
--font-sm:    0.80rem   (12.80px)   — small text, labels
--font-base:  1.00rem   (16.00px)   — body text
--font-md:    1.25rem   (20.00px)   — lead paragraph
--font-lg:    1.56rem   (24.96px)   — H4
--font-xl:    1.95rem   (31.25px)   — H3
--font-2xl:   2.44rem   (39.06px)   — H2
--font-3xl:   3.05rem   (48.83px)   — H1
--font-4xl:   3.81rem   (61.04px)   — Hero display
```

**File:** `src/styles/tokens/typography.css`, `src/app/layout.tsx`, `src/lib/fonts.ts`

---

### 9.2 Color System _(Fitur #2)_

**Konsep:** Palette terinspirasi **PCB (Printed Circuit Board)** — dark green substrate, copper traces, solder silver, LED indicator colors.

| Token                      | Hex       | Peran                   | Analogi Schematic       |
| -------------------------- | --------- | ----------------------- | ----------------------- |
| `--color-substrate`        | `#0a0f0d` | Background utama (dark) | PCB substrate hijau tua |
| `--color-substrate-raised` | `#111a16` | Surface / card bg       | Layer PCB terangkat     |
| `--color-substrate-light`  | `#f5f7f6` | Background (light mode) | Kertas schematic        |
| `--color-copper`           | `#d4a574` | Accent primer, CTA      | Copper trace pada PCB   |
| `--color-copper-bright`    | `#e8c49a` | Hover state copper      | Copper terkena cahaya   |
| `--color-solder`           | `#c0c8d4` | Text secondary, border  | Solder point            |
| `--color-signal-green`     | `#22c55e` | Status aktif, success   | LED hijau — online      |
| `--color-signal-red`       | `#ef4444` | Error, warning          | LED merah — fault       |
| `--color-signal-amber`     | `#f59e0b` | Caution, highlight      | LED amber — warning     |
| `--color-signal-cyan`      | `#06b6d4` | Links, interactive      | Signal trace aktif      |
| `--color-trace`            | `#1a3a2a` | Garis halus, separator  | PCB trace dormant       |
| `--color-text-primary`     | `#e8ede9` | Text utama (dark)       | Label komponen          |

**Gradients:**

```css
--gradient-copper-flow: linear-gradient(135deg, #d4a574, #e8c49a, #d4a574);
--gradient-signal-pulse: linear-gradient(90deg, #06b6d4, #22c55e);
--gradient-substrate: radial-gradient(ellipse at 30% 20%, #111a16, #0a0f0d);
```

**File:** `src/styles/tokens/colors.css`, `tailwind.config.ts`

---

### 9.3 Spacing & Grid System _(Fitur #3)_

**Konsep:** Grid 8px seperti grid pada kertas gambar teknik — presisi, terukur, konsisten.

**8px Spacing Scale:**

```
--space-1:   0.25rem  (4px)     --space-6:   2.00rem  (32px)
--space-2:   0.50rem  (8px) ★   --space-8:   3.00rem  (48px)
--space-3:   0.75rem  (12px)    --space-10:  4.00rem  (64px)
--space-4:   1.00rem  (16px)    --space-12:  6.00rem  (96px)
--space-5:   1.50rem  (24px)    --space-16:  8.00rem  (128px)
```

**Responsive Breakpoints:**

| Breakpoint | Width  | Target           | Layout               |
| ---------- | ------ | ---------------- | -------------------- |
| `sm`       | 640px  | Mobile landscape | 4-column             |
| `md`       | 768px  | Tablet portrait  | 8-column             |
| `lg`       | 1024px | Tablet landscape | 12-column            |
| `xl`       | 1280px | Desktop          | 12-column            |
| `2xl`      | 1536px | Large desktop    | 12-column, max-width |

**File:** `src/styles/tokens/spacing.css`, `src/components/layout/Container.tsx`, `src/components/layout/Grid.tsx`

---

### 9.4 Visual Identity & Iconography _(Fitur #4)_

**Konsep:** Logo berbentuk node jaringan — titik terhubung membentuk inisial/circuit abstrak. Iconography: _technical drawing_ style — thin stroke, geometric, monoline.

| Variant   | Penggunaan                     | Spesifikasi                           |
| --------- | ------------------------------ | ------------------------------------- |
| Logo Mark | Favicon, mobile nav, preloader | SVG, 32x32 viewBox, animatable paths  |
| Logo Type | Nav desktop, footer            | SVG, "Rafli Zaardiansa" Space Grotesk |
| Logo Full | OG image, about section        | Mark + Type horizontal                |

**Icon Style:** Lucide-react base + custom SVG untuk network concepts (router, switch, firewall, packet, latency). Stroke 1.5px, sizes 16/20/24/32px.

**Illustration Style:** SVG schematic diagrams — engineering diagram, bukan kartun. `stroke: var(--color-copper)` pada `var(--color-substrate)`. Decorative elements: resistor shapes, capacitor symbols, IC chip outlines.

**File:** `public/logo/`, `src/components/icons/`, `src/components/decorative/SchematicPattern.tsx`, `src/components/decorative/CircuitTrace.tsx`

---

### 9.5 Dark Mode System _(Fitur #5)_

**Konsep:** Dark = **PCB view** (default). Light = **Blueprint/schematic print**.

**Implementasi:**

```
Zustand store: useThemeStore
├── state: 'system' | 'dark' | 'light'
├── resolved: 'dark' | 'light' (computed)
└── persist: localStorage key 'tsn-theme'

Hierarchy: User toggle → localStorage → system preference → default 'dark'

CSS: <html data-theme="dark|light">
     Token swap via [data-theme="light"] selector
     Transition: color 300ms, background-color 300ms
```

**File:** `src/stores/theme-store.ts`, `src/components/ui/ThemeToggle.tsx`, `src/providers/ThemeProvider.tsx`, `src/styles/tokens/theme-dark.css`, `src/styles/tokens/theme-light.css`

---

### 9.6 Custom Cursor System _(Fitur #6)_

**Konsep:** Cursor sebagai **probe/test point** — lingkaran yang bereaksi terhadap elemen, seperti probe menyentuh test point pada PCB.

| Context            | State   | Visual                                |
| ------------------ | ------- | ------------------------------------- |
| Default            | `dot`   | 8px circle, `--color-copper`, outline |
| Hover link/button  | `grow`  | Expand 48px, semi-transparent fill    |
| Hover teks         | `blend` | 64px, `mix-blend-mode: difference`    |
| Hover project card | `view`  | Expand + "VIEW" label                 |
| Mobile             | `none`  | Hidden (`@media (pointer: coarse)`)   |

**Technical:** Rendered via portal, positioned with `requestAnimationFrame` + lerp (smooth follow), GSAP untuk state transitions, `pointer-events: none`.

**File:** `src/components/ui/CustomCursor.tsx`, `src/hooks/useCursorState.ts`, `src/styles/cursor.css`

---

## 10. Animation Pipeline

### 10.1 Preloader & Reveal Sequence _(Fitur #7)_

**Konsep:** Boot sequence — perangkat jaringan booting: POST → firmware → interfaces up → READY.

**Timeline (3.5s):**

```
0.0s - 0.5s   │ Black → circuit traces DrawSVG dari center
0.5s - 1.5s   │ Traces membentuk logo mark
1.5s - 2.0s   │ Logo pulse + "INITIALIZING" text
2.0s - 2.5s   │ Progress bar fill
2.5s - 3.0s   │ Logo scale down → nav position + reveal wipe
3.0s - 3.5s   │ Hero content stagger in
```

Hanya tampil sekali per session (`sessionStorage` check).

**File:** `src/components/preloader/Preloader.tsx`, `src/components/preloader/CircuitAssembly.tsx`, `src/components/preloader/BootSequence.tsx`, `src/stores/app-store.ts`

---

### 10.2 Scroll-Driven Narrative _(Fitur #8)_

**Konsep:** Scroll = **data packet traversing a network.** Persistent SVG circuit path di sisi layar yang "lights up" seiring scroll progress.

```
Persistent Circuit Path:
├── Node 1: HERO (origin)         ●───
├── Node 2: ABOUT (hop 1)         ───●──
├── Node 3: SKILLS (hop 2)        ──●───
├── Node 4: PROJECTS (hop 3)      ───●──
├── Node 5: EXPERIENCE (hop 4)    ──●───
└── Node 6: CONTACT (destination) ───●
```

GSAP ScrollTrigger: master timeline `scrub: 1`, per-section `pin: true`, `gsap.context()` cleanup di setiap component.

**File:** `src/components/scroll/ScrollNarrative.tsx`, `src/components/scroll/CircuitPath.tsx`, `src/components/scroll/SectionNode.tsx`, `src/hooks/useScrollProgress.ts`, `src/lib/scroll-config.ts`

---

### 10.3 Micro-Interactions _(Fitur #9)_

**Konsep:** Setiap interaksi = **signal** — hover = probe, click = signal sent, feedback = acknowledged.

| Element          | Interaction | Animation                            | Engine         |
| ---------------- | ----------- | ------------------------------------ | -------------- |
| Button primary   | Hover       | Glow border copper pulse, scale 1.02 | Motion         |
| Button secondary | Hover       | Border trace DrawSVG                 | GSAP           |
| Card project     | Hover       | 3D tilt + glow                       | Motion + CSS   |
| Card project     | Hover       | Magnetic pull (100px radius)         | Custom hook    |
| Nav link         | Hover       | Underline DrawSVG left→right         | GSAP           |
| Badge/tag        | Hover       | Background slide fill                | CSS transition |
| Input field      | Focus       | Border glow + label float            | CSS + Motion   |

**File:** `src/hooks/useMagneticElement.ts`, `src/hooks/useTiltEffect.ts`, `src/components/ui/MagneticWrapper.tsx`, `src/styles/interactions.css`

---

### 10.4 Page Transitions _(Fitur #10)_

**Konsep:** Route change = **packet switching** — content dissolves via circuit-pattern mask.

| Transition     | Trigger       | Visual                                        |
| -------------- | ------------- | --------------------------------------------- |
| Section scroll | Scroll        | Fade + stagger children (GSAP)                |
| Modal open     | Click card    | Circuit-trace border expand → content fade in |
| Modal close    | X / Escape    | Reverse circuit-trace → fade out              |
| 404            | Invalid route | "SIGNAL LOST" glitch                          |

Implementation: `AnimatePresence` wrapper di `layout.tsx`, `exit` variants per component.

**File:** `src/components/transitions/PageTransition.tsx`, `src/components/transitions/CircuitWipe.tsx`, `src/components/transitions/variants.ts`

---

### 10.5 Kinetic Typography _(Fitur #11)_

**Konsep:** Teks muncul seperti **data stream** — karakter ditransmisikan melalui kabel.

| Location       | Animation                         | Timing                    |
| -------------- | --------------------------------- | ------------------------- |
| Hero H1        | SplitText per-char reveal         | 0.03s/char, power3.out    |
| Section titles | SplitText per-word slide up       | 0.08s/word, ScrollTrigger |
| Stats/numbers  | Count-up                          | 2s, ScrollTrigger         |
| Code snippets  | Typewriter                        | 0.02s/char                |
| Tagline        | Scramble text (random → resolved) | GSAP TextPlugin           |

**File:** `src/components/typography/SplitTextReveal.tsx`, `src/components/typography/TypewriterText.tsx`, `src/components/typography/ScrambleText.tsx`, `src/components/typography/CountUp.tsx`

---

### 10.6 SVG Circuit Animation ★ SIGNATURE INTERACTION _(Fitur #12)_

**Konsep:** Inti visual "The Schematic Network" — SVG circuit board yang hidup.

```
Circuit Layer Stack:
├── Layer 0: Grid pattern (subtle, static)
├── Layer 1: Trace paths (DrawSVG on scroll)
├── Layer 2: Component symbols (fade in at nodes)
├── Layer 3: Data dots (MotionPath along traces)
└── Layer 4: Glow effects (filter: blur + opacity)
```

**Key Animations:**

1. DrawSVG traces: `drawSVG: "0%"` → `"100%"` on scroll
2. Node activation: scale + glow saat section enter
3. Data flow dots: circles along MotionPath (loop)
4. MorphSVG: shapes morph antar section (resistor → router → server)

**File:** `src/components/circuit/CircuitBoard.tsx`, `src/components/circuit/Trace.tsx`, `src/components/circuit/Node.tsx`, `src/components/circuit/DataFlow.tsx`, `src/components/circuit/ComponentSymbol.tsx`, `public/svg/circuit-hero.svg`, `public/svg/circuit-skills.svg`, `public/svg/circuit-full.svg`

---

### 10.7 Performance — 60fps Target _(Fitur #13)_

**Konsep:** Jank = packet loss. Target: **0% frame drop.**

| Technique                         | Detail                                                        |
| --------------------------------- | ------------------------------------------------------------- |
| GPU-accelerated only              | Hanya `transform` + `opacity` — TIDAK `width/height/top/left` |
| `will-change` selective           | Hanya saat animasi aktif, remove setelah selesai              |
| `gsap.context()` cleanup          | Wajib di setiap `useLayoutEffect`                             |
| Lenis + RAF sync                  | Single RAF loop untuk Lenis + GSAP ticker                     |
| `@media (prefers-reduced-motion)` | Disable semua animasi                                         |
| Bundle splitting                  | Dynamic import untuk Rive canvas                              |

**Monitoring:** Chrome DevTools ≤16.67ms/frame, `@vercel/speed-insights`, Lighthouse CI.

**File:** `src/lib/animation-utils.ts`, `src/hooks/useReducedMotion.ts`, `src/lib/lenis-gsap-bridge.ts`

---

## 11. Content Architecture & Storytelling

### 11.1 Hero Section _(Fitur #14)_

**Konsep:** First screen = **network control center.** Nama (callsign), role (designation), circuit animation booting.

```
┌──────────────────────────────────────────────┐
│  [Nav — minimal, transparent]                │
│                                              │
│      ┌─────────────────────┐                 │
│      │  CIRCUIT ANIMATION  │ (DrawSVG bg)    │
│      └─────────────────────┘                 │
│                                              │
│  RAFLI ZAARDIANSA          (SplitText reveal) │
│  Network, Hardware, Software                  │
│  & Cyber Security          (typewriter)       │
│  "Engineering the invisible                  │
│   infrastructure that keeps                  │
│   the world connected."    (fade in)          │
│                                              │
│  [↓ Scroll indicator — animated pulse]       │
└──────────────────────────────────────────────┘
```

**File:** `src/components/sections/Hero.tsx`, `src/components/sections/hero/HeroStatement.tsx`, `src/components/sections/hero/HeroCircuit.tsx`, `src/components/sections/hero/ScrollIndicator.tsx`

---

### 11.2 About — Personal Narrative _(Fitur #15)_

**Konsep:** About = **system specification sheet** yang diceritakan secara manusiawi.

```
Origin Story → Education Path (SMK & IPB) → Philosophy → Credentials (LinkedIn-style) → Current Focus
```

Bukan daftar spec, tapi narasi _kenapa_ berkecimpung di dunia network, hardware, software, dan cyber security — momen "aha", filosofi ("infrastruktur terbaik tak terlihat"), dan fokus saat ini.

**Detail Riwayat Pendidikan:**

- **SMK Negeri 1 Cikarang Selatan** (Kompetensi Keahlian: Teknik Komputer dan Jaringan)
- **IPB University** (Program Studi: Teknologi Rekayasa Komputer (D4) — Sedang Menempuh Pendidikan)

**Credentials & Certificate Card Layout (LinkedIn-Style Template):**
Komponen kartu sertifikat (`CertificateCard.tsx`) yang meniru format resmi LinkedIn Certification:

- **Issuer Logo / Icon:** Representasi visual instansi penerbit sertifikat.
- **Certificate Title / Name:** Judul sertifikasi yang diraih.
- **Issuing Organization:** Nama organisasi penerbit.
- **Issue Date & Expiry:** Tanggal terbit dan tanggal kadaluarsa (jika ada).
- **Credential ID:** Nomor seri/ID kredensial unik.
- **Verification CTA Link:** Tombol "Show credential" dengan ikon `ExternalLink` menuju URL verifikasi resmi.

**File:**

- `src/components/sections/About.tsx`
- `src/components/sections/about/OriginStory.tsx`
- `src/components/sections/about/EducationPath.tsx`
- `src/components/sections/about/Philosophy.tsx`
- `src/components/sections/about/Credentials.tsx`

---

### 11.3 Project Case Studies _(Fitur #16)_

**Konsep:** Setiap project = **network topology yang bisa di-explore.** Card → modal deep-dive.

```
Card:      [Thumbnail] → Name → Type → Tags → "Click to expand"
Modal:     PROBLEM → (trace) → PROCESS (interactive SVG) → (trace) → SOLUTION + Metrics
```

**File:** `src/components/sections/Projects.tsx`, `src/components/sections/projects/ProjectCard.tsx`, `src/components/sections/projects/ProjectModal.tsx`, `src/components/sections/projects/TopologyDiagram.tsx`, `src/data/projects.ts`

---

### 11.4 Skills — Interactive Network Topology _(Fitur #17)_

**Konsep:** Skills bukan list, tapi **interactive topology graph.** Setiap skill = node, terhubung berdasarkan relasi. Hover = highlight connections.

```
       [Routing]
      /    |    \
[OSPF] [BGP]  [EIGRP]
    \    |    /
     [Cisco IOS]
```

SVG-based (accessibility + SEO). Node colors by proficiency: green (proficient), cyan (intermediate), amber (learning).

**File:** `src/components/sections/Skills.tsx`, `src/components/sections/skills/SkillGraph.tsx`, `src/components/sections/skills/SkillNode.tsx`, `src/components/sections/skills/SkillDetail.tsx`, `src/data/skills.ts`

---

### 11.5 Contact — TCP Handshake Form _(Fitur #18)_

**Konsep:** Form = **TCP 3-way handshake.**

```
Step 1: "SYN"     — Nama
Step 2: "SYN-ACK" — Email
Step 3: "ACK"     — Pesan
→ ESTABLISHED     — Submit → "Connection Established ✓" (MorphSVG checkmark)
```

Submit via `resend` API. Success: animated circuit → checkmark morph.

**File:** `src/components/sections/Contact.tsx`, `src/components/sections/contact/HandshakeForm.tsx`, `src/components/sections/contact/ConnectionStatus.tsx`, `src/app/api/contact/route.ts`

---

### 11.6 Navigation System _(Fitur #19)_

**Konsep:** Nav = **network dashboard status bar.**

```
Desktop: [Logo]  Hero  About  Skills  Projects  Contact  [🌙]
         ═══════════████████░░░░░░░░░░░░░░  45%

Mobile:  Hamburger → fullscreen overlay + circuit trace menu animation
```

**Behavior:** Transparent → solid on scroll. Active section via IntersectionObserver. Hide on scroll-down, show on scroll-up. Lenis `scrollTo()` on click.

**File:** `src/components/navigation/Navbar.tsx`, `src/components/navigation/NavLink.tsx`, `src/components/navigation/MobileMenu.tsx`, `src/components/navigation/ScrollProgress.tsx`, `src/hooks/useActiveSection.ts`, `src/hooks/useScrollDirection.ts`

---

### 11.7 Footer _(Fitur #20)_

**Konsep:** End of circuit / **ground plane ⏚.**

```
═══ CIRCUIT TRACES ═══ → ⏚
[GitHub] [LinkedIn] [Email] [Resume]
About · Projects · Skills · Contact
© 2026 Rafli Zaardiansa
"Every packet finds its destination." 🌐
```

**File:** `src/components/sections/Footer.tsx`, `src/components/sections/footer/SocialLinks.tsx`, `src/components/sections/footer/GroundSymbol.tsx`

---

## 12. Component Architecture

### 12.1 Atomic Design Folder Structure _(Fitur #21)_

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home (single page)
│   ├── not-found.tsx             # 404 "SIGNAL LOST"
│   ├── error.tsx                 # Error boundary "SYSTEM FAULT"
│   ├── global-error.tsx          # Root error boundary
│   ├── loading.tsx               # Loading UI
│   ├── globals.css
│   └── api/contact/route.ts
│
├── components/
│   ├── ui/                       # Atoms — primitives
│   ├── typography/               # Text animation components
│   ├── circuit/                  # Schematic visual system
│   ├── layout/                   # Container, Grid
│   ├── navigation/               # Nav system
│   ├── preloader/                # Boot sequence
│   ├── scroll/                   # Scroll narrative
│   ├── transitions/              # Page transitions
│   ├── sections/                 # Page sections (organisms)
│   └── decorative/               # Background elements
│
├── hooks/                        # Custom React hooks
├── stores/                       # Zustand stores
├── providers/                    # React context providers
├── lib/                          # Utilities
├── data/                         # Static data
└── styles/tokens/                # Design tokens CSS
```

---

### 12.2 UI Component Primitives _(Fitur #22)_

CVA (Class Variance Authority) pattern untuk semua primitives:

| Component         | Variants                               | Special Features                                                                     |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| `Button`          | primary, secondary, ghost × sm, md, lg | Magnetic hover, circuit-border animation                                             |
| `Card`            | default, elevated, interactive         | 3D tilt on hover, glow border                                                        |
| `Badge`           | skill, status, tag                     | Color-coded by category                                                              |
| `Modal`           | project, generic                       | Headless UI Dialog, AnimatePresence                                                  |
| `Input`           | text, email, textarea                  | Floating label, focus glow                                                           |
| `Tooltip`         | top, bottom, left, right               | Fade + translate                                                                     |
| `Skeleton`        | line, circle, card                     | Pulse animation matching component shapes                                            |
| `CertificateCard` | default, active                        | LinkedIn-style certification card layout with issuer logo, ID, and verification link |

**File:** `src/components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `Modal.tsx`, `Input.tsx`, `Tooltip.tsx`, `Skeleton.tsx`, `CertificateCard.tsx`

---

### 12.3 Global State — Zustand _(Fitur #23)_

| Store         | State                                            | Persist      |
| ------------- | ------------------------------------------------ | ------------ |
| `theme-store` | `mode`, `resolved`                               | localStorage |
| `audio-store` | `isMuted`, `volume`, `isAmbientPlaying`          | —            |
| `nav-store`   | `activeSection`, `isMenuOpen`, `scrollProgress`  | —            |
| `app-store`   | `isLoaded`, `isPreloaderComplete`, `cursorState` | —            |

**File:** `src/stores/theme-store.ts`, `audio-store.ts`, `nav-store.ts`, `app-store.ts`

---

### 12.4 Lenis + GSAP Bridge _(Fitur #24)_

```typescript
// Single RAF loop — Lenis scroll synced with GSAP ticker
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**File:** `src/providers/LenisProvider.tsx`, `src/lib/lenis-gsap-bridge.ts`

---

## 13. Technical Infrastructure

### 13.1 SEO & Metadata _(Fitur #25)_

```
Next.js Metadata API:
├── title: "Rafliza Ardiansa — Network, Hardware, Software & Cyber Security"
├── description: "..."
├── openGraph: { images: ["/api/og"] }
├── twitter: { card: "summary_large_image" }
└── JSON-LD: Person + ProfilePage schema
```

Dynamic OG image via `next/og` (Vercel OG).

**File:** `src/app/layout.tsx`, `src/app/api/og/route.tsx`, `src/lib/metadata.ts`

---

### 13.2 Next.js Config _(Fitur #26)_

```typescript
// next.config.ts additions
{
  images: { formats: ['image/avif', 'image/webp'] },
  headers: [
    'X-Frame-Options: DENY',
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: origin-when-cross-origin',
    'Cache-Control: public, max-age=31536000, immutable (fonts)',
  ],
}
```

---

### 13.3 Error Pages _(Fitur #27)_

**404 — "SIGNAL LOST":**

```
╳ ─ ─ ─ ╳ ─ ─ ─ ╳  (broken circuit traces)
SIGNAL LOST · 404
"The packet never arrived."
[← Return to Origin]
```

**Error — "SYSTEM FAULT":** Red traces, glitch text, retry + home link.

**File:** `src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/global-error.tsx`

---

### 13.4 Loading & Skeleton States _(Fitur #28)_

| Context          | Loading UI                |
| ---------------- | ------------------------- |
| Initial load     | Preloader (boot sequence) |
| Route transition | CircuitWipe               |
| Modal content    | Skeleton pulse            |
| Images           | Blur placeholder → sharp  |
| Form submit      | Circuit trace spinning    |

**File:** `src/app/loading.tsx`, `src/components/ui/Skeleton.tsx`, `src/components/ui/LoadingSpinner.tsx`

---

## 14. Accessibility & Responsiveness

### 14.1 Responsive Design — Mobile First _(Fitur #29)_

| Breakpoint       | Changes                                                           |
| ---------------- | ----------------------------------------------------------------- |
| < 640px (mobile) | Single column, hamburger, simplified circuits, 44px touch targets |
| 640-768px        | 2-col projects, side nav                                          |
| 768-1024px       | Full nav, 2-col about, skill graph scales                         |
| 1024-1280px      | Full layout, all animations, 3-col projects                       |
| > 1280px         | Max-width container, larger type                                  |

**Key decisions:** Reduced circuit complexity on mobile, cursor disabled on touch, parallax disabled on mobile, type scale -1 step.

---

### 14.2 Accessibility — WCAG 2.1 AA _(Fitur #30)_

| Requirement       | Implementation                                        |
| ----------------- | ----------------------------------------------------- |
| Color contrast    | 4.5:1 ratio verified (copper on substrate)            |
| Keyboard nav      | All focusable, copper glow focus ring                 |
| Screen reader     | Semantic HTML5, `aria-label` on icon buttons          |
| Skip to content   | First focusable element                               |
| Reduced motion    | `prefers-reduced-motion` disables all animation       |
| Focus trap        | Modal focus management                                |
| Alt text          | All images described                                  |
| Heading hierarchy | Single `<h1>`, proper `<h2>`→`<h6>`                   |
| ARIA landmarks    | `<nav>`, `<main>`, `<footer>`, `<section aria-label>` |
| Touch targets     | Min 44×44px                                           |
| Language          | `<html lang="en">`                                    |

**File:** `src/components/ui/SkipToContent.tsx`, `src/hooks/useReducedMotion.ts`, `src/components/ui/FocusTrap.tsx`

---

## 15. File Inventory Summary

**Total: ~65 files across 15 directories.**

| Domain           | Files     | Key Output                                |
| ---------------- | --------- | ----------------------------------------- |
| Design Tokens    | 6         | `styles/tokens/*.css`                     |
| UI Primitives    | 10        | `components/ui/*.tsx`                     |
| Typography       | 4         | `components/typography/*.tsx`             |
| Circuit System   | 5 + 3 SVG | `components/circuit/*.tsx`, `public/svg/` |
| Navigation       | 6         | `components/navigation/*.tsx`             |
| Preloader        | 3         | `components/preloader/*.tsx`              |
| Scroll           | 3         | `components/scroll/*.tsx`                 |
| Transitions      | 3         | `components/transitions/*.tsx`            |
| Sections         | 14        | `components/sections/**/*.tsx`            |
| Hooks            | 7         | `hooks/*.ts`                              |
| Stores           | 4         | `stores/*.ts`                             |
| Providers        | 3         | `providers/*.tsx`                         |
| Lib/Utils        | 5         | `lib/*.ts`                                |
| Data             | 3         | `data/*.ts`                               |
| App (routes/api) | 6         | `app/**/*.tsx`                            |

---

## 16. Execution Phases

### Phase 0: Foundation (Minggu 1)

- [ ] Design tokens (typography, colors, spacing)
- [ ] Font setup (`next/font/google`)
- [ ] Tailwind config extend
- [ ] Folder structure scaffold
- [ ] Utility functions (`cn()`, font config)
- [ ] Content inventory (semua teks, data skills, data projects)

### Phase 1: Core (Minggu 2-3)

- [ ] UI primitives (Button, Card, Badge, Input, Modal)
- [ ] Theme system (Zustand + ThemeProvider + toggle)
- [ ] Navigation (Navbar, ScrollProgress, MobileMenu)
- [ ] Lenis + GSAP bridge
- [ ] Hero section + HeroCircuit
- [ ] About section
- [ ] Skills section + SkillGraph
- [ ] Projects section + ProjectCard + ProjectModal
- [ ] Contact section + HandshakeForm
- [ ] Footer

### Phase 2: Animation & Polish (Minggu 4-5)

- [ ] Preloader boot sequence
- [ ] Custom cursor system
- [ ] Scroll narrative + CircuitPath
- [ ] SVG circuit animations (DrawSVG, MotionPath, MorphSVG)
- [ ] SplitText & kinetic typography
- [ ] Micro-interactions (magnetic, tilt, hover states)
- [ ] Page transitions (AnimatePresence, CircuitWipe)
- [ ] Audio integration (ambient + feedback sounds)

### Phase 3: Production (Minggu 6)

- [ ] SEO metadata + OG image generation
- [ ] Error pages (404, error, global-error)
- [ ] Loading/skeleton states
- [ ] Responsive QA (all breakpoints)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance audit (Lighthouse >95)
- [ ] Next.js config optimization
- [ ] CI/CD (GitHub Actions)
- [ ] Deploy to Vercel + custom domain

---

## 17. Catatan Arsitektur Final

1. **Satu animation engine per konteks** — GSAP untuk scroll narrative & SVG, Motion untuk UI micro-interaction. Jangan tumpang tindih.
2. **`gsap.context()` wajib** di setiap `useLayoutEffect` yang pakai ScrollTrigger, untuk cleanup dan cegah memory leak.
3. **Verifikasi versi & lisensi GSAP plugin** sebelum deploy produksi.
4. **Hindari 3D WebGL berat** — batasi ke 2D (SVG + Rive) demi 60 FPS di semua device.
5. **Mobile-first development** — mulai dari breakpoint terkecil, scale up.
6. **Accessibility bukan afterthought** — integrate dari awal, bukan patch di akhir.
7. **Content-first** — tulis semua teks dan kumpulkan aset SEBELUM coding section.
8. **`prefers-reduced-motion` respect** — semua animasi harus bisa di-disable gracefully.
9. **Single RAF loop** — Lenis + GSAP share satu loop, jangan buat loop terpisah.
10. **Test on real devices** — Chrome DevTools mobile emulation TIDAK cukup untuk validasi performa.
