import styled from "@emotion/styled";

import FirstScreen from "./Post/FirstScreen";
import SecondScreen from "./Post/SecondScreen";
import { AppState } from "../store/types";
import DelayRender from "./common/DelayRender";
import { useStore } from "../store";
import useTrackComponentRender from "../hooks/useTrackComponentRender";

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;

  p {
    margin: 0;
  }
`;

function Post() {
  const appState = useStore((state) => state.appState);

  useTrackComponentRender("POST");

  return (
    <Container>
      <DelayRender
        until={
          appState >= AppState.PostFirstScreenInit &&
          appState < AppState.PostSecondScreenInit
        }
      >
        <FirstScreen />
      </DelayRender>

      <DelayRender until={appState >= AppState.PostSecondScreenInit}>
        <SecondScreen />
      </DelayRender>
    </Container>
  );
}

export default Post;
