import { KeyboardEvent, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import { runCommand, useStore } from "./store";
import { allowedInputKeys, formatCommand } from "./utils";
import Input from "./components/Input";
import History from "./components/History";
import Greeting from "./components/Greeting";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  p {
    margin: 0;
  }
`;

function App() {
  const { input, history } = useStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

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
      case "Backspace":
        useStore.setState(() => ({
          input: input.slice(0, input.length - 1),
        }));

        break;
      case "Enter": {
        const command = input.trim();

        if (!command) {
          return;
        }

        useStore.setState((state) => ({
          history: [...state.history, formatCommand(command)],
        }));
        runCommand(command);

        useStore.setState(() => ({
          input: "",
        }));

        break;
      }
      default: {
        const currentCommand = `${input}${e.key}`; // TODO input

        useStore.setState(() => ({
          input: currentCommand,
        }));

        break;
      }
    }
  };

  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <Greeting />
      <br />

      <History commands={history} />

      <Input _ref={inputRef} input={input} />
    </Container>
  );
}

export default App;
