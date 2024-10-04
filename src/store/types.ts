import { ReactNode } from "react";

export interface HistoryCommand {
  key: string;
  command: string | ReactNode;
}

export interface State {
  input: string; // TODO remove if unused
  history: HistoryCommand[];

  postState: PostState;
}

// TODO use enum
export const SETINPUT_BACKSPACE = "setInput/backspace";
export const SETINPUT_ENTER = "setInput/enter";
export const SETINPUT_TYPE = "setInput/type";

export const SETHISTORY_ENTER = "setHistory/enter";
export const SETHISTORY_CALLCOMMAND = "setHistory/callCommand";
export const SETHISTORY_RUNCOMMAND = "setHistory/runCommand";

// TODO use string members to show up in redux devtools correctly
export enum PostState {
  // first screen
  PostFirstScreenInit = 0,
  MemoryTestShow,
  MemoryTestStart,
  MemoryTestDone,
  DeviceDetectionShow,

  // second screen
  PostSecondScreenInit,

  AppInit,
}
