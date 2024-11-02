import styled from "@emotion/styled";

import { divCommon } from "./styles";
import { IMG_WIDTH } from "../Start";
import { START_BG_COLOR } from "../../utils/styles";

const TOOLTIP_POS_X = 822;
const TOOLTIP_POS_Y = 444;

const getLeft = (windowWidth: number) => {
  if (windowWidth > IMG_WIDTH) {
    return TOOLTIP_POS_X + (windowWidth - IMG_WIDTH) / 2;
  }

  return TOOLTIP_POS_X * (windowWidth / IMG_WIDTH);
};

const getTop = (windowWidth: number) => {
  let offset = 0;

  if (windowWidth < IMG_WIDTH) {
    offset = Math.max((windowWidth - IMG_WIDTH) / 40, -4);
  }

  return (
    TOOLTIP_POS_Y * (Math.min(windowWidth, IMG_WIDTH) / IMG_WIDTH) + offset
  );
};

const Container = styled.div<{ windowWidth: number }>`
  position: absolute;
  top: ${(props) => getTop(props.windowWidth)}px;
  left: ${(props) => getLeft(props.windowWidth)}px;

  span {
    ${divCommon}

    visibility: visible;
    width: 105px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 105%;
    animation: vibrate 0.3s linear infinite 5s both;
  }

  span::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent ${START_BG_COLOR} transparent transparent;
  }
`;

function Tooltip({ windowWidth }: { windowWidth: number }) {
  return (
    <Container windowWidth={windowWidth}>
      <span>
        Click to
        <br />
        turn on
      </span>
    </Container>
  );
}

export default Tooltip;
