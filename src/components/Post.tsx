import FirstScreen from "./Post/FirstScreen";
import SecondScreen from "./Post/SecondScreen";
import { PostState } from "../store/types";
import Delay from "./common/DelayedRender";
import { useStore } from "../store";

function Post() {
  const postState = useStore((state) => state.postState);

  return (
    <>
      <Delay until={postState <= PostState.DeviceDetectionShow}>
        <FirstScreen />
      </Delay>

      <Delay until={postState >= PostState.PostSecondScreenInit}>
        <SecondScreen />
      </Delay>
    </>
  );
}

export default Post;
