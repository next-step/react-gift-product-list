import { useEffect, useState } from "react";
import { fetchThemes, type Theme } from "@/api/theme";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useThemes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchThemes();
        setThemes(data);
      } catch {
        setError(ERROR_MESSAGES.THEME.FAIL_TO_LOAD);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { themes, loading, error };
};
