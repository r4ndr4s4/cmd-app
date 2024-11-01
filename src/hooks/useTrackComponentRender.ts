import { useEffect } from "react";
import { track } from "@vercel/analytics/react";

function useTrackComponentRender(
  component: "APP" | "START" | "POST" | "FIRST_SCREEN" | "SECOND_SCREEN" | "CMD"
) {
  useEffect(() => {
    track(`${component} rendered`);
  }, [component]);

  return { component, trackEvent: track };
}

export default useTrackComponentRender;
