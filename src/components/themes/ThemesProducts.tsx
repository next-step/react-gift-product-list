import styled from "@emotion/styled";
import { fetchThemesProducts } from "@/api/themesProducts";
import useApiRequest from "@/hooks/useApiRequest";
import { useCallback } from "react";
import ThemesItem from "./ThemesItem";
import { Link } from "react-router";
import { ROUTE_PATH } from "@/routes/paths";
import BoxMessage from "../common/BoxMessage";

type ThemesProductsProps = {
  id: string | undefined;
};

const ThemesProducts = ({ id }: ThemesProductsProps) => {
  const requestFn = useCallback(
    () => fetchThemesProducts({ themeId: Number(id) }),
    [id],
  );
  const {
    data: themeProductsData,
    isError,
    isLoading,
  } = useApiRequest({
    requestFn,
  });

  if (!themeProductsData && !isLoading && isError) {
    console.error("Failed to fetch theme products");
  }
  console.log("themeProductsData", themeProductsData?.list);

  return (
    <ProductsSection>
      {themeProductsData?.list && themeProductsData.list.length > 0 ? (
        <ProductsGrid>
          {themeProductsData.list.map(product => (
            <Link
              to={ROUTE_PATH.ORDER.replace(":id", String(product.id))}
              key={product.id}
            >
              <ThemesItem product={product} />
            </Link>
          ))}
        </ProductsGrid>
      ) : (
        <BoxMessage message="상품이 없습니다." height="240px" />
      )}
    </ProductsSection>
  );
};

export default ThemesProducts;

const ProductsSection = styled.section`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => `${theme.spacing.spacing6} ${theme.spacing.spacing2}`};
`;
