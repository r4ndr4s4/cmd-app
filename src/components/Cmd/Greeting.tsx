import { ColoredSpan, LIGHT_TEXT_COLOR } from "../../utils/styles";
import Command from "./Command";

function Greeting() {
  return (
    <>
      <p>Hello World!</p>
      <p>
        Welcome to my personal <del>site</del> app. Type{" "}
        <Command>commands</Command> and press{" "}
        <ColoredSpan color={LIGHT_TEXT_COLOR}>ENTER</ColoredSpan> (or click on
        the command) to see what you can do here.
      </p>
    </>
  );
}

export default Greeting;
