import styled from "@emotion/styled";
import ImageMapper from "react-img-mapper";
import { useEffect, useState } from "react";

import siemensNixdorfPc from "../assets/siemens_nixdorf_pc.webp";
import { useStore } from "../store";
import { PostState } from "../store/types";
import useDelayedPostStateChange from "../hooks/useDelayedPostStateChange";

// TODO move out
const IMG_WIDTH = 1577;
const TOOLTIP_POS_X = 820;
const TOOLTIP_POS_Y = 445;
const MININUM_WINDOW_WIDTH = 1366;

const getLeft = (windowWidth: number) =>
  TOOLTIP_POS_X * (windowWidth / IMG_WIDTH);

const getTop = (windowWidth: number) =>
  TOOLTIP_POS_Y * (Math.min(windowWidth, IMG_WIDTH) / IMG_WIDTH);

const Container = styled.div<{ startFadeOut: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  font-family: monospace;
  animation: ${(props) =>
    props.startFadeOut ? "fade-out 0.25s ease-out both" : ""}; // TODO

  area {
    cursor: pointer;
  }
`;

// TODO separate to component
const Tooltip = styled.div<{ windowWidth: number }>`
  position: absolute;
  top: ${(props) => getTop(props.windowWidth)}px; // TODO fix growing distance
  left: ${(props) => getLeft(props.windowWidth)}px; // TODO fix growing distance

  span {
    visibility: visible;
    width: 105px;
    background-color: beige; // TODO
    color: black; // TODO
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    font-family: monospace;
    font-size: 16px;
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 105%;
    animation: vibrate 0.3s linear infinite 3s both;
  }

  span::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent beige transparent transparent;
  }
`;

function Start() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageMapLoaded, setImageMapLoaded] = useState(false);

  const postState = useStore((state) => state.postState);

  useDelayedPostStateChange({
    from: PostState.StartScreenDone,
    to: PostState.PostFirstScreenInit,
    ms: 1000,
  });

  // TODO separate to hook
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // callback
      if (window.innerWidth < MININUM_WINDOW_WIDTH) {
        setImageMapLoaded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth < MININUM_WINDOW_WIDTH) {
    return (
      <Container startFadeOut={false}>
        Your screen resolution is too low!
      </Container>
    ); // TODO
  }

  // TODO fade in
  return (
    <Container startFadeOut={postState === PostState.StartScreenDone}>
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

      {imageMapLoaded ? (
        <Tooltip windowWidth={windowWidth}>
          <span>
            Click to
            <br />
            turn on
          </span>
        </Tooltip>
      ) : (
        "Loading..." // TODO
      )}
    </Container>
  );
}

export default Start;
