import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const divCommon = css`
  background-color: beige; // TODO
  color: black; // TODO
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
