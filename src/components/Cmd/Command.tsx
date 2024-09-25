import styled from "@emotion/styled";

import { callCommand } from "../../store/actions";

const Container = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

function Command({ children }: { children: string }) {
  return (
    <Container onClick={() => callCommand(children)}>{children}</Container>
  );
}

export default Command;
