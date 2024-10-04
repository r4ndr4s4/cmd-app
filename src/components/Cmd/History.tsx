import { HistoryCommand } from "../../store/types";

function History({ commands }: { commands: HistoryCommand[] }) {
  return (
    <div>
      {commands.map(({ key, command }) => (
        <div key={key}>
          <div>{command}</div>

          <br />
        </div>
      ))}
    </div>
  );
}

export default History;
