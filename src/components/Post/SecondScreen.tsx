import styled from "@emotion/styled";

import Footer from "./SecondScreen/Footer";
import DeviceTable from "./SecondScreen/DeviceTable";
import HardwareTable from "./SecondScreen/HardwareTable";
import Header from "./SecondScreen/Header";
import useKeyPressOnContainer from "../../hooks/useKeyPressOnContainer";
import { useStore } from "../../store";
import { PostState } from "../../store/types";
import { HiddenInput } from "../../utils/styles";

const Container = styled.div`
  height: calc(100vh - 20px);

  :focus-visible {
    outline: none;
  }
`;

function SecondScreen() {
  const { containerRef, hiddenInputRef, handleKeyUp } = useKeyPressOnContainer(
    ["Delete", "Escape", "Enter", " "],
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
    <Container
      onKeyUp={handleKeyUp}
      tabIndex={0}
      ref={containerRef}
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <Header />
      <br />

      <HardwareTable />
      <br />

      <DeviceTable />
      <br />

      <Footer />

      <HiddenInput type="text" ref={hiddenInputRef} />
    </Container>
  );
}

export default SecondScreen;
