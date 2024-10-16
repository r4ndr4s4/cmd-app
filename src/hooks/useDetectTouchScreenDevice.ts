import { useEffect, useState } from "react";

function useDetectTouchScreenDevice() {
  const [isTouchScreenDevice, setTouchScreenDevice] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!window.matchMedia) {
      return;
    }

    setTouchScreenDevice(window.matchMedia("(pointer:coarse)").matches);
  }, []);

  return isTouchScreenDevice;
}

export default useDetectTouchScreenDevice;
