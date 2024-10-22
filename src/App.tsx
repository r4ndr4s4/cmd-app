import styled from "@emotion/styled";

import { useStore } from "./store";
import Post from "./components/Post";
import Cmd from "./components/Cmd";
import { PostState } from "./store/types";
import Delay from "./components/common/DelayedRender";
import Start from "./components/Start";

const Container = styled.div`
  width: 818px;
  margin: 0 auto;
`;

function App() {
  const postState = useStore((state) => state.postState);

  return (
    <>
      <Delay until={postState <= PostState.StartScreenDone}>
        <Start />
      </Delay>

      <Container>
        <Delay
          until={
            postState >= PostState.PostFirstScreenInit &&
            postState <= PostState.PostSecondScreenInit
          }
        >
          <Post />
        </Delay>

        <Delay until={postState >= PostState.AppInit}>
          <Cmd />
        </Delay>
      </Container>
    </>
  );
}

export default App;
