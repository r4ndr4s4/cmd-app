import styled from "@emotion/styled";

import FirstScreen from "./Post/FirstScreen";
import SecondScreen from "./Post/SecondScreen";
import { PostState } from "../store/types";
import Delay from "./common/DelayedRender";
import { useStore } from "../store";

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

function Post() {
  const postState = useStore((state) => state.postState);

  return (
    <Container>
      <Delay until={postState <= PostState.DeviceDetectionShow}>
        <FirstScreen />
      </Delay>

      <Delay until={postState >= PostState.PostSecondScreenInit}>
        <SecondScreen />
      </Delay>
    </Container>
  );
}

export default Post;
