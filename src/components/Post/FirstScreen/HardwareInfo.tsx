import { useEffect, useState } from "react";

const MEMORY = 32768;

const INITIAL_MEMORY = 640;
const MEMORY_INCREMENT = INITIAL_MEMORY - 1;

function HardwareInfo() {
  const [testedMemory, setTestedMemory] = useState(INITIAL_MEMORY);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.min(MEMORY, testedMemory + MEMORY_INCREMENT);

      if (increment === MEMORY) {
        clearInterval(interval);
      }

      setTestedMemory(increment);
    }, 25);

    return () => clearInterval(interval);
  }, [testedMemory]);

  return (
    <>
      <p>(55XWUQ0E) Intel i430VX PCIset(TM)</p>
      <br />

      <p>PENTIUM-S CPU at 75MHz</p>
      <p>Memory Test: {testedMemory}K OK</p>
    </>
  );
}

export default HardwareInfo;
