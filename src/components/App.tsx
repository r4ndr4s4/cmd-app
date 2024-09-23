import { KeyboardEvent, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import { useStore } from "../store";
import { allowedInputKeys, formatCommand } from "../utils/utils";
import Input from "./App/Input";
import History from "./App/History";
import Greeting from "./App/Greeting";
import Post from "./Post";
import {
  PostState,
  SETHISTORY_ENTER,
  SETINPUT_BACKSPACE,
  SETINPUT_ENTER,
  SETINPUT_TYPE,
} from "../store/types";
import { runCommand } from "../store/actions";
import Delay from "./common/DelayedRender";
import useDelayedPostStateChange from "../hooks/useDelayedPostStateChange";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

function App() {
  const { input, history } = useStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const postState = useStore((state) => state.postState);

  // TODO make this change "event driven"
  useDelayedPostStateChange({
    from: PostState.PostSecondScreenInit,
    to: PostState.AppInit,
    ms: 2000,
  });

  useEffect(() => {
    containerRef.current?.focus();
  });

  useEffect(() => {
    inputRef.current?.scrollIntoView();
  });

  const handleKeyUp = (e: KeyboardEvent<HTMLImageElement>) => {
    // TODO handle mobile devices, capslock/shift

    if (!allowedInputKeys.includes(e.key)) {
      return;
    }

    switch (e.key) {
      case "Backspace": {
        const currentInput = input.slice(0, input.length - 1);

        useStore.setState(
          () => ({
            input: currentInput,
          }),
          undefined,
          { type: SETINPUT_BACKSPACE, input: currentInput }
        );

        break;
      }
      case "Enter": {
        const command = input.trim();

        if (!command) {
          return;
        }

        useStore.setState(
          (state) => ({
            history: [...state.history, formatCommand(command)],
          }),
          undefined,
          { type: SETHISTORY_ENTER, command }
        );
        runCommand(command);

        useStore.setState(
          () => ({
            input: "",
          }),
          undefined,
          { type: SETINPUT_ENTER, input: "" }
        );

        break;
      }
      default: {
        const currentInput = `${input}${e.key}`; // TODO debounce input

        useStore.setState(
          () => ({
            input: currentInput,
          }),
          undefined,
          { type: SETINPUT_TYPE, input: currentInput }
        );

        break;
      }
    }
  };

  return (
    <>
      <Delay until={postState >= PostState.AppInit}>
        <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
          <Greeting />
          <br />

          <History commands={history} />

          <Input _ref={inputRef} input={input} />
        </Container>
      </Delay>

      <Delay until={postState <= PostState.PostSecondScreenInit}>
        <Post />
      </Delay>
    </>
  );
}

export default App;
