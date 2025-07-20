import type { ThemeProduct } from "@/types/ThemeProducts";
import EmptyProductContainer from "@/components/ProductCard/EmptyProductContainer";
import { THEME_PRODUCTS_LABELS } from "./constants/labels";
import styled from "@emotion/styled";
import ProductCard from "@/components/ProductCard/ProductCard";
import { PRODUCT_GRID_TYPES } from "@/components/ProductCard/types/productGridTypes";
import { Loading } from "@/components/Loading/Loading";

const Loader = styled.div`
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const ProductListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProductGridContainer = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: ${({ theme }) => theme.layout.grid.columns.fixed3};
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

interface RenderThemeProductsGridPropsType {
  themeProducts: ThemeProduct[];
  isThemeProductsLoading: boolean;
}

function ThemeProductsGridContent({
  themeProducts,
  isThemeProductsLoading,
}: RenderThemeProductsGridPropsType) {
  if (isThemeProductsLoading && themeProducts.length === 0) {
    return <Loading />;
  }

  if (themeProducts.length === 0) {
    return (
      <EmptyProductContainer label={THEME_PRODUCTS_LABELS.EMPTY_PRODUCT} />
    );
  }

  return (
    <>
      <ProductGridContainer>
        {themeProducts.map((product, idx) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageURL={product.imageURL}
            name={product.name}
            brandName={product.brandInfo.name}
            sellingPrice={product.price.sellingPrice}
            index={idx}
            type={PRODUCT_GRID_TYPES.THEME_PRODUCTS}
          />
        ))}
      </ProductGridContainer>
      {isThemeProductsLoading && <Loading />}
    </>
  );
}

interface ThemeProductsGridPropsType {
  themeProducts: ThemeProduct[];
  isThemeProductsLoading: boolean;
  isLoaderRef: React.RefObject<HTMLDivElement>;
}

function ThemeProductsGrid({
  themeProducts,
  isThemeProductsLoading,
  isLoaderRef,
}: ThemeProductsGridPropsType) {
  return (
    <ProductListContainer>
      <ThemeProductsGridContent
        themeProducts={themeProducts}
        isThemeProductsLoading={isThemeProductsLoading}
      />
      <Loader ref={isLoaderRef} />
    </ProductListContainer>
  );
}

export default ThemeProductsGrid;
