import styled from "@emotion/styled";
import { RefObject } from "react";

import { formatCommand } from "../../utils/utils";

const Caret = styled.span`
  animation: blink 1s step-end infinite;
  border-bottom: 2px solid white;

  @keyframes blink {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #fff;
    }
  }
`;

function Input({
  inputRef,
  input,
}: {
  inputRef: RefObject<HTMLDivElement>;
  input: string;
}) {
  return (
    <div ref={inputRef}>
      {formatCommand(input)}

      <Caret>&nbsp;</Caret>
    </div>
  );
}

export default Input;
