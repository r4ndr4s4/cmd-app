import { RefObject } from "react";
import styled from "@emotion/styled";

import { HiddenInput } from "../../utils/styles";
import { Notification } from "./styles";
import useDetectTouchScreenDevice from "../../hooks/useDetectTouchScreenDevice";

const Information = styled.p`
  padding: 5px;
  text-align: justify;
`;

function LowResolution({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement>;
}) {
  const isTouchScreenDevice = useDetectTouchScreenDevice();

  return (
    <>
      <div>
        <Information>
          Please revisit later from a desktop computer for the full experience.
        </Information>

        <HiddenInput type="text" ref={inputRef} />
      </div>

      <Notification>
        Or {isTouchScreenDevice ? "touch the screen then" : ""} press ENTER to
        skip to the mobile friendly part
      </Notification>
    </>
  );
}

export default LowResolution;
