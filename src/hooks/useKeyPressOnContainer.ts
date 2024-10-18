import { useEffect, useCallback, KeyboardEvent, useRef } from "react";

import useDetectTouchScreenDevice from "./useDetectTouchScreenDevice";

function useKeyPressOnContainer(keys: string[], callback: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const isTouchScreenDevice = useDetectTouchScreenDevice();

  useEffect(() => {
    if (!isTouchScreenDevice) {
      containerRef.current?.focus();
    }
  });

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (keys.includes(e.key)) {
        callback();
      }
    },
    [callback, keys]
  );

  return { containerRef, hiddenInputRef, handleKeyUp };
}

export default useKeyPressOnContainer;
