import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { useStore } from "../../../store";
import DelayRender from "../../common/DelayRender";
import useDelayedAppStateChange from "../../../hooks/useDelayedAppStateChange";
import { AppState } from "../../../store/types";
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

const Container = styled.div`
  margin-left: 20px;
`;

function DeviceDetection() {
  const [deviceDetectionState, setDeviceDetectionState] = useState(0);
  const intervalRef = useRef<number>(0);

  const appState = useStore((state) => state.appState);

  useDelayedAppStateChange({
    from: AppState.MemoryTestDone,
    to: AppState.DeviceDetectionShow,
    ms: 1000,
  });

  useEffect(() => {
    if (appState < AppState.DeviceDetectionShow || intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setDeviceDetectionState(
        (deviceDetectionState) => deviceDetectionState + 1
      );
    }, 1000);
  }, [appState]);

  useEffect(() => {
    // first and last tick is an extra sec delay
    if (deviceDetectionState === 6) {
      clearInterval(intervalRef.current);

      useStore.setState(
        () => ({
          appState: AppState.PostSecondScreenInit,
        }),
        undefined,
        {
          type: "appState",
          from: AppState.DeviceDetectionShow,
          to: AppState.PostSecondScreenInit,
        }
      );
    }
  }, [deviceDetectionState]);

  return (
    <>
      <DelayRender until={appState >= AppState.DeviceDetectionShow}>
        <p>Award Plug and Play BIOS Extension v1.0A</p>
        <p>Copyright (C) 1997, Award Software, Inc.</p>

        <DelayRender ms={1000}>
          <Container>
            {deviceDetectionState >= 1 && (
              <p>
                Detecting IDE Primary Master...{" "}
                {deviceDetectionState >= 2 ? (
                  PRIMARY_MASTER_DEVICE
                ) : (
                  <NoDevice />
                )}
              </p>
            )}
            {deviceDetectionState >= 2 && (
              <p>
                Detecting IDE Primary Slave...{" "}
                {deviceDetectionState >= 3 ? (
                  PRIMARY_SLAVE_DEVICE
                ) : (
                  <NoDevice />
                )}
              </p>
            )}
            {deviceDetectionState >= 3 && (
              <p>
                Detecting IDE Secondary Master...{" "}
                {deviceDetectionState >= 4 ? (
                  SECONDARY_MASTER_DEVICE
                ) : (
                  <NoDevice />
                )}
              </p>
            )}
            {deviceDetectionState >= 4 && (
              <p>
                Detecting IDE Secondary Slave...{" "}
                {deviceDetectionState >= 5 ? (
                  SECONDARY_SLAVE_DEVICE
                ) : (
                  <NoDevice />
                )}
              </p>
            )}
          </Container>
        </DelayRender>
      </DelayRender>
    </>
  );
}

export default DeviceDetection;
