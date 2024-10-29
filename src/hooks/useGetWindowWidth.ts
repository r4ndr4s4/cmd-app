import { useEffect, useState } from "react";

function useGetWindowWidth(callback: () => void) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      callback();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback]);

  return windowWidth;
}

export default useGetWindowWidth;
