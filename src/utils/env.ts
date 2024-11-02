import { cleanEnv, str, url } from "envalid";

const env = cleanEnv(import.meta.env, {
  VITE_SENTRY_DSN: url(),
  VITE_GA_ID: str(),
});

export default env;
