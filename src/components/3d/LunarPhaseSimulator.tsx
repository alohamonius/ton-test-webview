import React, { useEffect } from "react";

interface LunarPhaseSimulatorProps {
  isVisible: boolean;
}

const LunarPhaseSimulator: React.FC<LunarPhaseSimulatorProps> = ({
  isVisible,
}) => {
  useEffect(() => {
    console.log("LunarPhaseSimulator component mounted.");

    if (isVisible) {
      console.log("Showing Lunar Phase Simulator...");

      const script = document.createElement("script");
      script.src = "./3d/lunar-simulator/bundle.js"; //"../public/3d/lunar-simulator/bundle.js";
      script.async = true;

      script.onload = () => {
        console.log("Lunar Phase Simulator script loaded successfully.");
      };

      script.onerror = () => {
        alert("Error loading Lunar Phase Simulator. Please try again.");
      };

      document.body.appendChild(script);

      return () => {
        console.log("Cleaning up Lunar Phase Simulator...");
        document.body.removeChild(script);
      };
    } else {
      console.log("Hiding Lunar Phase Simulator...");
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return <div id="sim-container"></div>; // The simulator will load here
};

export default LunarPhaseSimulator;
