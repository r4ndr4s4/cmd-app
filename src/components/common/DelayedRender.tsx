import { ReactNode, useEffect, useState } from "react";

// TODO create unit tests, fix typing to disable edge cases
function Delay({
  children,
  ms,
  until,
  untilRender,
}: {
  children: ReactNode;
  ms?: number; // TODO handle undefined with guarding
  until?: boolean;
  untilRender?: ReactNode; // TODO remove if unused
}) {
  const [isRender, setRender] = useState(false);

  useEffect(() => {
    if (until !== undefined && !until) {
      return;
    }

    const timeout = setTimeout(() => setRender(true), ms);

    return () => clearTimeout(timeout);
  }, [ms, until]);

  if (!isRender || (until !== undefined && !until)) {
    return <>{untilRender}</>;
  }

  return <>{children}</>;
}

export default Delay;
