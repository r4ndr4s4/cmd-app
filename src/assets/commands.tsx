const commands = [
  {
    command: "intro",
    result: (
      <>
        <p>Hello, I'm András 👋</p>
        <p>I'm a full-stack developer focusing on the frontend.</p>
        <p>
          I started learning programming in elementary school, studied computer
          science in secondary school, and eventually earned my BSc in computer
          engineering. However, nothing I learned in school has been as exciting
          as what I taught myself: web development.
        </p>
        <p>
          My new personal site is currently under development, and I'm also
          working on gathering the projects I can and want to publish, along
          with their code, here.
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
          visualizations, my new personal site app
        </p>
        <p>
          Older project(s): Language-learning SPA to expand vocabulary by
          watching series (Vue.js), Chinese Android smartphone price comparison
          website (KeystoneJS, AngularJS), Note and task list SPA with sync
          between your devices (Express.js, MongoDB, AngularJS), Real-time Draw
          Something clone SPA (Meteor.js)
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
    // TODO
    command: "cv",
    result: <p>-</p>,
  },
];

export default commands;
