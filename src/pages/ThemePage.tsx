import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchThemeInfo } from "@src/apis/BackEnd/apiList";
import useFetchState from "@src/hooks/useFetchState";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import HeroPanel from "@src/components/ThemePanels/HeroPanel";
import ThemePanel from "@src/components/ThemePanels/ThemePanel";
import styled from "@emotion/styled";

export type ThemeInfo = {
  data: {
    backgroundColor: string;
    description: number;
    name: string;
    themeId: string;
    title: number;
  };
};

function ThemePage() {
  const navigate = useNavigate();
  const themeId = useParams().id ?? "";
  const update = useCallback(async () => {
    const response = await fetchThemeInfo(themeId);
    if (!response) {
      console.error("fetchProductSummary에 실패하였습니다.");
      return;
    }

    if (response.status === 404) {
      navigate(`/?err=${encodeURIComponent(response.data.data.message)}`);
      return;
    }

    return response.data;
  }, [themeId]);

  const themeInfo = useFetchState<ThemeInfo>(update);

  return (
    <>
      {themeInfo.status === "pending" && <PendingSpinner />}
      {themeInfo.status === "done" && (
        <ThemePageWrapper>
          <HeroPanel themeInfo={themeInfo.data!} />
          <ThemePanel />
        </ThemePageWrapper>
      )}
    </>
  );
}

const ThemePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ThemePage;
