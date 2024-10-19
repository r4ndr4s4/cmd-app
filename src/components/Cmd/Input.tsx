import styled from "@emotion/styled";
import { RefObject } from "react";

import { formatCommand } from "../../utils/utils";
import { MAIN_TEXT_COLOR } from "../../utils/styles";

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
    <div ref={inputRef} onClick={onClick}>
      {formatCommand(input)}

      <Caret>&nbsp;</Caret>
    </div>
  );
}

export default Input;
