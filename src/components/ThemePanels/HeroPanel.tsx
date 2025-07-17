import styled from "@emotion/styled";
import type { ThemeInfo } from "@src/pages/ThemePage";

function HeroPanel({ themeInfo }: { themeInfo: ThemeInfo }) {
  return (
    <HeroPanelWrapper backgroundColor={themeInfo.data.backgroundColor}>
      <Name>{themeInfo.data.name}</Name>
      <Title>{themeInfo.data.title}</Title>
      <div>{themeInfo.data.description}</div>
    </HeroPanelWrapper>
  );
}

const Name = styled.div`
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const HeroPanelWrapper = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
  padding: 20px;
`;

export default HeroPanel;
