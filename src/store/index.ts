import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { PostState, State } from "./types";

const initialState: State = {
  input: "",
  history: [], // Array(31).fill("test")

  postState: PostState.InitScreen,
};

export const useStore = create<State>()(devtools(() => initialState));
