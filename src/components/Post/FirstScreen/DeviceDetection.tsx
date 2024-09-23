import { useStore } from "../../../store";
import Delay from "../../common/DelayedRender";
import useDelayedPostStateChange from "../../../hooks/useDelayedPostStateChange";
import { PostState } from "../../../store/types";

const NO_DEVICE = "[Press F4 to skip]";
const PRIMARY_MASTER_DEVICE = "PCemHD";
const PRIMARY_SLAVE_DEVICE = "PCemCD";
const SECONDARY_MASTER_DEVICE = "None";
const SECONDARY_SLAVE_DEVICE = "None";

function DeviceDetection() {
  const postState = useStore((state) => state.postState);

  useDelayedPostStateChange({
    from: PostState.MemoryTestDone,
    to: PostState.DeviceDetectionShow,
    ms: 1000,
  });

  return (
    <>
      <Delay until={postState >= PostState.DeviceDetectionShow}>
        <p>Award Plug and Play BIOS Extension v1.0A</p>
        <p>Copyright (C) 1997, Award Software, Inc.</p>

        <Delay ms={1000}>
          <p>
            Detecting IDE Primary Master...{" "}
            <Delay ms={1000} untilRender={NO_DEVICE}>
              {PRIMARY_MASTER_DEVICE}
            </Delay>
          </p>
          <p>
            Detecting IDE Primary Slave...{" "}
            <Delay ms={2000} untilRender={NO_DEVICE}>
              {PRIMARY_SLAVE_DEVICE}
            </Delay>
          </p>
          <p>
            Detecting IDE Secondary Master...{" "}
            <Delay ms={3000} untilRender={NO_DEVICE}>
              {SECONDARY_MASTER_DEVICE}
            </Delay>
          </p>
          <p>
            Detecting IDE Secondary Slave...{" "}
            <Delay ms={4000} untilRender={NO_DEVICE}>
              {SECONDARY_SLAVE_DEVICE}
            </Delay>
          </p>
        </Delay>
      </Delay>
    </>
  );
}

export default DeviceDetection;
