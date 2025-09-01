import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(), // React plugin
    viteCompression({ algorithm: "gzip", threshold: 10240 }),
    viteCompression({ algorithm: "brotliCompress", threshold: 10240 }),
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
    }),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    minify: false, // Temporarily disable to debug React context issue
    // minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        ecma: 2020,
        passes: 2,
      },
    },
    rollupOptions: {
      external: () => {
        // Don't externalize React - keep it bundled but ensure proper context
        return false;
      },
      output: {
        // ✅ Removed aggressive manualChunks to prevent React context issues
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".").pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType))
            return `assets/images/[name].[hash][extname]`;
          if (/woff|woff2|eot|ttf|otf/i.test(extType))
            return `assets/fonts/[name].[hash][extname]`;
          if (/css/i.test(extType)) return `assets/css/[name].[hash][extname]`;
          return `assets/[name].[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    emptyOutDir: true,
    reportCompressedSize: true,
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
  },

  resolve: {
    alias: {
      react: "react",
      "react-dom": "react-dom",
    },
  },

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    global: "window",
    React: "window.React",
    t: "window.React", // Common minified variable names
    r: "window.React",
    e: "window.React",
  },

  server: {
    open: true,
    cors: true,
    headers: { "Cache-Control": "no-store" },
  },

  preview: {
    port: 4173,
    headers: { "Cache-Control": "public, max-age=31536000" },
  },
});
