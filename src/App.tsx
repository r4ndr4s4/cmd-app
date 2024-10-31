import styled from "@emotion/styled";
import * as Sentry from "@sentry/react";

import { useStore } from "./store";
import Post from "./components/Post";
import Cmd from "./components/Cmd";
import { AppState } from "./store/types";
import DelayRender from "./components/common/DelayRender";
import Start from "./components/Start";

Sentry.init({
  dsn: "https://5423da82cc7f09a2b1f68d0215b7c14c@o4508219383283712.ingest.de.sentry.io/4508219386167376",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const Container = styled.div`
  width: 818px;
  margin: 0 auto;
`;

function App() {
  const appState = useStore((state) => state.appState);

  return (
    <>
      <DelayRender
        until={
          appState >= AppState.StartScreenInit &&
          appState <= AppState.StartScreenDone
        }
      >
        <Start />
      </DelayRender>

      <Container>
        <DelayRender
          until={
            appState >= AppState.PostFirstScreenInit &&
            appState <= AppState.PostSecondScreenInit
          }
        >
          <Post />
        </DelayRender>

        <DelayRender until={appState >= AppState.CmdInit}>
          <Cmd />
        </DelayRender>
      </Container>
    </>
  );
}

export default App;
