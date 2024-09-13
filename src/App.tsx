import styled from "@emotion/styled";
import { useState, KeyboardEvent, useRef, useEffect, ReactNode } from "react";

import { allowedInputKeys, formatCommand } from "./utils";
import getCommands from "./assets/commands";
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
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<(string | ReactNode)[]>([]); // Array(31).fill("test")

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  });

  useEffect(() => {
    inputRef.current?.scrollIntoView();
  });

  const runCommand = async (commandToRun: string) => {
    try {
      const commands = getCommands(callCommand);
      const command = commands.find(({ command }) => commandToRun === command);

      if (!command) {
        throw new Error("Command not found!");
      }

      setHistory((prevHistory) => [...prevHistory, command.result]);
    } catch (e: unknown) {
      setHistory((prevHistory) => [...prevHistory, (e as Error).message]);
    }
  };

  const callCommand = (command: string) => {
    if (!command) {
      return;
    }

    setHistory((prevHistory) => [...prevHistory, formatCommand(command)]);
    runCommand(command);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLImageElement>) => {
    // TODO mobile devices, capslock/shift

    if (!allowedInputKeys.includes(e.key)) {
      return;
    }

    switch (e.key) {
      case "Backspace":
        setInput(input.slice(0, input.length - 1));

        break;
      case "Enter": {
        const command = input.trim();

        if (!command) {
          return;
        }

        setHistory((prevHistory) => [...prevHistory, formatCommand(command)]);
        runCommand(command);

        setInput("");

        break;
      }
      default: {
        const currentCommand = `${input}${e.key}`; // TODO input

        setInput(currentCommand);

        break;
      }
    }
  };

  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <Greeting cb={callCommand} />
      <br />

      <History commands={history} />

      <Input _ref={inputRef} input={input} />
    </Container>
  );
}

export default App;
