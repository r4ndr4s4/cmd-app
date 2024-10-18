/* eslint-disable react/no-unescaped-entities */
import styled from "@emotion/styled";

import Command from "./components/Cmd/Command";

const Table = styled.table`
  border-spacing: 0;

  th {
    text-align: left;
  }

  td {
    ::before {
      content: ": ";
    }
  }
`;

const getCommands = () => {
  return [
    {
      command: "commands",
      result: (
        <>
          <p>Possible commands:</p>

          <Table>
            <tbody>
              <tr>
                <th scope="row">
                  <Command>intro</Command>
                </th>
                <td>Show a short introduction about me</td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>stack</Command>
                </th>
                <td>Show what I am using for development currently</td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>projects</Command>
                </th>
                <td>Show the list of my hobby projects</td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>learning</Command>
                </th>
                <td>Show what I am learning currently</td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>cv</Command>
                </th>
                <td>Request my current CV</td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>contact</Command>
                </th>
                <td>Show my e-mail address</td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>message</Command>
                </th>
                <td>Send me a message here anonymously</td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>source</Command>
                </th>
                <td>
                  Show the link to the source code of this <del>site</del> app
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <Command>commands</Command>
                </th>
                <td>Show this list of possible commands</td>
              </tr>
            </tbody>
          </Table>
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
            My new personal site (this <del>site</del> app) is currently under
            development, and I'm also working on gathering the projects I can
            and want to publish, along with their code on GitHub.
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
      // TODO implement
      command: "message",
      result: <p>-</p>,
    },
    {
      // TODO implement
      command: "cv",
      result: <p>-</p>,
    },
  ];
};

export default getCommands;
