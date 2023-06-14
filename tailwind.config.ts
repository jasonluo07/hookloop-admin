import { Config } from 'tailwindcss';

export default {
  important: true,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
