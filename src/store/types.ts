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
export enum PostState {
  // init screen (Init component)
  InitScreen = 0,

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
