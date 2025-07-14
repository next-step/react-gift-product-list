import styled from "@emotion/styled";
import { fetchThemes } from "@src/apis/BackEnd/apiList";
import ThemeButton from "@src/components/shared/ThemeButton";
import { themeMockData } from "@src/mock/themeMockData";
import { useEffect, useState } from "react";

function GiftThemePanel() {
  const [themes, setThemes] = useState(null);

  useEffect(() => {
    const update = async () => {
      setThemes(await fetchThemes());
    };
    update();
  }, []);

  return (
    themes && (
      <GiftThemePanelWrapper>
        <TitleP>선물 테마</TitleP>
        <ThemePlaceholder>
          {themeMockData.map((theme) => {
            return (
              <ThemeButton
                key={theme.themeId}
                image={theme.image}
                caption={theme.name}
              />
            );
          })}
        </ThemePlaceholder>
      </GiftThemePanelWrapper>
    )
  );
}

const TitleP = styled.p`
  width: 95%;
  font-size: 20px;
  font-weight: bold;
`;

const ThemePlaceholder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const GiftThemePanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
`;

export default GiftThemePanel;
