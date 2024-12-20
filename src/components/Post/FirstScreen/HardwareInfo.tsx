import { useEffect, useRef, useState } from "react";

import { useStore } from "../../../store";
import DelayRender from "../../common/DelayRender";
import useDelayedAppStateChange from "../../../hooks/useDelayedAppStateChange";
import { AppState } from "../../../store/types";
import { InlinePre } from "../../../utils/styles";

const MEMORY = 32768;
const INITIAL_MEMORY = 640;
const MEMORY_INCREMENT = INITIAL_MEMORY - 1;

function HardwareInfo() {
  const [testedMemory, setTestedMemory] = useState(INITIAL_MEMORY);
  const intervalRef = useRef<number>(0);

  const appState = useStore((state) => state.appState);

  useDelayedAppStateChange({
    from: AppState.PostFirstScreenInit,
    to: AppState.MemoryTestShow,
    ms: 1000,
  });
  useDelayedAppStateChange({
    from: AppState.MemoryTestShow,
    to: AppState.MemoryTestStart,
    ms: 1000,
  });

  useEffect(() => {
    if (appState < AppState.MemoryTestStart || intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTestedMemory((testedMemory) =>
        Math.min(MEMORY, testedMemory + MEMORY_INCREMENT)
      );
    }, 25);
  }, [appState]);

  useEffect(() => {
    if (testedMemory === MEMORY) {
      clearInterval(intervalRef.current);

      useStore.setState(
        () => ({
          appState: AppState.MemoryTestDone,
        }),
        undefined,
        {
          type: "appState",
          from: AppState.MemoryTestStart,
          to: AppState.MemoryTestDone,
        }
      );
    }
  }, [testedMemory]);

  const formattedTestedMemory = testedMemory.toString().padStart(5, " ");

  // prettier-ignore
  return (
    <>
      <p>(55XWUQ0E) Intel i430VX PCIset(TM)</p>
      <br />

      <p>PENTIUM-S CPU at 75MHz</p>
      <DelayRender until={appState >= AppState.MemoryTestShow}>
        <p>
          <InlinePre>Memory Test :  {formattedTestedMemory}K OK</InlinePre>
        </p>
      </DelayRender>
    </>
  );
}

export default HardwareInfo;
