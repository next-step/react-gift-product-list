import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { THEME_INFO_CODE, fetchThemeInfo } from "@src/apis/BackEnd/apiList";
import useFetchState from "@src/hooks/useFetchState";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import HeroPanel from "@src/components/ThemePanels/HeroPanel";
import ThemePanel from "@src/components/ThemePanels/ThemePanel";
import styled from "@emotion/styled";
import ToastContext from "@src/contexts/ToastContext";

export type ThemeInfo = {
  backgroundColor: string;
  description: number;
  name: string;
  themeId: string;
  title: number;
};

function ThemePage() {
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);
  const themeId = useParams().id ?? "";
  const update = useCallback(async () => {
    const response = await fetchThemeInfo(themeId);
    return response.data;
  }, [themeId]);

  const themeInfo = useFetchState<ThemeInfo>(update);

  useEffect(() => {
    if (themeInfo.status === "pending") return;

    if (themeInfo.status === "error") {
      if (themeInfo.error?.status === THEME_INFO_CODE.NOT_FOUND) {
        toastContext?.message.setValue(themeInfo.error.message);
        navigate(`/`);
      }
      return;
    }
  }, [themeInfo.status]);

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
