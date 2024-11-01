import { useEffect } from "react";
import track from "react-ga4";

export const trackEvent = (category: string, action: string) =>
  track.event({
    category,
    action,
  });

function useTrackComponentRender(
  component: "APP" | "START" | "POST" | "FIRST_SCREEN" | "SECOND_SCREEN" | "CMD"
) {
  useEffect(() => {
    track.send({ hitType: "pageview", page: component });
  }, [component]);

  return { component, trackEvent };
}

export default useTrackComponentRender;
