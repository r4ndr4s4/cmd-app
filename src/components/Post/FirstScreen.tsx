import styled from "@emotion/styled";

import Header from "./FirstScreen/Header";
import HardwareInfo from "./FirstScreen/HardwareInfo";
import DeviceDetection from "./FirstScreen/DeviceDetection";
import Footer from "./FirstScreen/Footer";
import energyStarLogo from "../../assets/energy_star_logo.webp";
import { useStore } from "../../store";
import useKeyPressOnContainer from "../../hooks/useKeyPressOnContainer";
import { PostState } from "../../store/types";

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
  const postState = useStore((state) => state.postState);

  const { containerRef, handleKeyUp } = useKeyPressOnContainer(
    ["Delete", "Escape"],
    () =>
      useStore.setState(
        () => ({
          postState: PostState.AppInit,
        }),
        undefined,
        {
          type: "postState",
          from: postState,
          to: PostState.AppInit,
        }
      )
  );

  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
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

      <Footer />
    </Container>
  );
}

export default FirstScreen;
