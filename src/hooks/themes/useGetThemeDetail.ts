import { ApiError } from "@/api/custom-error";
import {
  getThemeInfo,
  type ThemeInfoResponseBody,
} from "@/api/themes/get-theme-info";
import { useApiStatus } from "@/hooks/common/useApiStatus";
import { useRouter } from "@/hooks/common/useRouter";
import { useEffect } from "react";

export const useGetThemeDetail = (themeId: number) => {
  const { data, error, execute, loading } =
    useApiStatus<ThemeInfoResponseBody>();
  const { goHomePage } = useRouter();

  useEffect(() => {
    if (!themeId || isNaN(themeId)) {
      goHomePage();
      return;
    }
    execute(() => getThemeInfo(themeId)).catch(error => {
      if (error instanceof ApiError && error.name === "ApiError") {
        const apiError = error;
        if (apiError.statusCode === 404) {
          goHomePage();
        }
      }
    });
  }, [execute, themeId]);

  return {
    data,
    error,
    loading,
  };
};
