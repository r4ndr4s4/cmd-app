import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AppState, State } from "./types";

const initialState: State = {
  input: "",
  history: [], // Array(31).fill("test")

  appState: AppState.StartScreenInit,
};

export const useStore = create<State>()(devtools(() => initialState));
