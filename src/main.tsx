import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { runApp } from "./core-utils";
import { setupMoon } from "./utils/moon";

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <div style={{ zIndex: "11", display: "block" }}>
      {camera.zoom}
      {controls.zoom0}
    </div>

    {/* <WelcomePage /> */}
    {/* <div className="more-content">
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </TonConnectUIProvider> 
    </div> */}
  </>
);
