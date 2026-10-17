/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pearl: {
          50: '#FFFFFF',
          100: '#FAFBFC',
          200: '#F4F6F9',
          300: '#EEF2F6',
          400: '#E2E8F0',
          500: '#CBD5E1'
        },
        carbon: {
          900: '#0B0F19',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
          400: '#64748B',
          300: '#94A3B8'
        },
        sunset: {
          rose: '#FF2E63',
          crimson: '#FF0055',
          coral: '#FF4D6D',
          glow: 'rgba(255, 46, 99, 0.25)'
        },
        electric: {
          indigo: '#4F46E5',
          violet: '#7C3AED',
          purple: '#9333EA',
          glow: 'rgba(124, 58, 237, 0.25)'
        },
        cyber: {
          cyan: '#0284C7',
          teal: '#0D9488',
          sky: '#0284C7',
          glow: 'rgba(2, 132, 199, 0.25)'
        },
        hyper: {
          emerald: '#059669',
          lime: '#16A34A',
          mint: '#10B981',
          glow: 'rgba(5, 150, 105, 0.25)'
        },
        glass: {
          border: 'rgba(226, 232, 240, 0.85)',
          'border-bright': 'rgba(203, 213, 225, 0.9)',
          card: 'rgba(255, 255, 255, 0.85)',
          surface: 'rgba(248, 250, 252, 0.85)',
          highlight: 'rgba(255, 255, 255, 0.95)'
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-radial': 'radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 70%)',
        'cyber-sunset': 'linear-gradient(135deg, #FF2E63 0%, #7C3AED 50%, #0284C7 100%)',
        'luxe-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 46, 99, 0.12) 0%, rgba(124, 58, 237, 0.08) 40%, rgba(2, 132, 199, 0.05) 70%, transparent 85%)',
        'mesh-glow': 'radial-gradient(ellipse at 85% 15%, rgba(255, 46, 99, 0.09), transparent 50%), radial-gradient(ellipse at 15% 85%, rgba(124, 58, 237, 0.08), transparent 50%)'
      },
      boxShadow: {
        'luxe-card': '0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 20px 40px -15px rgba(15, 23, 42, 0.07)',
        'luxe-hover': '0 20px 40px -10px rgba(15, 23, 42, 0.1), 0 30px 60px -20px rgba(255, 46, 99, 0.12)',
        'luxe-pill': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'neon-rose': '0 10px 25px -4px rgba(255, 46, 99, 0.35)',
        'neon-violet': '0 10px 25px -5px rgba(124, 58, 237, 0.35)',
        'glass-card': '0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 25px 50px -15px rgba(15, 23, 42, 0.07)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'radar': 'radar 8s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeRev 25s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        marqueeRev: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    },
  },
  plugins: [],
}
