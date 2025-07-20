import { fetchThemesInfo } from "@/api/themesInfo";
import useApiRequest from "@/hooks/useApiRequest";
import { useCallback, useEffect } from "react";

type ThemesInfoProps = {
  id: string | undefined;
};

const ThemesInfo = ({ id }: ThemesInfoProps) => {
  const requestFn = useCallback(
    () => fetchThemesInfo({ themeId: Number(id) }),
    [id],
  );
  const {
    data: themeInfoData,
    isError,
    isLoading,
  } = useApiRequest({
    requestFn,
  });

  useEffect(() => {
    if (!themeInfoData && !isLoading && isError) {
      console.error("Failed to fetch theme information");
    }
  }, [themeInfoData, isError, isLoading]);

  return (
    <div>
      {themeInfoData && (
        <div>
          <h1>{themeInfoData.name}</h1>
          <h2>{themeInfoData.title}</h2>
          <p>{themeInfoData.description}</p>
        </div>
      )}
    </div>
  );
};

export default ThemesInfo;
