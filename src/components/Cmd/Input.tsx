import styled from "@emotion/styled";
import { RefObject } from "react";

import { LIGHT_TEXT_COLOR, MAIN_TEXT_COLOR } from "../../utils/styles";

const Container = styled.div`
  color: ${LIGHT_TEXT_COLOR};

  ::before {
    content: "> ";
    color: ${MAIN_TEXT_COLOR};
  }
`;

const Caret = styled.span`
  animation: blink 1s step-end infinite;
  border-bottom: 2px solid ${MAIN_TEXT_COLOR};

  @keyframes blink {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: ${MAIN_TEXT_COLOR};
    }
  }
`;

function Input({
  inputRef,
  input,
  onClick,
}: {
  inputRef: RefObject<HTMLDivElement>;
  input: string;
  onClick: () => void;
}) {
  return (
    <Container ref={inputRef} onClick={onClick}>
      {input}

      <Caret>&nbsp;</Caret>
    </Container>
  );
}

export default Input;
