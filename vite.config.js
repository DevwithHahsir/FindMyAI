import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser", // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["bootstrap", "react-icons", "react-bootstrap"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the warning limit
  },
  // Enable deep optimization
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
  },
});
