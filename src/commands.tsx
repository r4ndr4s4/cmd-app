/* eslint-disable react/no-unescaped-entities */
import styled from "@emotion/styled";

import Command from "./components/Cmd/Command";
import { ContentContainer } from "./utils/styles";

const Table = styled.table`
  border-spacing: 0;

  th {
    text-align: left;
    font-weight: normal;
  }

  td {
    ::before {
      content: ": ";
    }
  }
`;

export const COMMANDS = (
  <ContentContainer>
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
            <Command>contact</Command>
          </th>
          <td>Show my e-mail address</td>
        </tr>

        <tr>
          <th scope="row">
            <Command>sources</Command>
          </th>
          <td>
            Show the sources of this <del>site</del> app
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
  </ContentContainer>
);

const getCommands = () => {
  return [
    {
      command: "commands",
      result: COMMANDS,
    },
    {
      command: "intro",
      result: (
        <ContentContainer>
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
        </ContentContainer>
      ),
    },
    {
      command: "stack",
      result: (
        <ContentContainer>
          <p>
            Current stack(s): TypeScript, React, Node.js, Next.js, Express.js,
            Vue.js, Redux, Ant Design, Emotion, Tailwind
          </p>
        </ContentContainer>
      ),
    },
    {
      command: "projects",
      result: (
        <ContentContainer>
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
        </ContentContainer>
      ),
    },
    {
      command: "learning",
      result: (
        <ContentContainer>
          <p>
            Currently learning: Latest React and Next.js things, Tailwind
            <br />
            Currently reading: Don't Make Me Think (Steve Krug)
          </p>
        </ContentContainer>
      ),
    },
    {
      command: "contact",
      result: (
        <ContentContainer>
          <p>
            You can reach me at{" "}
            <a href="mailto:r4ndr4s4@protonmail.com">r4ndr4s4@protonmail.com</a>
          </p>
        </ContentContainer>
      ),
    },
    {
      command: "sources",
      result: (
        <ContentContainer>
          <p>
            Source code:{" "}
            <a href="https://github.com/r4ndr4s4/cmd-app" target="_blank">
              https://github.com/r4ndr4s4/cmd-app
            </a>
          </p>

          <p>
            Source of the Siemens Nixdorf PC image (jerwyro0 from eBay):{" "}
            <a href="https://www.ebay.de/itm/166853976280" target="_blank">
              https://www.ebay.de/itm/166853976280
            </a>
          </p>

          <p>
            Source of the POST part (Billy O'Reilly from YouTube):{" "}
            <a
              href="https://www.youtube.com/watch?v=CZ9UiPqL-V8"
              target="_blank"
            >
              https://www.youtube.com/watch?v=CZ9UiPqL-V8
            </a>
          </p>

          <p>
            Source of the IBM VGA 8x14 Web437 font (VileR from INT10h):{" "}
            <a
              href="https://int10h.org/oldschool-pc-fonts/fontlist/font?ibm_vga_8x14"
              target="_blank"
            >
              https://int10h.org/oldschool-pc-fonts/fontlist/font?ibm_vga_8x14
            </a>
          </p>

          <p>
            Source of the Internet Explorer missing image favicon (Stoimen from
            his blog):{" "}
            <a
              href="http://stoimen.com/2010/07/01/replace-the-broken-images-with-a-default-image-with-javascript/"
              target="_blank"
            >
              http://stoimen.com/2010/07/01/replace-the-broken-images-with-a-default-image-with-javascript/
            </a>
          </p>
        </ContentContainer>
      ),
    },
  ];
};

export default getCommands;
