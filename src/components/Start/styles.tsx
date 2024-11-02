import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  START_BG_COLOR,
  START_BORDER_COLOR,
  START_TEXT_COLOR,
} from "../../utils/styles";

export const divCommon = css`
  background-color: ${START_BG_COLOR};
  border: 1px solid ${START_BORDER_COLOR};
  color: ${START_TEXT_COLOR};
  text-align: center;
  border-radius: 6px;
  font-family: monospace;
  font-size: 16px;
`;

export const Notification = styled.div`
  ${divCommon}

  padding: 5px 15px;
  max-width: 420px;
`;
