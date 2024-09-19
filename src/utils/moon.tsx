import { MathUtils } from "three";
import {
  camera,
  renderer,
  scene,
  clock,
  animate,
  controls,
} from "../components/scene";

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseWheel(event: any) {
  // event.preventDefault();
  // camera.position.y += event.deltaY / 1000;
  // // prevent scrolling beyond a min/max value
  // camera.position.clampScalar(0, 10);
}

const maxZoomOut = 5; // Maximum zoom out level (or distance)
const maxZoomIn = 1; // Maximum zoom in level (or distance)
const totalScrollHeight =
  document.documentElement.scrollHeight - window.innerHeight;
const parallaxElement = document.getElementById("canvas-container");
const hideThreshold = window.innerHeight; // When the user scrolls beyond this point, hide the 3D object

function setupMoon(window: Window) {
  let currentScroll = 0;
  let targetScroll = 0;
  const ease = 0.00025;
  let theta1 = 0,
    theta2 = 0,
    theta3 = 0;

  let animationActive = true; // Control animation loop
  let animationFrameRequested = false; // Control frame request
  let isTouchDevice = "ontouchstart" in document.documentElement;

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", onWindowResize, false);
  window.addEventListener("wheel", handleScroll, false);

  function handleScroll() {
    const scrollPercent = window.scrollY / totalScrollHeight;

    // Map scroll position to camera zoom
    const newZoom = maxZoomIn + (maxZoomOut - maxZoomIn) * scrollPercent;

    // Apply zoom with clamping to prevent exceeding limits
    camera.zoom = MathUtils.clamp(newZoom, maxZoomIn, maxZoomOut);
    camera.updateProjectionMatrix(); // Update the camera

    // Adjust parallax element opacity based on scroll
    if (parallaxElement) {
      const opacity = Math.max(1 - scrollPercent + 0.4, 0); // Smoothly hide the element
      parallaxElement.style.opacity = opacity.toString();
    }

    // Check visibility and manage animation accordingly
    manageAnimationVisibility();
  }

  function manageAnimationVisibility() {
    const scrollArea = document.getElementById("scroll-area");
    const scrollAreaRect = scrollArea?.getBoundingClientRect();
    const canvasContainer = document.getElementById("canvas-container");
    const textContainer = document.getElementById("text-container");

    // Check if the scroll area is out of view
    if (scrollAreaRect && scrollAreaRect.bottom <= window.innerHeight) {
      //   setElementOpacity(canvasContainer, 0);
      setElementOpacity(textContainer, 0);
      canvasContainer?.classList.add("hidden");
      animationActive = false;
      animationFrameRequested = false;
    } else {
      canvasContainer?.classList.remove("hidden");
      //   setElementOpacity(canvasContainer, 1);
      setElementOpacity(textContainer, 1);

      if (!animationFrameRequested) {
        requestAnimationFrame(animate);
        animationFrameRequested = true;
      }
    }
  }

  function setElementOpacity(element: HTMLElement | null, opacity: number) {
    if (element) {
      element.style.opacity = opacity.toString();
    }
  }

  function updateScroll() {
    currentScroll += (targetScroll - currentScroll) * ease;
    theta2 = currentScroll * 0.07;
    theta3 = currentScroll * 0.035;

    setTimeout(updateScroll, 1000 / 60); // 60 FPS
  }

  function animate() {
    if (animationActive) {
      const delta = clock.getDelta();

      // Update scene, animations, or effects here
      // composer.render();

      // Request next frame
      requestAnimationFrame(animate);
    }
  }

  return { camera, scene, clock, animate, controls, renderer };
}

export { setupMoon };
