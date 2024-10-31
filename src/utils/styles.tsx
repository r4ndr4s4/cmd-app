import styled from "@emotion/styled";

export const InlinePre = styled.span`
  white-space: pre;
`;

export const HiddenInput = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
`;

export const ColoredSpan = styled.span`
  color: ${(props) => props.color};
`;

export const ContentContainer = styled.div`
  p:first-of-type {
    margin-top: 0;
  }

  p:last-of-type {
    margin-bottom: 0;
  }
`;

export const MAIN_BG_COLOR = "var(--main-bg-color)";
export const LIGHT_BG_COLOR = "var(--light-bg-color)";
export const MAIN_TEXT_COLOR = "var(--main-text-color)";
export const LIGHT_TEXT_COLOR = "var(--light-text-color)";
