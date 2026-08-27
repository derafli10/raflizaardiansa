import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Responsive breakpoints (mobile-first)
      screens: {
        sm: '640px', // Mobile landscape
        md: '768px', // Tablet portrait
        lg: '1024px', // Tablet landscape / Desktop
        xl: '1280px', // Desktop
        '2xl': '1536px', // Large desktop
      },

      // Font families from design tokens
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },

      // Custom colors from design tokens (PCB-inspired palette)
      colors: {
        substrate: {
          DEFAULT: 'var(--color-substrate)',
          raised: 'var(--color-substrate-raised)',
          pattern: 'var(--color-substrate-pattern)',
        },
        copper: {
          DEFAULT: 'var(--color-copper)',
          bright: 'var(--color-copper-bright)',
          dim: 'var(--color-copper-dim)',
        },
        solder: {
          DEFAULT: 'var(--color-solder)',
          bright: 'var(--color-solder-bright)',
        },
        signal: {
          green: 'var(--color-signal-green)',
          red: 'var(--color-signal-red)',
          amber: 'var(--color-signal-amber)',
          cyan: 'var(--color-signal-cyan)',
        },
        trace: {
          DEFAULT: 'var(--color-trace)',
          active: 'var(--color-trace-active)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
      },

      // Spacing scale from design tokens (8px-based)
      spacing: {
        1: 'var(--space-1)', // 4px
        2: 'var(--space-2)', // 8px
        3: 'var(--space-3)', // 12px
        4: 'var(--space-4)', // 16px
        5: 'var(--space-5)', // 24px
        6: 'var(--space-6)', // 32px
        8: 'var(--space-8)', // 48px
        10: 'var(--space-10)', // 64px
        12: 'var(--space-12)', // 96px
        16: 'var(--space-16)', // 128px
      },

      // Type scale from design tokens (Modular Scale 1.25)
      fontSize: {
        xs: 'var(--font-xs)', // 10.24px
        sm: 'var(--font-sm)', // 12.80px
        base: 'var(--font-base)', // 16.00px
        md: 'var(--font-md)', // 20.00px
        lg: 'var(--font-lg)', // 24.96px
        xl: 'var(--font-xl)', // 31.25px
        '2xl': 'var(--font-2xl)', // 39.06px
        '3xl': 'var(--font-3xl)', // 48.83px
        '4xl': 'var(--font-4xl)', // 61.04px
      },

      // Line heights
      lineHeight: {
        tight: 'var(--leading-tight)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
      },

      // Letter spacing
      letterSpacing: {
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
      },

      // Border radius
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },

      // Box shadows (PCB glow effects)
      boxShadow: {
        'copper-glow': 'var(--shadow-copper-glow)',
        'signal-glow': 'var(--shadow-signal-glow)',
      },

      // Background gradients
      backgroundImage: {
        'copper-flow': 'var(--gradient-copper-flow)',
        'signal-pulse': 'var(--gradient-signal-pulse)',
        substrate: 'var(--gradient-substrate)',
      },

      // Z-index layers
      zIndex: {
        base: 'var(--z-base)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        cursor: 'var(--z-cursor)',
      },

      // Custom animations
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'circuit-trace': 'circuit-trace 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'data-flow': 'data-flow 3s linear infinite',
        'scan-line': 'scan-line 4s linear infinite',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'draw-svg': 'draw-svg 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },

      keyframes: {
        'circuit-trace': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '0.5',
            filter: 'blur(4px)',
          },
          '50%': {
            opacity: '1',
            filter: 'blur(8px)',
          },
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%) translateZ(0)' },
          '100%': { transform: 'translateX(100%) translateZ(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%) translateZ(0)' },
          '100%': { transform: 'translateY(100vh) translateZ(0)' },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) translateZ(0)',
          },
          '50%': {
            transform: 'translateY(-10px) translateZ(0)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% center',
          },
          '100%': {
            backgroundPosition: '200% center',
          },
        },
        'draw-svg': {
          '0%': {
            strokeDashoffset: '1',
          },
          '100%': {
            strokeDashoffset: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) translateZ(0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) translateZ(0)',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9) translateZ(0)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateZ(0)',
          },
        },
      },

      // Transition timing functions
      transitionTimingFunction: {
        'circuit-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'signal-ease': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-ease': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      // Transition durations
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        slower: '700ms',
      },

      // Backdrop blur for premium overlays
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [
    // Custom utility plugin for GPU-accelerated animations and premium effects
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        // GPU acceleration - Force hardware compositing
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        },

        // Circuit border animation with copper glow
        '.circuit-border-animation': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            borderRadius: 'inherit',
            padding: '2px',
            background: 'var(--gradient-copper-flow)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: '0',
            transition: 'opacity 0.3s var(--ease-circuit)',
          },
          '&:hover::before': {
            opacity: '1',
          },
        },

        // Animated border trace (DrawSVG-like effect)
        '.circuit-border-trace': {
          position: 'relative',
          backgroundImage: 'linear-gradient(90deg, var(--color-copper) 50%, transparent 50%)',
          backgroundSize: '200% 2px',
          backgroundPosition: '100% 0',
          backgroundRepeat: 'no-repeat',
          transition: 'background-position 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundPosition: '0 0',
          },
        },

        // Magnetic hover effect with smooth spring
        '.magnetic': {
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
        },

        // 3D tilt effect with preserved depth
        '.tilt-3d': {
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        },

        // Signal glow effect - animated pulse
        '.signal-glow': {
          animation: 'glow-pulse 2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 8px currentColor)',
        },

        // Circuit trace animation
        '.circuit-trace-animated': {
          animation: 'circuit-trace 2s ease-in-out infinite',
        },

        // GPU-optimized transforms (force 3D rendering)
        '.transform-gpu': {
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        },

        // Smooth scroll optimization
        '.scroll-smooth': {
          scrollBehavior: 'smooth',
        },

        // Hide scrollbar
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },

        // Circuit modal animation
        '.circuit-modal-animation': {
          animation: 'modalEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },

        // Copper glow on hover
        '.hover-copper-glow': {
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: 'var(--shadow-copper-glow)',
            transform: 'scale(1.02) translateZ(0)',
          },
        },

        // Signal glow on hover
        '.hover-signal-glow': {
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: 'var(--shadow-signal-glow)',
          },
        },

        // Glitch effect for error states
        '.glitch-text': {
          position: 'relative',
          '&::before, &::after': {
            content: 'attr(data-text)',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          },
          '&::before': {
            animation: 'glitch-1 0.5s infinite',
            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            transform: 'translate(-2px, -2px)',
          },
          '&::after': {
            animation: 'glitch-2 0.5s infinite',
            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
            transform: 'translate(2px, 2px)',
          },
        },

        // Premium blur backdrop
        '.backdrop-premium': {
          backdropFilter: 'blur(12px) saturate(150%)',
          backgroundColor: 'rgba(10, 15, 13, 0.7)',
        },

        // Floating animation
        '.float-animation': {
          animation: 'float 3s ease-in-out infinite',
        },

        '@keyframes modalEnter': {
          from: {
            opacity: '0',
            transform: 'scale(0.95) translateZ(0)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1) translateZ(0)',
          },
        },

        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0px) translateZ(0)',
          },
          '50%': {
            transform: 'translateY(-10px) translateZ(0)',
          },
        },

        '@keyframes glitch-1': {
          '0%, 100%': {
            transform: 'translate(0)',
          },
          '33%': {
            transform: 'translate(-2px, 2px)',
          },
          '66%': {
            transform: 'translate(2px, -2px)',
          },
        },

        '@keyframes glitch-2': {
          '0%, 100%': {
            transform: 'translate(0)',
          },
          '33%': {
            transform: 'translate(2px, -2px)',
          },
          '66%': {
            transform: 'translate(-2px, 2px)',
          },
        },
      });
    },
  ],
};

export default config;
