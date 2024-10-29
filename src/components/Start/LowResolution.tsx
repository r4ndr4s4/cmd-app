import { RefObject } from "react";
import styled from "@emotion/styled";

import { HiddenInput } from "../../utils/styles";
import { Notification } from "./styles";

const Information = styled.p`
  padding: 5px;
  text-align: justify;
`;

function LowResolution({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement>;
}) {
  return (
    <>
      <div>
        <Information>
          Please revisit later from a desktop computer for the full experience.
        </Information>

        <HiddenInput type="text" ref={inputRef} />
      </div>

      <Notification>
        Or press ENTER to skip to the mobile friendly part
      </Notification>
    </>
  );
}

export default LowResolution;
