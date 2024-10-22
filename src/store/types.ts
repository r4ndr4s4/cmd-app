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

export enum ActionTypes {
  SetInputBackspace = "setInput/backspace",
  SetInputEnter = "setInput/enter",
  SetInputType = "setInput/type",

  SetHistoryEnter = "setHistory/enter",
  SetHistoryCallCommand = "setHistory/callCommand",
  SetHistoryRunCommand = "setHistory/runCommand",
}

// TODO use string members to show up in redux devtools correctly
// TODO rename to AppState
export enum PostState {
  // start screen (Start component)
  StartScreenInit = 0,
  StartScreenDone,

  // first screen (Post component)
  PostFirstScreenInit,
  MemoryTestShow,
  MemoryTestStart,
  MemoryTestDone,
  DeviceDetectionShow,

  // second screen (Post component)
  PostSecondScreenInit,

  // app (Cmd component)
  AppInit,
}
