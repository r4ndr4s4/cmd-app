import styled from "@emotion/styled";

import FirstScreen from "./Post/FirstScreen";
import SecondScreen from "./Post/SecondScreen";
import { AppState } from "../store/types";
import Delay from "./common/DelayedRender";
import { useStore } from "../store";

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

function Post() {
  const appState = useStore((state) => state.appState);

  return (
    <Container>
      <Delay until={appState <= AppState.DeviceDetectionShow}>
        <FirstScreen />
      </Delay>

      <Delay until={appState >= AppState.PostSecondScreenInit}>
        <SecondScreen />
      </Delay>
    </Container>
  );
}

export default Post;
