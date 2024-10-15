import styled from "@emotion/styled";

import awardBiosLogo from "../../../assets/award_bios_logo.webp";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

function Header() {
  return (
    <Container>
      <img src={awardBiosLogo} height="45" />

      <div>
        <p>Award Modular BIOS v4.51PG, An Energy Star Ally</p>
        <p>Copyright (C) 1984-97, Award Software, Inc.</p>
      </div>
    </Container>
  );
}

export default Header;
