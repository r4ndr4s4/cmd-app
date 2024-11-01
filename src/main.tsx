import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import * as Sentry from "@sentry/react";
import GAnalytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

import "./index.css";
import App from "./App.tsx";
import env from "./utils/env.ts";

Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
  replaysSessionSampleRate: 1.0, // TODO lower it in prod
  replaysOnErrorSampleRate: 1.0,
});

export const analytics = GAnalytics({
  app: "r4ndr4s4-me",
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    googleAnalytics({
      measurementIds: ["G-QG8NKYW2EM"],
    }),
  ],
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
    <Analytics />
  </StrictMode>
);
