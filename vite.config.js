import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip", // Enable gzip compression
      threshold: 10240, // Only compress files larger than 10kb
    }),
    viteCompression({
      algorithm: "brotliCompress", // Also enable Brotli compression
      threshold: 10240,
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.7, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
            active: false,
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
    visualizer({
      filename: "./dist/stats.html",
      open: false, // Set to true to automatically open the report after build
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    minify: "terser", // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        ecma: 2020,
        passes: 2, // Multiple passes for better optimization
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create more fine-grained chunks
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              // Split React packages for better caching
              if (id.includes("react-dom")) return "vendor-react-dom";
              return "vendor-react";
            }
            if (id.includes("bootstrap") || id.includes("react-icons"))
              return "vendor-ui";
            if (id.includes("firebase")) return "vendor-firebase";
            return "vendor"; // other dependencies
          }
          // Group application code by features
          if (id.includes("/components/")) {
            if (id.includes("/herosection/")) return "component-hero";
            if (id.includes("/navbar/")) return "component-navbar";
            return "components";
          }
        },
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          // Organize assets by file type for better caching
          const extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name].[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name].[hash][extname]`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the warning limit
    sourcemap: false, // Disable sourcemaps in production for smaller files
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets (< 4kb)
    emptyOutDir: true,
    reportCompressedSize: true, // Report gzip size in the build output
  },
  // Enable deep optimization
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
  },
  server: {
    open: true,
    cors: true,
    headers: {
      "Cache-Control": "no-store", // Better for development
    },
  },
  preview: {
    port: 4173,
    headers: {
      "Cache-Control": "public, max-age=31536000", // Long cache for production preview
    },
  },
});
