import { KeyboardEvent, useRef, useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useDebouncedCallback } from "use-debounce";
import { nanoid } from "nanoid";

import { useStore } from "../store";
import { allowedInputKeys, formatCommand } from "../utils/utils";
import Input from "./Cmd/Input";
import History from "./Cmd/History";
import Greeting from "./Cmd/Greeting";
import { ActionTypes } from "../store/types";
import { runCommand } from "../store/actions";
import useDetectTouchScreenDevice from "../hooks/useDetectTouchScreenDevice";
import { HiddenInput } from "../utils/styles";

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
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const history = useStore((state) => state.history);

  const isTouchScreenDevice = useDetectTouchScreenDevice();

  useEffect(() => {
    if (!isTouchScreenDevice) {
      // keeping container in focus on desktop after every event
      containerRef.current?.focus();
    }
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
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!allowedInputKeys.includes(e.key)) {
        return;
      }

      switch (e.key) {
        case "Backspace": {
          const currentInput = input.slice(0, input.length - 1);

          setInput(currentInput);
          debouncedInputStateChange(ActionTypes.SetInputBackspace);

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
            { type: ActionTypes.SetInputEnter, input: "" }
          );

          useStore.setState(
            (state) => ({
              history: [
                ...state.history,
                {
                  key: nanoid(),
                  command: formatCommand(command),
                },
              ],
            }),
            undefined,
            { type: ActionTypes.SetHistoryEnter, command }
          );
          runCommand(command);

          if (isTouchScreenDevice) {
            // closing keyboard on mobile after enter
            containerRef.current?.focus();
          }

          break;
        }
        default: {
          const currentInput = `${input}${e.key}`;

          setInput(currentInput);
          debouncedInputStateChange(ActionTypes.SetInputType);

          break;
        }
      }
    },
    [debouncedInputStateChange, input, isTouchScreenDevice]
  );

  return (
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <Greeting />
      <br />

      <History commands={history} />

      <Input
        inputRef={inputRef}
        input={input}
        onClick={() => {
          // opening keyboard on mobile when clicking visible input(-like component)
          hiddenInputRef.current?.focus();
        }}
      />
      <HiddenInput type="text" ref={hiddenInputRef} />
    </Container>
  );
}

export default Cmd;
