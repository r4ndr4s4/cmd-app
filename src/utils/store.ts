import { ReactNode } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { formatCommand } from "./utils";
import getCommands from "../commands";

export const SETINPUT_BACKSPACE = "setInput/backspace";
export const SETINPUT_ENTER = "setInput/enter";
export const SETINPUT_TYPE = "setInput/type";

export const SETHISTORY_ENTER = "setHistory/enter";
export const SETHISTORY_CALLCOMMAND = "setHistory/callCommand";
export const SETHISTORY_RUNCOMMAND = "setHistory/runCommand";

interface State {
  input: string;
  history: (string | ReactNode)[];
}

const initialState: State = {
  input: "",
  history: [], // Array(31).fill("test")
};

export const useStore = create<State>()(devtools(() => initialState));

export const callCommand = (command: string) => {
  if (!command) {
    return;
  }

  useStore.setState(
    (state) => ({
      history: [...state.history, formatCommand(command)],
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
        history: [...state.history, command.result],
      }),
      undefined,
      { type: SETHISTORY_RUNCOMMAND, command: command.command }
    );
  } catch (e: unknown) {
    useStore.setState(
      (state) => ({
        history: [...state.history, (e as Error).message],
      }),
      undefined,
      { type: SETHISTORY_RUNCOMMAND }
    );
  }
};
