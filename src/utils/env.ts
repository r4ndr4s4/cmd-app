import { cleanEnv, url } from "envalid";

const env = cleanEnv(import.meta.env, {
  VITE_SENTRY_DSN: url(),
});

export default env;
