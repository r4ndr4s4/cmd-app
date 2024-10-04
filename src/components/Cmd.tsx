import { KeyboardEvent, useRef, useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useDebouncedCallback } from "use-debounce";

import { useStore } from "../store";
import { allowedInputKeys, formatCommand } from "../utils/utils";
import Input from "./Cmd/Input";
import History from "./Cmd/History";
import Greeting from "./Cmd/Greeting";
import {
  SETHISTORY_ENTER,
  SETINPUT_BACKSPACE,
  SETINPUT_ENTER,
  SETINPUT_TYPE,
} from "../store/types";
import { runCommand } from "../store/actions";

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;

  :focus-visible {
    outline: none;
  }
`;

function Cmd() {
  const [input, setInput] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const history = useStore((state) => state.history);

  useEffect(() => {
    containerRef.current?.focus();
  });

  useEffect(() => {
    inputRef.current?.scrollIntoView();
  });

  const debouncedInputStateChange = useDebouncedCallback(
    (type: string) =>
      useStore.setState(
        () => ({
          input,
        }),
        undefined,
        { type, input }
      ),
    1000
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLImageElement>) => {
      // TODO handle mobile devices, capslock/shift

      if (!allowedInputKeys.includes(e.key)) {
        return;
      }

      switch (e.key) {
        case "Backspace": {
          const currentInput = input.slice(0, input.length - 1);

          setInput(currentInput);
          debouncedInputStateChange(SETINPUT_BACKSPACE);

          break;
        }
        case "Enter": {
          const command = input.trim();

          if (!command) {
            return;
          }

          debouncedInputStateChange.flush();

          setInput("");
          useStore.setState(
            () => ({
              input: "",
            }),
            undefined,
            { type: SETINPUT_ENTER, input: "" }
          );

          useStore.setState(
            (state) => ({
              history: [
                ...state.history,
                {
                  key: crypto.randomUUID(),
                  command: formatCommand(command),
                },
              ],
            }),
            undefined,
            { type: SETHISTORY_ENTER, command }
          );
          runCommand(command);

          break;
        }
        default: {
          const currentInput = `${input}${e.key}`;

          setInput(currentInput);
          debouncedInputStateChange(SETINPUT_TYPE);

          break;
        }
      }
    },
    [debouncedInputStateChange, input]
  );

  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <Greeting />
      <br />

      <History commands={history} />

      <Input _ref={inputRef} input={input} />
    </Container>
  );
}

export default Cmd;
