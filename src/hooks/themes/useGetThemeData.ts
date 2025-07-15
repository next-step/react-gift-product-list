import { useState, useEffect } from "react";
import { getThemes } from "@/api/themes";
import type { GetThemesResponseBody } from "@/api/themes/get-themes";

export const useGetThemeData = () => {
  const [themes, setThemes] = useState<GetThemesResponseBody[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        setError(null);
        const themeData = await getThemes();
        setThemes(themeData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "알 수 없는 오류가 발생했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return {
    themes,
    loading,
    error,
    isEmpty: themes.length === 0,
  };
};
