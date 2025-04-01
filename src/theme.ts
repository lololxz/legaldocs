import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
}

export default config;