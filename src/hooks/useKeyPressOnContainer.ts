import { useEffect, useCallback, KeyboardEvent, useRef } from "react";

function useKeyPressOnContainer(keys: string[], callback: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  });

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (keys.includes(e.key)) {
        callback();
      }
    },
    [callback, keys]
  );

  return { containerRef, handleKeyUp };
}

export default useKeyPressOnContainer;
