import styled from "@emotion/styled";

import { useStore } from "./store";
import Post from "./components/Post";
import Cmd from "./components/Cmd";
import { AppState } from "./store/types";
import DelayRender from "./components/common/DelayRender";
import Start from "./components/Start";

const Container = styled.div`
  width: 818px;
  margin: 0 auto;
`;

function App() {
  const appState = useStore((state) => state.appState);

  return (
    <>
      <DelayRender
        until={
          appState >= AppState.StartScreenInit &&
          appState <= AppState.StartScreenDone
        }
      >
        <Start />
      </DelayRender>

      <Container>
        <DelayRender
          until={
            appState >= AppState.PostFirstScreenInit &&
            appState <= AppState.PostSecondScreenInit
          }
        >
          <Post />
        </DelayRender>

        <DelayRender until={appState >= AppState.CmdInit}>
          <Cmd />
        </DelayRender>
      </Container>
    </>
  );
}

export default App;
