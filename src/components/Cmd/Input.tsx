import styled from "@emotion/styled";

import { formatCommand } from "../../utils/utils";

const Container = styled.div`
  padding-bottom: 10px;
`;

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

// TODO rename _ref
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Input({ _ref, input }: { _ref: any; input: string }) {
  return (
    <Container ref={_ref}>
      {formatCommand(input)}

      <Caret>&nbsp;</Caret>
    </Container>
  );
}

export default Input;
