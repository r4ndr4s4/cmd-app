import { COMMANDS } from "../../commands";
import {
  ColoredSpan,
  ContentContainer,
  LIGHT_TEXT_COLOR,
} from "../../utils/styles";

function Greeting() {
  return (
    <ContentContainer>
      <p>Hello World! ✨</p>

      <p>
        Welcome to my personal <del>site</del> app. Type in a command and press{" "}
        <ColoredSpan color={LIGHT_TEXT_COLOR}>ENTER</ColoredSpan> (or click on
        the command) to run it.
      </p>
      <br />

      {COMMANDS}
    </ContentContainer>
  );
}

export default Greeting;
