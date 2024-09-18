import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { app, camera, renderer, scene } from "./components/scene";
import {
  camera as c2,
  renderer as r2,
  scene as s2,
  clock as cl2,
  animate as a2,
} from "./components/scene2";
import { runApp } from "./core-utils";
import WelcomePage from "./components/Welcome";
import { Parallax, useParallax } from "react-scroll-parallax";
// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function onResize() {
  c2.aspect = window.innerWidth / window.innerHeight;
  c2.updateProjectionMatrix();
  r2.setSize(window.innerWidth, window.innerHeight);
}

let composer;

let currentScroll = 0;
let targetScroll = 0;
let ease = 0.00025;

let theta1 = 0;
let theta2 = 0;
let theta3 = 0;

// Add this flag to control the animation loop
let animationActive = true;
// Add this flag to control whether an animation frame has been requested
let animationFrameRequested = false;

window.addEventListener("scroll", () => {
  targetScroll = window.pageYOffset;
  updateScroll();

  const scrollArea = document.getElementById("scroll-area");
  const scrollAreaRect = scrollArea?.getBoundingClientRect();
  const canvasContainer = document.getElementById("canvas-container");
  const textContainer = document.getElementById("text-container");

  // Check if the "scroll-area" div has scrolled out of view
  if (scrollAreaRect && scrollAreaRect?.bottom <= window.innerHeight) {
    // Hide the canvas
    if (canvasContainer) canvasContainer.style.opacity = "0";
    if (textContainer) textContainer.style.opacity = "0";

    // Stop the animation loop
    animationActive = false;
    // Reset the animation frame requested flag
    animationFrameRequested = false;
    console.log(
      "bottom <= window.innerHeight",
      scrollAreaRect?.bottom,
      window.innerHeight
    );
  } else {
    // Resume the animation loop and show the canvas if needed
    animationActive = true;

    if (canvasContainer) canvasContainer.style.opacity = "1";
    if (textContainer) textContainer.style.opacity = "1";

    // Only request a new animation frame if one hasn't already been requested
    if (!animationFrameRequested) {
      requestAnimationFrame(animate);
      animationFrameRequested = true;
    }

    console.log("else", scrollAreaRect?.bottom, window.innerHeight);
  }
});

function animate() {
  if (animationActive) {
    // USE THE CLOCK'S DELTA TO GET A CONTINOUS UPWARD COUNTING
    const delta = cl2.getDelta();

    // a2();

    // // UPDATE THE COMPOSER
    // composer.render();

    // REQUEST THE CURRENT ANIMATION FRAME
    // requestAnimationFrame(animate);
  }
}

function updateScroll() {
  currentScroll += (targetScroll - currentScroll) * ease;

  theta2 = currentScroll * 0.07;
  theta3 = currentScroll * 0.035;

  setTimeout(updateScroll, 1000 / 60);
}

window.addEventListener("resize", onResize, false);

runApp({}, s2, r2, c2, true, undefined, undefined, "canvas-container");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <div>
      <h2 style={{ color: "white" }}>{c2.zoom}</h2>
    </div>
    <Parallax speed={-1}>
      <WelcomePage />
    </Parallax>
    <div className="more-content">
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      <h2>HELLO</h2>
      {/* <TonConnectUIProvider manifestUrl={manifestUrl}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </TonConnectUIProvider> */}
    </div>
  </>
);
