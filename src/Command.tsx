import styled from "@emotion/styled";

function Command({
  children,
  cb,
}: {
  children: string;
  cb: (command: string) => void;
}) {
  const Container = styled.span`
    font-weight: bold;
    cursor: pointer;
  `;

  return <Container onClick={() => cb(children)}>{children}</Container>;
}

export default Command;
