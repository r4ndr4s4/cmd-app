import * as Sentry from "@sentry/react";
import ReactGA from "react-ga4";

import env from "./env.ts";

Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});

ReactGA.initialize(env.VITE_GA_ID);
