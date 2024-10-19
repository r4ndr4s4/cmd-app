import styled from "@emotion/styled";

// TODO remove if unused
export const Pre = styled.div`
  white-space: pre;
`;

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

export const MAIN_BG_COLOR = "var(--main-bg-color)";
export const MAIN_TEXT_COLOR = "var(--main-text-color)";
export const LIGHTER_TEXT_COLOR = "var(--lighter-text-color)"; // TODO remove if unused
export const LIGHT_TEXT_COLOR = "var(--light-text-color)";
