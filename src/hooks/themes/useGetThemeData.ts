import { useEffect } from "react";
import { getThemes } from "@/api/themes";
import type { GetThemesResponseBody } from "@/api/themes/get-themes";
import { useApiStatus } from "@/hooks/common/useApiStatus";

export const useGetThemeData = () => {
  const {
    data: themes,
    error,
    execute,
    loading,
  } = useApiStatus<GetThemesResponseBody[]>();
  useEffect(() => {
    execute(getThemes);
  }, [execute]);

  return {
    themes: themes || [],
    loading,
    error,
    isEmpty: themes?.length === 0,
  };
};
