import { useParams } from "react-router-dom";
import { useApiRequest } from "@/hooks/useApiRequest";
import styled from "@emotion/styled";
import ThemeProductsList from "@/pages/themeproductspage/ThemeProductsList";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import type { ThemeInfo, ThemeProductResponse } from "@/types/api_types";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ThemeProductsPage() {
  const { themeId } = useParams();
  const parsedThemeId = Number(themeId);

  if (!parsedThemeId) {
    return <p>잘못된 경로입니다.</p>;
  }
  const { data: themeInfo, status: themeStatus } = useApiRequest<ThemeInfo>({
    url: API_ENDPOINTS.THEME_INFO(parsedThemeId),
  });
  const { data: productData, status: productStatus } =
    useApiRequest<ThemeProductResponse>({
      url: API_ENDPOINTS.THEME_PRODUCTS(parsedThemeId),
    });

  if (themeStatus === "loading" || productStatus === "loading")
    return <LoadingSpinner />;
  if (
    themeStatus === "error" ||
    productStatus === "error" ||
    !themeInfo ||
    !productData
  )
    return <p>정보를 불러올 수 없습니다.</p>;

  return (
    <div>
      <Banner style={{ backgroundColor: themeInfo.backgroundColor }}>
        <ThemeInfoName>{themeInfo.name}</ThemeInfoName>
        <ThemeInfoTitle>{themeInfo.title}</ThemeInfoTitle>
        <ThemeInfoDes>{themeInfo.description}</ThemeInfoDes>
      </Banner>
      <section>
        <ThemeProductsList products={productData.list} />
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
