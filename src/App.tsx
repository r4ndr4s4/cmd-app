import styled from "@emotion/styled";
import { useState, KeyboardEvent, useRef, useEffect, ReactNode } from "react";

import { allowedInputKeys } from "./utils";
import Command from "./Command";
import getCommands from "./assets/commands";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  p {
    margin: 0;
  }

  @keyframes blink {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #fff;
    }
  }
`;

const Caret = styled.span`
  animation: blink 1s step-end infinite;
  border-bottom: 2px solid white;
`;

const Input = styled.div`
  padding-bottom: 10px;
`;

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<(string | ReactNode)[]>([]); // Array(65).fill("test")

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  });

  useEffect(() => {
    inputRef.current?.scrollIntoView();
  });

  const formatCommand = (command: string) => `> ${command}`;

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
      case "Enter":
        if (!input) {
          return;
        }

        setHistory((prevHistory) => [...prevHistory, formatCommand(input)]);
        setInput("");

        runCommand(input);

        break;
      default: {
        const currentCommand = `${input}${e.key}`; // TODO input

        setInput(currentCommand);

        break;
      }
    }
  };

  // TODO destructure
  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <p>Hello World!</p>
      <p>
        Welcome to my personal <del>site</del> app. Type{" "}
        <Command cb={callCommand}>commands</Command> and press Enter (or click
        on the command) to see what can you do around here.
      </p>
      <br />

      <div>
        {
          // TODO key
          history.map((command, i) => (
            <>
              <p key={i}>{command}</p>
              <br />
            </>
          ))
        }
      </div>

      <Input ref={inputRef}>
        {formatCommand(input)}
        <Caret>&nbsp;</Caret>
      </Input>
    </Container>
  );
}

export default App;
