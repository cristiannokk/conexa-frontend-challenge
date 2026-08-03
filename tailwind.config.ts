import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        conexa: {
          dark: "#0F172A",
          panel: "#1E293B",
          neon: "#39FF14",
          muted: "#94A3B8",
        },
      },
      backgroundImage: {
        'portal-gradient': 'linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
      },
      animation: {
        float: 'float 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
