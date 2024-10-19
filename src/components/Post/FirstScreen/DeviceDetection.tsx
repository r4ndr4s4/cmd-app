import { useEffect, useRef, useState } from "react";

import { useStore } from "../../../store";
import Delay from "../../common/DelayedRender";
import useDelayedPostStateChange from "../../../hooks/useDelayedPostStateChange";
import { PostState } from "../../../store/types";
import { ColoredSpan, LIGHT_TEXT_COLOR } from "../../../utils/styles";

const PRIMARY_MASTER_DEVICE = "PCemHD";
const PRIMARY_SLAVE_DEVICE = "PCemCD";
const SECONDARY_MASTER_DEVICE = "None";
const SECONDARY_SLAVE_DEVICE = "None";

function NoDevice() {
  return (
    <span>
      [Press <ColoredSpan color={LIGHT_TEXT_COLOR}>F4</ColoredSpan> to skip]
    </span>
  );
}

function DeviceDetection() {
  const [deviceDetectionState, setDeviceDetectionState] = useState(0);
  const intervalRef = useRef<number>(0);

  const postState = useStore((state) => state.postState);

  useDelayedPostStateChange({
    from: PostState.MemoryTestDone,
    to: PostState.DeviceDetectionShow,
    ms: 1000,
  });

  useEffect(() => {
    if (postState < PostState.DeviceDetectionShow || intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      // TODO make secondary device detection(s) longer
      setDeviceDetectionState(
        (deviceDetectionState) => deviceDetectionState + 1
      );
    }, 1000);
  }, [postState]);

  useEffect(() => {
    // first and last tick is an extra sec delay
    if (deviceDetectionState === 6) {
      clearInterval(intervalRef.current);

      useStore.setState(
        () => ({
          postState: PostState.PostSecondScreenInit,
        }),
        undefined,
        {
          type: "postState",
          from: PostState.DeviceDetectionShow,
          to: PostState.PostSecondScreenInit,
        }
      );
    }
  }, [deviceDetectionState]);

  return (
    <>
      <Delay until={postState >= PostState.DeviceDetectionShow}>
        <p>Award Plug and Play BIOS Extension v1.0A</p>
        <p>Copyright (C) 1997, Award Software, Inc.</p>

        <Delay ms={1000}>
          <p>
            Detecting IDE Primary Master...{" "}
            {deviceDetectionState >= 2 ? PRIMARY_MASTER_DEVICE : <NoDevice />}
          </p>
          <p>
            Detecting IDE Primary Slave...{" "}
            {deviceDetectionState >= 3 ? PRIMARY_SLAVE_DEVICE : <NoDevice />}
          </p>
          <p>
            Detecting IDE Secondary Master...{" "}
            {deviceDetectionState >= 4 ? SECONDARY_MASTER_DEVICE : <NoDevice />}
          </p>
          <p>
            Detecting IDE Secondary Slave...{" "}
            {deviceDetectionState >= 5 ? SECONDARY_SLAVE_DEVICE : <NoDevice />}
          </p>
        </Delay>
      </Delay>
    </>
  );
}

export default DeviceDetection;
