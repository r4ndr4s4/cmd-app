import styled from "@emotion/styled";

import { useStore } from "./store";
import Post from "./components/Post";
import Cmd from "./components/Cmd";
import { AppState } from "./store/types";
import Delay from "./components/common/DelayedRender";
import Start from "./components/Start";

const Container = styled.div`
  width: 818px;
  margin: 0 auto;
`;

function App() {
  const appState = useStore((state) => state.appState);

  return (
    <>
      <Delay until={appState <= AppState.StartScreenDone}>
        <Start />
      </Delay>

      <Container>
        <Delay
          until={
            appState >= AppState.PostFirstScreenInit &&
            appState <= AppState.PostSecondScreenInit
          }
        >
          <Post />
        </Delay>

        <Delay until={appState >= AppState.AppInit}>
          <Cmd />
        </Delay>
      </Container>
    </>
  );
}

export default App;
