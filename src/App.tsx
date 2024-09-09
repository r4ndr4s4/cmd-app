import styled from "@emotion/styled";
import { useState, KeyboardEvent, useRef, useEffect } from "react";

import { allowedInputKeys } from "./utils";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  p {
    margin: 0;
  }

  span {
    animation: blink 1s step-end infinite;
    border-bottom: 2px solid white;
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

const Input = styled.div`
  padding-bottom: 10px;
`;

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]); // Array(65).fill("test")

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
        setInput(input.slice(0, input.length - 1));

        break;
      case "Enter":
        setHistory([...history, input]);
        setInput("");

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

      <div>
        {
          // TODO key
          history.map((command, i) => (
            <p key={i}>{command}</p>
          ))
        }
      </div>

      <Input ref={inputRef}>
        {input}
        <span>&nbsp;</span>
      </Input>
    </Container>
  );
}

export default App;
