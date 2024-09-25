import "./App.css";
import { THEME, TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import solarGif from "../public/solar-p.gif";
import Header from "./components/Header";
import ApiService, { MoonData } from "./services/ApiService";
import React, { useState, useEffect } from "react";
import { formatDateTime } from "./utils/help";
import LunarPhaseSimulator from "./components/3d/LunarPhaseSimulator";

const StyledApp = styled.div`
  color: white;

  /* background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  } */
  /* min-height: 100vh; */
`;

const ContentSection = styled.div`
  position: relative;
`;

const FooterSection = styled.div``;

const HeaderSection = styled.header`
  background-color: white;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const toHome = (event: any) => {
  window.scrollTo(0, 0);
};

function App() {
  const { network } = useTonConnect();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextFullMoon, setNextFullMoon] = useState<MoonData | null>(null);

  const api = new ApiService("http://" + (import.meta.env.VITE_MOON_API ?? ""));

  useEffect(() => {
    const fetchMoonData = async () => {
      setLoading(true);
      try {
        const data: MoonData = await api.getNextFullMoon("1990-01-01"); // Example birthday
        setNextFullMoon(data);
      } catch (err) {
        setError("Failed to fetch moon data");
      } finally {
        setLoading(false);
      }
    };

    fetchMoonData();
  }, []);

  return (
    <StyledApp>
      <AppContainer className="app-container">
        <Header
          daysToNextFullMoon={nextFullMoon?.daysToNextMoon ?? 0}
          nextFullMoon={formatDateTime(nextFullMoon?.nextFullMoonDate)}
          illumination={nextFullMoon?.moonPhase.toFixed(2) ?? "0"}
          onCancel={function () {
            throw new Error("Function not implemented.");
          }}
        />

        <ContentSection className="content-container">
          <LunarPhaseSimulator />
          <img style={{ width: "100%" }} src={solarGif} alt="loading..." />
          <FlexBoxCol>
            <TonConnectButton
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                position: "absolute",
                top: "5%",
              }}
            />
            {network && (
              <Button>
                {network
                  ? network === CHAIN.MAINNET
                    ? "mainnet"
                    : "testnet"
                  : "N/A"}
              </Button>
            )}
          </FlexBoxCol>
          <FlexBoxCol>
            <div>
              <b>The next full moon will be:</b>
              <i>Thursday * 17 October 2024 * 1:26:24 pm</i>
              <i>Central European Summer Time (CEST)</i>
            </div>
          </FlexBoxCol>
        </ContentSection>

        <FooterSection className="app-footer">
          <div className="footer-item">
            <i className="home-icon"></i>
            <span>Home</span>
          </div>
          <div className="footer-item">
            <span className="leaderboard-icon"></span>
            <span>Leaderboard</span>
          </div>
          <div className="footer-item">
            <i className="friends-icon"></i>
            <span>Friends</span>
          </div>
        </FooterSection>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
