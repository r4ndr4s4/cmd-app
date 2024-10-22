import styled from "@emotion/styled";
import ImageMapper from "react-img-mapper";
import { useEffect, useState } from "react";

import siemensNixdorfSetup from "../assets/siemens_nixdorf_setup.webp";
import { useStore } from "../store";
import { PostState } from "../store/types";

const IMG_WIDTH = 1577;
const TOOLTIP_POS_X = 820;
const TOOLTIP_POS_Y = 445;
const MININUM_WINDOW_WIDTH = 1366;

const getLeft = (windowWidth: number) =>
  TOOLTIP_POS_X * (windowWidth / IMG_WIDTH);

const getTop = (windowWidth: number) =>
  TOOLTIP_POS_Y * (Math.min(windowWidth, IMG_WIDTH) / IMG_WIDTH);

const SetupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
`;

// TODO separate to component
const Tooltip = styled.div<{ windowWidth: number }>`
  // position: relative;
  // display: inline-block;
  position: absolute;
  top: ${(props) => getTop(props.windowWidth)}px; // TODO fix growing distance
  left: ${(props) => getLeft(props.windowWidth)}px; // TODO fix growing distance

  span {
    visibility: visible;
    width: 120px;
    background-color: white;
    color: black;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    position: absolute;
    z-index: 1;
    top: -5px;
    left: 105%;
  }

  span::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
`;

function Init() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageMapLoaded, setImageMapLoaded] = useState(false);

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
    return <SetupContainer>ERROR</SetupContainer>;
  }

  return (
    <SetupContainer>
      <ImageMapper
        src={siemensNixdorfSetup}
        map={{
          name: "onButton",
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
          useStore.setState(
            () => ({
              postState: PostState.PostFirstScreenInit,
            }),
            undefined,
            {
              type: "postState",
              from: PostState.InitScreen,
              to: PostState.PostFirstScreenInit,
            }
          );
        }}
        active={false}
        responsive
      />

      {imageMapLoaded ? (
        <Tooltip windowWidth={windowWidth}>
          <span>Tooltip text</span>
        </Tooltip>
      ) : (
        "LOADING"
      )}
    </SetupContainer>
  );
}

export default Init;