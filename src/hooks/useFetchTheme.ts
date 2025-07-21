import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getThemeInfo } from "@/services/theme";
import { showErrorToast } from "@/styles/toast";
import type { ThemeInfo } from "@/types/theme";

export function useFetchTheme(themeId?: string) {
  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheme = async () => {
      setLoading(true);
      try {
        if (!themeId) return;
        const data = await getThemeInfo(themeId);
        setTheme(data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          showErrorToast("존재하지 않는 테마입니다.");
          navigate("/", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [themeId, navigate]);

  return { theme, loading };
}
