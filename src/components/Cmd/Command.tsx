import styled from "@emotion/styled";

import { callCommand } from "../../store/actions";
import { LIGHT_TEXT_COLOR } from "../../utils/styles";

const Container = styled.span`
  cursor: pointer;
  color: ${LIGHT_TEXT_COLOR};
`;

function Command({ children }: { children: string }) {
  return (
    <Container onClick={() => callCommand(children)}>{children}</Container>
  );
}

export default Command;
