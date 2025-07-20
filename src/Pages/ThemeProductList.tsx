import Header from "@/components/Common/Header";
import Layout from "@/components/Common/Layout";
import { SectionContainer } from "@/components/Common/SectionLayout";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { getThemesList } from "@/api/themes";
import { useFetchData } from "@/hooks/useFetchData";
import type { BasicGiftProduct } from "@/types/gift";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";
import RankingItem from "@/components/Common/ProductItem";

const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const fetchFn = useCallback(async () => {
    const res = await getThemesList(Number(themeId));
    return { data: { data: res.data.data.list } };
  }, [themeId]);

  const {
    data: products,
    loading,
    error,
  } = useFetchData<BasicGiftProduct[]>(fetchFn);

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Layout>
      <Header title="선물하기" />
      {loading ? (
        <LoadingSpinner color="#000000" loading={loading} size={35} />
      ) : (
        <ListContainer>
          <SectionContainer>
            <HeroBanner>
              <ThemeName>졸업선물</ThemeName>
              <ThemeTitle>졸업을 축하하는 축하리스트</ThemeTitle>
            </HeroBanner>
            <ProudctList>
              {(products ?? []).map((product) => (
                <RankingItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  imageURL={product.imageURL}
                  price={product.price}
                  brandInfo={product.brandInfo}
                />
              ))}
            </ProudctList>
          </SectionContainer>
        </ListContainer>
      )}
    </Layout>
  );
};

export default ThemeProductList;

const ListContainer = styled.form`
  width: 100%;
  max-width: 720px;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  overflow-y: auto;
  margin: 0 auto;
  padding-bottom: 60px;
`;

const HeroBanner = styled.div`
  width: 100%;
  background-color: #ff0000;
`;

const ThemeName = styled.p`
  ${({ theme }) => theme.font.subtitle1Bold}
`;

const ThemeTitle = styled.p`
  ${({ theme }) => theme.font.title1Bold}
`;

const ProudctList = styled.p`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px 8px;
  margin-top: ${({ theme }) => theme.spacing.spacing2};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  backgorund-color: ${({ theme }) => theme.colors.backgroundDefault};
`;
