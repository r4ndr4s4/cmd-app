import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import siemensNixdorfPc from "../assets/siemens_nixdorf_pc.webp";
import { useStore } from "../store";
import { AppState } from "../store/types";
import useDelayedAppStateChange from "../hooks/useDelayedAppStateChange";
import useKeyPressOnContainer from "../hooks/useKeyPressOnContainer";
import { HiddenInput } from "../utils/styles";
import useDetectTouchScreenDevice from "../hooks/useDetectTouchScreenDevice";
import LowResolution from "./Start/LowResolution";
import Tooltip from "./Start/Tooltip";
import { Notification } from "./Start/styles";
import useGetWindowWidth from "../hooks/useGetWindowWidth";
import useTrackComponentRender from "../hooks/useTrackComponentRender";

export const IMG_WIDTH = 1577;
const MININUM_WINDOW_WIDTH = 1366;

const X1default = 729;
const X2default = 806;
const Y1default = 446;
const Y2default = 487;

const Container = styled.div<{ fadeOut: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  font-family: monospace;
  animation: ${(props) =>
    props.fadeOut ? "fade-out 0.25s ease-out both" : ""};

  img {
    max-width: 100%;
    height: auto;
  }

  area {
    cursor: pointer;
  }
`;

function Start() {
  const [X1, setX1] = useState(X1default);
  const [X2, setX2] = useState(X2default);
  const [Y1, setY1] = useState(Y1default);
  const [Y2, setY2] = useState(Y2default);

  const { component, trackEvent } = useTrackComponentRender("START");

  const appState = useStore((state) => state.appState);

  const isTouchScreenDevice = useDetectTouchScreenDevice();
  const windowWidth = useGetWindowWidth(() => {
    remapPowerButton();
  });

  useDelayedAppStateChange({
    from: AppState.StartScreenDone,
    to: AppState.PostFirstScreenInit,
    ms: 1000,
  });

  const { containerRef, hiddenInputRef, handleKeyUp } = useKeyPressOnContainer(
    ["Delete", "Escape", "Enter", " "],
    () => {
      trackEvent(`${component} interaction`, "PRESS_SKIP");

      useStore.setState(
        () => ({
          appState: AppState.CmdInit,
        }),
        undefined,
        {
          type: "appState",
          from: AppState.StartScreenInit,
          to: AppState.CmdInit,
        }
      );
    }
  );

  useEffect(() => {
    remapPowerButton();
  }, [windowWidth]);

  const remapPowerButton = () => {
    const ratioNumber = Math.min(window.innerWidth, IMG_WIDTH) / IMG_WIDTH;

    setX1(X1default * ratioNumber);
    setX2(X2default * ratioNumber);
    setY1(Y1default * ratioNumber);
    setY2(Y2default * ratioNumber);
  };

  if (windowWidth < MININUM_WINDOW_WIDTH) {
    return (
      <Container
        fadeOut={false}
        onKeyUp={handleKeyUp}
        tabIndex={0}
        ref={containerRef}
        onClick={() => hiddenInputRef.current?.focus()}
      >
        <LowResolution inputRef={hiddenInputRef} />
      </Container>
    );
  }

  return (
    <Container
      fadeOut={appState === AppState.StartScreenDone}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      ref={containerRef}
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <div>
        <img src={siemensNixdorfPc} useMap="#workmap" />

        <map id="workmap" name="workmap">
          <area
            shape="rect"
            coords={`${X1.toString()}, ${Y1.toString()}, ${X2.toString()}, ${Y2.toString()}`}
            onClick={() => {
              trackEvent(`${component} interaction`, "PRESS_START");

              setTimeout(() => {
                useStore.setState(
                  () => ({
                    appState: AppState.StartScreenDone,
                  }),
                  undefined,
                  {
                    type: "appState",
                    from: AppState.StartScreenInit,
                    to: AppState.StartScreenDone,
                  }
                );
              }, 500);
            }}
          />
        </map>

        <HiddenInput type="text" ref={hiddenInputRef} />
      </div>

      <Tooltip windowWidth={windowWidth} />

      <Notification>
        {isTouchScreenDevice
          ? "Or touch the screen then press ENTER to skip to the app"
          : "Or press ESC to skip to the app"}
      </Notification>
    </Container>
  );
}

export default Start;
