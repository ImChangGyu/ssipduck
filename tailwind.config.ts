import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4f92f6',
        primary_darken: '#0C2A56',
        gray_description: '#999',
        hover_shadow_color: 'rgba(79, 146, 246, 0.2)',
        gray_scale_100: '#D7D7D7',
        blur_background: 'linear-gradient(0deg, #0C2A56, transparent 50%);',
      },
      boxShadow: {
        item: '0px 8px 24px 0px #eff1f4',
        input: '0px 8px 24px 4px #EFF1F4',
      },
      gridTemplateColumns: {
        list: 'repeat(auto-fill, minmax(320px, 1fr))',
        modal_list: 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      keyframes: {
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
    screens: {
      md: { max: '768px' },
    },
  },
  plugins: [],
};
export default config;
