import styled from "@emotion/styled";
import { fetchThemes } from "@src/apis/BackEnd/apiList";
import ThemeButton from "@src/components/shared/ThemeButton";
import useFetchState from "@src/hooks/useFetchState";
import { themeMockData } from "@src/mock/themeMockData";
import PendingSpinner from "./shared/PendingSpinner";

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

function GiftThemePanel() {
  const themes = useFetchState<Theme[]>(fetchThemes);

  return (
    <>
      {themes.status === "pending" && <PendingSpinner />}

      {themes.status === "done" && themes.data && (
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
      )}
    </>
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

  animation: fadeSlideIn 0.4s ease-out;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default GiftThemePanel;
