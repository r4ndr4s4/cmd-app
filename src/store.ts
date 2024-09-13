import { ReactNode } from "react";
import { create } from "zustand";

import { formatCommand } from "./utils";
import getCommands from "./assets/commands";

interface State {
  input: string;
  history: (string | ReactNode)[];
}

export const useStore = create<State>(() => ({
  input: "",
  history: [], // Array(31).fill("test")
}));

export const callCommand = (command: string) => {
  if (!command) {
    return;
  }

  useStore.setState((state) => ({
    history: [...state.history, formatCommand(command)],
  }));
  runCommand(command);
};

export const runCommand = (commandToRun: string) => {
  try {
    const commands = getCommands();
    const command = commands.find(({ command }) => commandToRun === command);

    if (!command) {
      throw new Error("Command not found!");
    }

    useStore.setState((state) => ({
      history: [...state.history, command.result],
    }));
  } catch (e: unknown) {
    useStore.setState((state) => ({
      history: [...state.history, (e as Error).message],
    }));
  }
};
