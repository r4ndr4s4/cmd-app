import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { LIGHT_BG_COLOR, MAIN_BG_COLOR } from "../../utils/styles";

export const divCommon = css`
  background-color: ${LIGHT_BG_COLOR};
  color: ${MAIN_BG_COLOR};
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
