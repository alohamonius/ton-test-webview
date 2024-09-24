import React, { useEffect } from "react";
import styled from "styled-components";
import moon from "../../public/moon.jpg";
const HeaderSection = styled.header`
  width: 100%;
  background-color: #1a1b1f;
  /* border-bottom: 1px solid #e0e0e0; */
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
`;

const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  text-align: center;
  max-width: 800px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #333;
  letter-spacing: 0.5px;
`;

const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #777;
  margin-top: 8px;
`;

const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px;
  position: relative;
  align-items: center;
  width: 100%;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
`;

const LeftIcon = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  flex: 0 0 25%;
  text-align: center;
`;

// flex: 0 0 25%;
// text-align: center;

const CenterIcon = styled.span`
  font-size: 24px;
  flex: 0 0 50%;
  text-align: center;
`;

const RightIcon = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
  flex: 0 0 25%;
`;

interface HeaderProps {
  daysToNextFullMoon: number;
  nextFullMoon: string;
  illumination: string;
  onCancel: () => any;
}

const Header: React.FC<HeaderProps> = ({
  daysToNextFullMoon,
  nextFullMoon,
  illumination,
  onCancel,
}) => {
  useEffect(() => {
    if (!illumination) return;
  }, [illumination]);
  return (
    <HeaderSection>
      <Row1>
        <LeftIcon onClick={onCancel}>❌</LeftIcon>
        <CenterIcon>Moooo🌕N</CenterIcon>
        <RightIcon>⋯</RightIcon>
      </Row1>
      <Row2>
        <FlexBoxCol>
          <SubTitle>Days till next full moon: {daysToNextFullMoon}</SubTitle>
          <SubTitle>Next full moon date: {nextFullMoon}</SubTitle>
          <SubTitle>Illumination: {illumination}%</SubTitle>
        </FlexBoxCol>
        <FlexBoxCol>
          <div className="moon-container">
            <img
              className="moon"
              src="https://s3-alpha-sig.figma.com/img/7b29/465b/94a2dfbaae26e88d2ec0d029d7bd5bae?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LXREI5jKP81CsdgTjJfLnmB-aXSRmeuWSToeZ46ZEyApVqDZBN-Nmask0XoERS2foKWO4ARoqxVAVgmwQvVo-2ObFFfzE9miZvL6ndKHTAl7xkmp3zmoOLRawTfmM-W6Xe8TQtTzUMOnz4Ak7GmqspsnqDQsgJJX4wLVaSikjQJW-glTikgQV35RTnuiwTDDoitJev2-aFYBkoAWIO~1e4kR~-dls0MDrzrSGEUeUh5ex1HZ95qSTKK44IQ~3DPxUirwhIyUlraF719JpnjEJv62nIYpGv1s4KWLDv4Ph3ttMsRKReLNQl5fSUUf9tHCBgkK7CQQqKIBHw0qkm3Jmw__"
            />
          </div>
          <div className="shadow"></div>
        </FlexBoxCol>
      </Row2>
    </HeaderSection>
  );
};

export default Header;
