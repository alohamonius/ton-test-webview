import React, { useEffect } from "react";

interface LunarPhaseSimulatorProps {
  isVisible: boolean;
}

const LunarPhaseSimulator: React.FC<LunarPhaseSimulatorProps> = ({
  isVisible,
}) => {
  useEffect(() => {
    if (isVisible) {
      const script = document.createElement("script");
      script.src = "./3d/lunar-simulator/bundle.js"; //"../public/3d/lunar-simulator/bundle.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isVisible]);

  // Conditionally render the simulator container based on isVisible prop
  if (!isVisible) {
    return null;
  }

  return <div id="sim-container"></div>; // The simulator will load here
};

export default LunarPhaseSimulator;
