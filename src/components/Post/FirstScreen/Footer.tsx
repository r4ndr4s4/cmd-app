import useDetectTouchScreenDevice from "../../../hooks/useDetectTouchScreenDevice";
import { ColoredSpan, LIGHT_TEXT_COLOR } from "../../../utils/styles";

function Footer() {
  const isTouchScreenDevice = useDetectTouchScreenDevice();

  return (
    <div>
      <p>
        Press{" "}
        <ColoredSpan color={LIGHT_TEXT_COLOR}>
          {isTouchScreenDevice ? "ENTER" : "DEL"}
        </ColoredSpan>{" "}
        to skip POST
      </p>
      <p>12/10/97-i430VX,UMC8669-2A59GH2BC-00</p>
    </div>
  );
}

export default Footer;
