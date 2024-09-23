import { useEffect, useRef, useState } from "react";

import { useStore } from "../../../store";
import Delay from "../../common/DelayedRender";
import useDelayedPostStateChange from "../../../hooks/useDelayedPostStateChange";
import { PostState } from "../../../store/types";

const MEMORY = 32768;
const INITIAL_MEMORY = 640;
const MEMORY_INCREMENT = INITIAL_MEMORY - 1;

function HardwareInfo() {
  const [testedMemory, setTestedMemory] = useState(INITIAL_MEMORY);
  const intervalRef = useRef<number>(0);

  const postState = useStore((state) => state.postState);

  useDelayedPostStateChange({
    from: PostState.PostFirstScreenInit,
    to: PostState.MemoryTestShow,
    ms: 1000,
  });
  useDelayedPostStateChange({
    from: PostState.MemoryTestShow,
    to: PostState.MemoryTestStart,
    ms: 1000,
  });

  useEffect(() => {
    if (postState < PostState.MemoryTestStart || intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTestedMemory((testedMemory) =>
        Math.min(MEMORY, testedMemory + MEMORY_INCREMENT)
      );
    }, 25);
  }, [postState]);

  useEffect(() => {
    if (testedMemory === MEMORY) {
      clearInterval(intervalRef.current);

      useStore.setState(
        () => ({
          postState: PostState.MemoryTestDone,
        }),
        undefined,
        {
          type: "postState",
          from: PostState.MemoryTestStart,
          to: PostState.MemoryTestDone,
        }
      );
    }
  }, [testedMemory]);

  return (
    <>
      <p>(55XWUQ0E) Intel i430VX PCIset(TM)</p>
      <br />

      <p>PENTIUM-S CPU at 75MHz</p>
      <Delay until={postState >= PostState.MemoryTestShow}>
        <p>Memory Test: {testedMemory}K OK</p>
      </Delay>
    </>
  );
}

export default HardwareInfo;
