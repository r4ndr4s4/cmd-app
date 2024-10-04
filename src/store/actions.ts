import getCommands from "../commands";
import { formatCommand } from "../utils/utils";
import { useStore } from ".";
import { SETHISTORY_CALLCOMMAND, SETHISTORY_RUNCOMMAND } from "./types";

export const callCommand = (command: string) => {
  if (!command) {
    return;
  }

  useStore.setState(
    (state) => ({
      history: [
        ...state.history,
        {
          key: crypto.randomUUID(),
          command: formatCommand(command),
        },
      ],
    }),
    undefined,
    { type: SETHISTORY_CALLCOMMAND, command }
  );
  runCommand(command);
};

export const runCommand = (commandToRun: string) => {
  try {
    const commands = getCommands();
    const command = commands.find(({ command }) => commandToRun === command);

    if (!command) {
      throw new Error("Command not found!");
    }

    useStore.setState(
      (state) => ({
        history: [
          ...state.history,
          {
            key: crypto.randomUUID(),
            command: command.result,
          },
        ],
      }),
      undefined,
      { type: SETHISTORY_RUNCOMMAND, command: command.command }
    );
  } catch (e: unknown) {
    useStore.setState(
      (state) => ({
        history: [
          ...state.history,
          {
            key: crypto.randomUUID(),
            command: (e as Error).message,
          },
        ],
      }),
      undefined,
      { type: SETHISTORY_RUNCOMMAND }
    );
  }
};
