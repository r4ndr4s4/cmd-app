import { nanoid } from "nanoid";

import getCommands from "../commands";
import { formatCommand } from "../utils/utils";
import { useStore } from ".";
import { ActionTypes } from "./types";
import { trackEvent } from "../hooks/useTrackComponentRender";

export const callCommand = (command: string) => {
  if (!command) {
    return;
  }

  useStore.setState(
    (state) => ({
      history: [
        ...state.history,
        {
          key: nanoid(),
          command: formatCommand(command),
        },
      ],
    }),
    undefined,
    { type: ActionTypes.SetHistoryCallCommand, command }
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
            key: nanoid(),
            command: command.result,
          },
        ],
      }),
      undefined,
      { type: ActionTypes.SetHistoryRunCommand, command: command.command }
    );

    trackEvent("CMD interaction", "COMMAND_RUN");
  } catch (e: unknown) {
    useStore.setState(
      (state) => ({
        history: [
          ...state.history,
          {
            key: nanoid(),
            command: (e as Error).message,
          },
        ],
      }),
      undefined,
      { type: ActionTypes.SetHistoryRunCommand }
    );
  }
};
