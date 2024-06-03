import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '900px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'header-shrink': {
          from: {
            height: '4rem',
          },
          to: {
            height: '2rem',
          },
        },
        'blur-in': {
          '0%': { opacity: '.1', filter: 'blur(.5rem)' },
          '50%': { opacity: '1', filter: 'blur(0rem)' },
          '85%': { opacity: '1', filter: 'blur(0rem)' },
          '100%': { opacity: '.1', filter: 'blur(.5rem)' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(.95)' },
          '50%': { transform: 'scale(1)' },
          '85%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(.95)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'header-shrink': 'header-shrink 0.2s linear forwards',
        'blur-in': 'blur-in 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
      },
    },
    supports: {
      'scroll-timeline': '(animation-timeline: scroll())',
      'no-scroll-timeline': 'not (animation-timeline: scroll())',
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config

export default config
