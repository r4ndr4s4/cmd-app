import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

function Header() {
  return (
    <Container>
      <img src="https://placehold.co/36x36" width="36" height="36" />

      <div>
        <p>Award Modular BIOS v4.51PG, An Energy Star Ally</p>
        <p>Copyright (C) 1984-97, Award Software, Inc.</p>
      </div>
    </Container>
  );
}

export default Header;
