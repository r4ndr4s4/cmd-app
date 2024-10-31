import { ReactNode, useEffect, useState } from "react";

function DelayRender({
  children,
  ms,
  until,
  untilRender,
}: {
  children: ReactNode;
  ms?: number;
  until?: boolean;
  untilRender?: ReactNode;
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

export default DelayRender;
