import styled from "@emotion/styled";

import Footer from "./SecondScreen/Footer";
import DeviceTable from "./SecondScreen/DeviceTable";
import HardwareTable from "./SecondScreen/HardwareTable";
import Header from "./SecondScreen/Header";
import useKeyPressOnContainer from "../../hooks/useKeyPressOnContainer";
import { useStore } from "../../store";
import { PostState } from "../../store/types";

const Container = styled.div`
  :focus-visible {
    outline: none;
  }
`;

function SecondScreen() {
  const { containerRef, handleKeyUp } = useKeyPressOnContainer(
    ["Enter", " "],
    () =>
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
      )
  );

  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <Header />
      <br />

      <HardwareTable />
      <br />

      <DeviceTable />
      <br />

      <Footer />
    </Container>
  );
}

export default SecondScreen;
