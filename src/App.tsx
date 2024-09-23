import "./App.css";
import { THEME, TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import solarGif from "../public/solar-p.gif";
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

  return (
    <StyledApp>
      <AppContainer className="app-container">
        <HeaderSection>
          <FlexBoxCol>
            <div className="statistics">
              <p>Birthday Statistics</p>
              <span>Days till next full moon: 21</span>
            </div>
          </FlexBoxCol>
        </HeaderSection>

        <ContentSection className="content-container">
          <div className="test-iframe">
            <iframe src="https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html"></iframe>
          </div>
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
