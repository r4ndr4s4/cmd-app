import Command from "./Command";

function Greeting({ cb }: { cb: (command: string) => void }) {
  return (
    <>
      <p>Hello World!</p>
      <p>
        Welcome to my personal <del>site</del> app. Type{" "}
        <Command cb={cb}>commands</Command> and press Enter (or click on the
        command) to see what you can do here.
      </p>
    </>
  );
}

export default Greeting;
