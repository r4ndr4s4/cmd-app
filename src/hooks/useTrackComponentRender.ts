import { useEffect } from "react";
import { track } from "@vercel/analytics/react";

import { analytics } from "../main";

function useTrackComponentRender(
  component: "APP" | "START" | "POST" | "FIRST_SCREEN" | "SECOND_SCREEN" | "CMD"
) {
  useEffect(() => {
    void analytics.track(`${component} rendered`);
  }, [component]);

  return { component, trackEvent: track };
}

export default useTrackComponentRender;
