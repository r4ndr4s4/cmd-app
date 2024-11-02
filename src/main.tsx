import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import * as Sentry from "@sentry/react";
import ReactGA from "react-ga4";

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

ReactGA.initialize(env.VITE_GA_ID);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>
);
