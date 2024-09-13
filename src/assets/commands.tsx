import styled from "@emotion/styled";

import Command from "../Command";

// eslint-disable-next-line react-refresh/only-export-components
const Pre = styled.div`
  white-space: pre;
`;

const getCommands = (cb: (command: string) => void) => {
  // prettier-ignore
  return [
    {
      command: "commands",
      result: (
        <>
          <p>Possible commands:</p>
          <Pre>
            <p><Command cb={cb}>commands</Command>: Show this list of possible commands</p>
            <p><Command cb={cb}>intro</Command>:    Show a short introduction about me</p>
            <p><Command cb={cb}>stack</Command>:    Show what I am using for development currently</p>
            <p><Command cb={cb}>projects</Command>: Show the list of my hobby projects</p>
            <p><Command cb={cb}>learning</Command>: Show what I am learning currently</p>
            <p><Command cb={cb}>cv</Command>:       Request my current CV</p>
            <p><Command cb={cb}>contact</Command>:  Show my e-mail address</p>
            <p><Command cb={cb}>message</Command>:  Send me a message here anonymously</p>
            <p><Command cb={cb}>source</Command>:   Show the link to the source code of this <del>site</del> app</p>
          </Pre>
        </>
      ),
    },
    {
      command: "intro",
      result: (
        <>
          <p>Hello, I'm András 👋</p>
          <p>I'm a full-stack developer focusing on the frontend.</p>
          <p>
            I started learning programming in elementary school, studied
            computer science in secondary school, and eventually earned my BSc
            in computer engineering. However, nothing I learned in school has
            been as exciting as what I taught myself: web development.
          </p>
          <p>
            My new personal site (this <del>site</del> app) is currently under development, and I'm also
            working on gathering the projects I can and want to publish, along
            with their code on GitHub.
          </p>
        </>
      ),
    },
    {
      command: "stack",
      result: (
        <p>
          Current stack(s): TypeScript, React, Node.js, Next.js, Express.js,
          Vue.js, Redux, Ant Design, Emotion, Tailwind
        </p>
      ),
    },
    {
      command: "projects",
      result: (
        <>
          <p>
            Current project(s): Music streaming aggregator site with WebGL
            visualizations, my new personal site (this <del>site</del> app)
          </p>
          <p>
            Older project(s): Language-learning SPA to expand vocabulary by
            watching series (Vue.js), Chinese Android smartphone price
            comparison website (KeystoneJS, AngularJS), Note and task list SPA
            with sync between your devices (Express.js, MongoDB, AngularJS),
            Real-time Draw Something clone SPA (Meteor.js)
          </p>
        </>
      ),
    },
    {
      command: "learning",
      result: (
        <>
          <p>Currently learning: Latest React and Next.js things, Tailwind</p>
          <p>Currently reading: Don't Make Me Think (Steve Krug)</p>
        </>
      ),
    },
    {
      command: "contact",
      result: (
        <p>
          You can reach me at{" "}
          <a href="mailto:r4ndr4s4@protonmail.com">r4ndr4s4@protonmail.com</a>
        </p>
      ),
    },
    {
      command: "source",
      result: (
        <p>
          You can find the source code at{" "}
          <a href="https://github.com/r4ndr4s4/cmd-app" target="_blank">
            https://github.com/r4ndr4s4/cmd-app
          </a>
        </p>
      ),
    },
    {
      // TODO
      command: "message",
      result: <p>-</p>,
    },
    {
      // TODO
      command: "cv",
      result: <p>-</p>,
    },
  ];
};

export default getCommands;
