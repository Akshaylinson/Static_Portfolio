import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function githubPagesSpaPlugin(): Plugin {
  return {
    name: 'github-pages-spa',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const notFoundPath = path.join(distDir, '404.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }

      // Ensure root certificates/ are copied to dist/certificates/
      const rootCertsDir = path.resolve(__dirname, 'certificates');
      const distCertsDir = path.join(distDir, 'certificates');
      if (fs.existsSync(rootCertsDir)) {
        if (!fs.existsSync(distCertsDir)) {
          fs.mkdirSync(distCertsDir, { recursive: true });
        }
        const files = fs.readdirSync(rootCertsDir);
        for (const file of files) {
          const srcFile = path.join(rootCertsDir, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, path.join(distCertsDir, file));
          }
        }
      }

      // Ensure root resume.pdf is copied to dist/resume.pdf
      const rootResume = path.resolve(__dirname, 'resume.pdf');
      const distResume = path.join(distDir, 'resume.pdf');
      if (fs.existsSync(rootResume)) {
        fs.copyFileSync(rootResume, distResume);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), githubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
