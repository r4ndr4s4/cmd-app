import styled from "@emotion/styled";

import Header from "./FirstScreen/Header";
import HardwareInfo from "./FirstScreen/HardwareInfo";
import DeviceDetection from "./FirstScreen/DeviceDetection";
import Footer from "./FirstScreen/Footer";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HardwareContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
`;

function FirstScreen() {
  return (
    <Container>
      <HardwareContainer>
        <div>
          <Header />
          <br />

          <HardwareInfo />
          <br />

          <DeviceDetection />
        </div>

        <img src="https://placehold.co/105x105" width="105" height="105" />
      </HardwareContainer>

      <Footer />
    </Container>
  );
}

export default FirstScreen;
