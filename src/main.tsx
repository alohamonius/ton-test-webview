import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { runApp } from "./core-utils";
import { setupMoon } from "./utils/moon";
import styled from "styled-components";
import img from "../public/earth-11014_1280.jpg";
const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const { camera, scene, controls, animate, clock, renderer } = setupMoon(window);
runApp(
  {},
  scene,
  renderer,
  camera,
  true,
  undefined,
  undefined,
  "canvas-container"
);

const StyledApp = styled.div`
  /* Replace with your image URL */
  background-size: cover; /* Cover the entire div */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent repeating */
  background-image: url(${img});
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <StyledApp id="more-content-container">
      <div className="header">
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </TonConnectUIProvider>
      </div>
    </StyledApp>
  </>
);
