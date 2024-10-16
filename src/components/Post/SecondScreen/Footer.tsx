import { KeyboardEvent, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { useStore } from "../../../store";
import { PostState } from "../../../store/types";

const Container = styled.div`
  :focus-visible {
    outline: none;
  }
`;

function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  });

  const handleKeyUp = useCallback((e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      useStore.setState(
        () => ({
          postState: PostState.AppInit,
        }),
        undefined,
        {
          type: "postState",
          from: PostState.PostSecondScreenInit,
          to: PostState.AppInit,
        }
      );
    }
  }, []);

  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <p>Verifying DMI Pool Data.......</p>
      <p>Starting Windows 95...</p>
      <br />

      <p>Press ENTER to continue.</p>
    </Container>
  );
}

export default Footer;
