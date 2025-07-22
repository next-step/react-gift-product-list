import { useParams } from "react-router-dom";
import { useApiRequest } from "@/hooks/useApiRequest";
import styled from "@emotion/styled";
import ThemeProductsList from "@/pages/themeproductspage/ThemeProductsList";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import type { ThemeInfo } from "@/types/api_types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { HTTP_STATUS } from "@/utils/HTTP_STATUS";

export default function ThemeProductsPage() {
  const { themeId } = useParams();
  const parsedThemeId = Number(themeId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!parsedThemeId) {
      navigate("/notfound");
    }
  }, [parsedThemeId, navigate]);

  if (!parsedThemeId) return null;

  const {
    data: themeInfo,
    status: themeStatus,
    error: themeError,
  } = useApiRequest<ThemeInfo>({
    url: API_ENDPOINTS.THEME_INFO(parsedThemeId),
  });

  const handleError = useApiErrorHandler({
    fallbackMessage: "테마 정보를 불러올 수 없습니다.",
    customHandler: (statusCode) => {
      if (statusCode === HTTP_STATUS.NOT_FOUND) {
        navigate("/");
        return true;
      }
      return false;
    },
  });

  useEffect(() => {
    if (themeStatus === "error" && themeError) {
      handleError(themeError);
    }
  }, [themeStatus, themeError, handleError]);

  if (themeStatus === "loading") return <LoadingSpinner />;

  if (!themeInfo) {
    return <p>정보를 불러올 수 없습니다.</p>;
  }

  return (
    <div>
      <Banner style={{ backgroundColor: themeInfo.backgroundColor }}>
        <ThemeInfoName>{themeInfo.name}</ThemeInfoName>
        <ThemeInfoTitle>{themeInfo.title}</ThemeInfoTitle>
        <ThemeInfoDes>{themeInfo.description}</ThemeInfoDes>
      </Banner>
      <section>
        <ThemeProductsList />
      </section>
    </div>
  );
}

const Banner = styled.div`
  padding: 24px;
`;

const ThemeInfoName = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-bottom: 14px;
  color: white;
`;

const ThemeInfoTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
`;

const ThemeInfoDes = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  margin-bottom: 4px;
  color: white;
`;
