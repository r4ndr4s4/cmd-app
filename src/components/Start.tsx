import styled from "@emotion/styled";
import ImageMapper from "react-img-mapper";
import { useState } from "react";

import siemensNixdorfPc from "../assets/siemens_nixdorf_pc.webp";
import { useStore } from "../store";
import { PostState } from "../store/types";
import useDelayedPostStateChange from "../hooks/useDelayedPostStateChange";
import useKeyPressOnContainer from "../hooks/useKeyPressOnContainer";
import { HiddenInput } from "../utils/styles";
import useDetectTouchScreenDevice from "../hooks/useDetectTouchScreenDevice";
import LowResolution from "./Start/LowResolution";
import Tooltip from "./Start/Tooltip";
import { Notification } from "./Start/styles";
import useGetWindowWidth from "../hooks/useGetWindowWidth";

export const IMG_WIDTH = 1577;
const MININUM_WINDOW_WIDTH = 1366;

const Container = styled.div<{ startFadeOut: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  font-family: monospace;
  animation: ${(props) =>
    props.startFadeOut ? "fade-out 0.25s ease-out both" : ""}; // TODO

  area {
    cursor: pointer;
  }
`;

function Start() {
  const [imageMapLoaded, setImageMapLoaded] = useState(false);

  const postState = useStore((state) => state.postState);

  const isTouchScreenDevice = useDetectTouchScreenDevice();
  const windowWidth = useGetWindowWidth(() => {
    if (window.innerWidth < MININUM_WINDOW_WIDTH) {
      setImageMapLoaded(false);
    }
  });

  useDelayedPostStateChange({
    from: PostState.StartScreenDone,
    to: PostState.PostFirstScreenInit,
    ms: 1000,
  });

  const { containerRef, hiddenInputRef, handleKeyUp } = useKeyPressOnContainer(
    ["Delete", "Escape", "Enter", " "],
    () =>
      useStore.setState(
        () => ({
          postState: PostState.AppInit,
        }),
        undefined,
        {
          type: "postState",
          from: PostState.StartScreenInit,
          to: PostState.AppInit,
        }
      )
  );

  if (windowWidth < MININUM_WINDOW_WIDTH) {
    return (
      <Container
        startFadeOut={false}
        onKeyUp={handleKeyUp}
        tabIndex={0}
        ref={containerRef}
        onClick={() => hiddenInputRef.current?.focus()}
      >
        <LowResolution inputRef={hiddenInputRef} />
      </Container>
    );
  }

  // TODO fade in
  return (
    <Container
      startFadeOut={postState === PostState.StartScreenDone}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      ref={containerRef}
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <div>
        <ImageMapper
          src={siemensNixdorfPc}
          map={{
            name: "powerButton",
            areas: [
              {
                shape: "rect",
                coords: [729, 446, 806, 487],
              },
            ],
          }}
          parentWidth={Math.min(windowWidth, IMG_WIDTH)}
          onLoad={() => setImageMapLoaded(true)}
          onClick={() => {
            // TODO play sound, CRT effect
            setTimeout(() => {
              useStore.setState(
                () => ({
                  postState: PostState.StartScreenDone,
                }),
                undefined,
                {
                  type: "postState",
                  from: PostState.StartScreenInit,
                  to: PostState.StartScreenDone,
                }
              );
            }, 500);
          }}
          active={false}
          responsive
        />

        <HiddenInput type="text" ref={hiddenInputRef} />
      </div>

      {imageMapLoaded ? (
        <Tooltip windowWidth={windowWidth} />
      ) : (
        "Loading..." // TODO
      )}

      <Notification>
        {isTouchScreenDevice
          ? "Or touch the screen then press ENTER to skip to the app"
          : "Or press ESC to skip to the app"}
      </Notification>
    </Container>
  );
}

export default Start;
