import "./App.css";
import { THEME, TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";

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
  margin: 0 auto;
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
      <Button onClick={toHome} className="home-button" />
      <AppContainer>
        <FlexBoxCol>
          <TonConnectButton
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
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
        <ContentSection>
          <FlexBoxCol>
            <div>
              <b>The next full moon will be:</b>
              <i>Thursday * 17 October 2024 * 1:26:24 pm</i>
              <i>Central European Summer Time (CEST)</i>
            </div>
          </FlexBoxCol>
        </ContentSection>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
