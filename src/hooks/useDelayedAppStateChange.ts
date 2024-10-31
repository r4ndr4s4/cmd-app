import { useEffect } from "react";

import { useStore } from "../store";
import { AppState } from "../store/types";

const useDelayedAppStateChange = ({
  from,
  to,
  ms,
}: {
  from: AppState;
  to: AppState;
  ms: number;
}) => {
  const appState = useStore((state) => state.appState);

  useEffect(() => {
    if (appState !== from) {
      return;
    }

    const timeout = setTimeout(() => {
      useStore.setState(
        () => ({
          appState: to,
        }),
        undefined,
        { type: "appState", from, to }
      );
    }, ms);

    return () => clearTimeout(timeout);
  }, [ms, from, to, appState]);
};

export default useDelayedAppStateChange;
