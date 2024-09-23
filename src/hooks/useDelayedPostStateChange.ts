import { useEffect } from "react";

import { useStore } from "../store";
import { PostState } from "../store/types";

const useDelayedPostStateChange = ({
  from,
  to,
  ms,
}: {
  from: PostState;
  to: PostState;
  ms: number;
}) => {
  const postState = useStore((state) => state.postState);

  useEffect(() => {
    if (postState !== from) {
      return;
    }

    const timeout = setTimeout(() => {
      useStore.setState(
        () => ({
          postState: to,
        }),
        undefined,
        { type: "postState", from, to }
      );
    }, ms);

    return () => clearTimeout(timeout);
  }, [ms, from, to, postState]);
};

export default useDelayedPostStateChange;
