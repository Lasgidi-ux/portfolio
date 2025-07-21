/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Optimized color palette
      colors: {
        'cyber-black': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
        'neon-green': '#00ff41',
        'neon-blue': '#0080ff',
        'neon-purple': '#8000ff',
        'neon-pink': '#ff0080',
        'glass-dark': 'rgba(26, 26, 26, 0.8)',
        'glass': 'rgba(26, 26, 26, 0.8)',
      },
      // Performance-optimized animations
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41' },
          '100%': { boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      // Optimized font families
      fontFamily: {
        'cyber': ['var(--font-orbitron)', 'Orbitron', 'monospace'],
        'terminal': ['Courier New', 'monospace'],
      },
      // Performance-optimized backdrop blur
      backdropBlur: {
        xs: '2px',
      },
      // Optimized shadows
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 65, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 128, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(128, 0, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 128, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [
    // Custom utilities for performance
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.glass-panel': {
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glow-text': {
          textShadow: '0 0 10px currentColor',
        },
        '.loading-dots::after': {
          content: '""',
          animation: 'blink 1s infinite',
        },
        // Performance-optimized 3D transforms
        '.transform-3d': {
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: 'transform 0.3s ease',
        },
        '.transform-3d:hover': {
          transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Reduce CSS output size
  corePlugins: {
    preflight: true,
    container: false,
  },
} 