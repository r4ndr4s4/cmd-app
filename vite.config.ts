import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "r4ndr4s4-me",
      project: "r4ndr4s4-me",
      telemetry: false,
    }),
  ],
  build: {
    sourcemap: true,
  },
});
