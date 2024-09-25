import styled from "@emotion/styled";

import { useStore } from "./store";
import Post from "./components/Post";
import Cmd from "./components/Cmd";
import { PostState } from "./store/types";
import Delay from "./components/common/DelayedRender";
import useDelayedPostStateChange from "./hooks/useDelayedPostStateChange";

const Container = styled.div`
  width: 818px;
  margin: 0 auto;
`;

function App() {
  const postState = useStore((state) => state.postState);

  // TODO make this change "event driven"
  useDelayedPostStateChange({
    from: PostState.PostSecondScreenInit,
    to: PostState.AppInit,
    ms: 2000,
  });

  return (
    <Container>
      <Delay until={postState >= PostState.AppInit}>
        <Cmd />
      </Delay>

      <Delay until={postState <= PostState.PostSecondScreenInit}>
        <Post />
      </Delay>
    </Container>
  );
}

export default App;
