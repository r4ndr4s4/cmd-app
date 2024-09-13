import styled from "@emotion/styled";

const Container = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

function Command({
  children,
  cb,
}: {
  children: string;
  cb: (command: string) => void;
}) {
  return <Container onClick={() => cb(children)}>{children}</Container>;
}

export default Command;
