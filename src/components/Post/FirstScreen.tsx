import styled from "@emotion/styled";

import Header from "./FirstScreen/Header";
import HardwareInfo from "./FirstScreen/HardwareInfo";
import DeviceDetection from "./FirstScreen/DeviceDetection";
import Footer from "./FirstScreen/Footer";
import energyStarLogo from "../../assets/energy_star_logo.webp";
import { useStore } from "../../store";
import useKeyPressOnContainer from "../../hooks/useKeyPressOnContainer";
import { AppState } from "../../store/types";
import { HiddenInput } from "../../utils/styles";
import useTrackComponentRender from "../../hooks/useTrackComponentRender";

const Container = styled.div`
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  :focus-visible {
    outline: none;
  }
`;

const HardwareContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
`;

function FirstScreen() {
  const appState = useStore((state) => state.appState);

  const { component, trackEvent } = useTrackComponentRender("FIRST_SCREEN");

  const { containerRef, hiddenInputRef, handleKeyUp } = useKeyPressOnContainer(
    ["Delete", "Escape", "Enter", " "],
    () => {
      trackEvent(`${component} interaction`, { event: "PRESS_SKIP" });

      useStore.setState(
        () => ({
          appState: AppState.CmdInit,
        }),
        undefined,
        {
          type: "appState",
          from: appState,
          to: AppState.CmdInit,
        }
      );
    }
  );

  return (
    <Container
      onKeyUp={handleKeyUp}
      tabIndex={0}
      ref={containerRef}
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <HardwareContainer>
        <div>
          <Header />
          <br />

          <HardwareInfo />
          <br />

          <DeviceDetection />
        </div>

        <img src={energyStarLogo} height="125" />
      </HardwareContainer>

      <div>
        <HiddenInput type="text" ref={hiddenInputRef} />

        <Footer />
      </div>
    </Container>
  );
}

export default FirstScreen;
