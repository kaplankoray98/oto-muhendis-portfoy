import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    theme: {
      extend: {
        colors: {
          brand: {
            red: '#d42b3b',
            lightRed: '#ffb3b1',
            dark: '#131313',
            surface: '#1c1b1b',
            outline: '#5b403d',
          }
        },
        fontFamily: {
          headline: ['"Space Grotesk"', 'sans-serif'],
          body: ['Manrope', 'sans-serif'],
        }
      }
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
