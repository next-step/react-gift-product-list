import { useEffect, useState } from "react";
import { type ThemeInfo, fetchThemeInfo } from "@/api/theme";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { AxiosError } from "axios";

export const useThemeInfo = (themeId: number | undefined) => {
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!themeId) return;

    (async () => {
      try {
        const data = await fetchThemeInfo(themeId);
        setThemeInfo(data);
      } catch (err) {
        const error = err as AxiosError;

        if (error.response?.status === 404) {
          navigate(ROUTES.HOME);
        }
        setError(ERROR_MESSAGES.THEME.FAIL_TO_LOAD);
      } finally {
        setLoading(false);
      }
    })();
  }, [themeId, navigate]);

  return { themeInfo, loading, error };
};
