import React, { useEffect, useState } from "react";
// import './MoonWidget.css'; // Assume we create a CSS file to style this

interface MoonWidgetProps {
  dateNow?: Date; // Optional prop, defaults to the current date
}

interface MoonData {
  illumination: number;
  moonset: string;
  nextFullMoonInDays: number;
}

const MoonWidget: React.FC<MoonWidgetProps> = ({ dateNow = new Date() }) => {
  const [moonData, setMoonData] = useState<MoonData | null>(null);

  // Fetch moon data from the API
  useEffect(() => {
    const fetchMoonData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/next-full-moon?date=${dateNow.toISOString()}`
      );
      const data = await response.json();
      setMoonData(data);
    };

    fetchMoonData();
  }, [dateNow]);

  if (!moonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moon-widget">
      <div className="moon-header">
        <span>WANING GIBBOUS</span>
      </div>
      <div className="moon-info">
        <div className="moon-detail">
          <span>Illumination</span>
          <span>{moonData.illumination}%</span>
        </div>
        <div className="moon-detail">
          <span>Moonset</span>
          <span>{moonData.moonset}</span>
        </div>
        <div className="moon-detail">
          <span>Next Full Moon</span>
          <span>{moonData.nextFullMoonInDays} DAYS</span>
        </div>
      </div>
    </div>
  );
};

export default MoonWidget;
