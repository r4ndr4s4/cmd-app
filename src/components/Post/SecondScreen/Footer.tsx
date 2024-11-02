import { ColoredSpan, LIGHT_TEXT_COLOR } from "../../../utils/styles";

function Footer() {
  return (
    <>
      <p>Verifying DMI Pool Data .......</p>
      <p>Starting MS-DOS...</p>
      <br />

      <p>
        Press <ColoredSpan color={LIGHT_TEXT_COLOR}>ENTER</ColoredSpan> to
        continue
      </p>
    </>
  );
}

export default Footer;
