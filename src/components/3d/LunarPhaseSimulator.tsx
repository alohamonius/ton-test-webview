import { useEffect } from "react";

const LunarPhaseSimulator: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/lunar-phase-simulator/dist/bundle.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="sim-container"></div>; // Make sure the sim-container is where the lunar phase simulator will load
};

export default LunarPhaseSimulator;
