import { ReactNode } from "react";

function History({ commands }: { commands: (string | ReactNode)[] }) {
  return (
    <div>
      {
        // TODO key
        commands.map((command, i) => (
          <div key={i}>
            <div>{command}</div>

            <br />
          </div>
        ))
      }
    </div>
  );
}

export default History;
