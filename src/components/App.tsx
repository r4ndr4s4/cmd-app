import { KeyboardEvent, useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";

import {
  runCommand,
  SETHISTORY_ENTER,
  SETINPUT_BACKSPACE,
  SETINPUT_ENTER,
  SETINPUT_TYPE,
  useStore,
} from "../utils/store";
import { allowedInputKeys, formatCommand } from "../utils/utils";
import Input from "./App/Input";
import History from "./App/History";
import Greeting from "./App/Greeting";
import Post from "./Post";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

function App() {
  const { input, history } = useStore();

  const [isAppRender, setAppRender] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setAppRender(true), 3000);
  }, []);

  useEffect(() => {
    containerRef.current?.focus();
  });

  useEffect(() => {
    inputRef.current?.scrollIntoView();
  });

  const handleKeyUp = (e: KeyboardEvent<HTMLImageElement>) => {
    // TODO mobile devices, capslock/shift

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
        const currentInput = `${input}${e.key}`; // TODO input

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

  return isAppRender ? (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <Greeting />
      <br />

      <History commands={history} />

      <Input _ref={inputRef} input={input} />
    </Container>
  ) : (
    <Post />
  );
}

export default App;
