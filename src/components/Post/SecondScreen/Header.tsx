import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
`;

function Header() {
  return (
    <Container>
      <p>Award Software, Inc.</p>
      <p>System Configurations</p>
    </Container>
  );
}

export default Header;
