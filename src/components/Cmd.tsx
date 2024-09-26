import { KeyboardEvent, useRef, useEffect } from "react";
import styled from "@emotion/styled";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const input = useStore((state) => state.input);
  const history = useStore((state) => state.history);

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
    <Container onKeyUp={handleKeyUp} tabIndex={0} ref={containerRef}>
      <Greeting />
      <br />

      <History commands={history} />

      <Input _ref={inputRef} input={input} />
    </Container>
  );
}

export default Cmd;
