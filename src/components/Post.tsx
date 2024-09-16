import { useEffect, useState } from "react";

import FirstScreen from "./Post/FirstScreen";
import SecondScreen from "./Post/SecondScreen";

function Post() {
  const [isFirstScreen, setFirstScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => setFirstScreen(false), 1500);
  }, []);

  return isFirstScreen ? <FirstScreen /> : <SecondScreen />;
}

export default Post;
