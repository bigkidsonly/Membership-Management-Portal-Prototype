module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "selector",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Original theme colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Hand-drawn ink style colors
        ink: {
          primary: "var(--ink-primary)",
          secondary: "var(--ink-secondary)",
          accent: "var(--ink-accent)",
          highlight: "var(--ink-highlight)",
          background: "var(--ink-background)",
          surface: "var(--ink-surface)",
          muted: "var(--ink-muted)",
          "light-gray": "var(--ink-light-gray)",
          border: "var(--ink-border)",
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Montserrat', 'ui-sans-serif', 'sans-serif', 'system-ui'],
        serif: ['IBM Plex Serif', 'ui-serif', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
        handwriting: ['Kalam', 'Comic Neue', 'cursive'],
      },
      
      fontSize: {
        // Enhanced typography scale for hand-drawn style
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.015em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.005em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.005em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.015em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Hand-drawn specific radius values
        'ink-sm': '0.25rem',
        'ink-md': '0.5rem',
        'ink-lg': '0.75rem',
      },
      
      boxShadow: {
        // Hand-drawn shadow styles
        'ink-sm': 'var(--ink-shadow-sm)',
        'ink-md': 'var(--ink-shadow-md)',
        'ink-lg': 'var(--ink-shadow-lg)',
        
        // Enhanced irregular shadows
        'sketchy-sm': '2px 3px 0px rgba(0, 0, 0, 0.1), -1px 1px 0px rgba(0, 0, 0, 0.05)',
        'sketchy-md': '3px 4px 0px rgba(0, 0, 0, 0.15), -1px 2px 0px rgba(0, 0, 0, 0.08)',
        'sketchy-lg': '4px 6px 0px rgba(0, 0, 0, 0.2), -2px 3px 0px rgba(0, 0, 0, 0.1)',
        'sketchy-xl': '6px 8px 0px rgba(0, 0, 0, 0.25), -3px 4px 0px rgba(0, 0, 0, 0.12)',
      },
      
      rotate: {
        // Hand-drawn rotation values
        'ink-light': 'var(--ink-rotation-light)',
        'ink-medium': 'var(--ink-rotation-medium)',
        'ink-strong': 'var(--ink-rotation-strong)',
        'ink-neg-light': 'calc(-1 * var(--ink-rotation-light))',
        'ink-neg-medium': 'calc(-1 * var(--ink-rotation-medium))',
        'ink-neg-strong': 'calc(-1 * var(--ink-rotation-strong))',
      },
      
      spacing: {
        // Enhanced spacing for hand-drawn layouts
        'ink-xs': 'var(--ink-offset-sm)',
        'ink-sm': 'var(--ink-offset-md)',
        'ink-md': 'var(--ink-offset-lg)',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderWidth: {
        // Hand-drawn border widths
        '3': '3px',
        '5': '5px',
        'ink': '2px', // Standard ink border width
      },
      
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        
        // Hand-drawn specific animations
        "wobble": {
          "0%, 100%": { 
            transform: "rotate(-0.3deg) scale(1)" 
          },
          "25%": { 
            transform: "rotate(0.3deg) scale(1.01)" 
          },
          "50%": { 
            transform: "rotate(-0.2deg) scale(1)" 
          },
          "75%": { 
            transform: "rotate(0.4deg) scale(0.99)" 
          },
        },
        
        "sketch-draw": {
          "0%": { 
            strokeDasharray: "0 100",
            opacity: "0"
          },
          "50%": {
            strokeDasharray: "50 100",
            opacity: "0.7"
          },
          "100%": { 
            strokeDasharray: "100 100",
            opacity: "1"
          },
        },
        
        "ink-splash": {
          "0%": { 
            transform: "rotate(-0.5deg) scale(0.8)",
            opacity: "0"
          },
          "50%": { 
            transform: "rotate(0.3deg) scale(1.05)",
            opacity: "0.8"
          },
          "100%": { 
            transform: "rotate(-0.2deg) scale(1)",
            opacity: "1"
          },
        },
        
        "hand-draw": {
          "0%": { 
            transform: "rotate(-1deg) translateX(-2px)",
            opacity: "0.3"
          },
          "25%": { 
            transform: "rotate(0.5deg) translateX(1px)",
            opacity: "0.6"
          },
          "50%": { 
            transform: "rotate(-0.3deg) translateX(0px)",
            opacity: "0.8"
          },
          "75%": { 
            transform: "rotate(0.7deg) translateX(-1px)",
            opacity: "0.9"
          },
          "100%": { 
            transform: "rotate(-0.2deg) translateX(0px)",
            opacity: "1"
          },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        
        // Hand-drawn animations
        "wobble": "wobble 2s ease-in-out infinite",
        "wobble-slow": "wobble 4s ease-in-out infinite",
        "sketch-draw": "sketch-draw 1.5s ease-out forwards",
        "ink-splash": "ink-splash 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "hand-draw": "hand-draw 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "hand-draw-slow": "hand-draw 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      },
      
      // Custom gradients for hand-drawn effects
      backgroundImage: {
        'ink-texture': 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)',
        'paper-texture': `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 200, 120, 0.03) 0%, transparent 50%)
        `,
        'sketchy-gradient': 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%)',
      },
      
      // Enhanced transition timing for hand-drawn feel
      transitionTimingFunction: {
        'ink-ease': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'hand-draw': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // Custom z-index values for layered hand-drawn effects
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  
  plugins: [
    // Custom plugin for hand-drawn utilities
    function({ addUtilities, theme }) {
      const inkUtilities = {
        // Sketchy border utilities
        '.border-sketchy': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            border: `2px solid ${theme('colors.ink.border')}`,
            borderRadius: 'inherit',
            transform: 'rotate(-0.5deg)',
            pointerEvents: 'none',
            zIndex: '-1',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '0',
            border: `2px solid ${theme('colors.ink.border')}`,
            borderRadius: 'inherit',
            transform: 'rotate(0.3deg) translate(1px, 1px)',
            pointerEvents: 'none',
            zIndex: '-1',
          },
        },
        
        '.border-sketchy-light': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            border: `1px solid ${theme('colors.ink.border')}`,
            borderRadius: 'inherit',
            transform: 'rotate(-0.3deg)',
            pointerEvents: 'none',
            zIndex: '-1',
          },
        },
        
        // Underline effects
        '.underline-sketchy': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            width: '100%',
            height: '2px',
            backgroundColor: theme('colors.ink.accent'),
            transform: 'rotate(0.5deg)',
          },
        },
        
        '.underline-sketchy-secondary': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            width: '100%',
            height: '2px',
            backgroundColor: theme('colors.ink.secondary'),
            transform: 'rotate(-0.4deg)',
          },
        },
        
        '.underline-sketchy-highlight': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            width: '100%',
            height: '2px',
            backgroundColor: theme('colors.ink.highlight'),
            transform: 'rotate(0.7deg)',
          },
        },
        
        // Hand-drawn button styles
        '.btn-sketchy': {
          position: 'relative',
          transform: 'rotate(-0.5deg)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            transform: 'rotate(0.3deg) scale(1.02)',
          },
          '&:active': {
            transform: 'rotate(0.5deg) scale(0.98)',
          },
        },
        
        // Text rotation utilities
        '.text-rotate-1': { transform: 'rotate(0.5deg)' },
        '.text-rotate-2': { transform: 'rotate(-0.3deg)' },
        '.text-rotate-3': { transform: 'rotate(0.7deg)' },
        '.-text-rotate-1': { transform: 'rotate(-0.5deg)' },
        '.-text-rotate-2': { transform: 'rotate(0.3deg)' },
        '.-text-rotate-3': { transform: 'rotate(-0.7deg)' },
      }

      addUtilities(inkUtilities)
    }
  ],
}