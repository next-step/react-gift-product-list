import { useParams, useNavigate } from 'react-router-dom';
import { useThemeInfo } from '@/hooks/useThemeInfo';
import { useThemeProducts } from '@/hooks/useThemeProducts';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAuth } from '@/context/AuthContext';

import NavigationBar from '@/common/NavigationBar';
import ProductCard from '@/common/ProductCard';
import Text from '@/common/Text';

import styled from '@emotion/styled';

const Theme = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { themeInfo, loading: infoLoading } = useThemeInfo(themeId ?? '');
  const {
    products,
    loading: productsLoading,
    error,
    hasMore,
    loadMore,
  } = useThemeProducts(Number(themeId));
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const lastProductRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: !productsLoading && hasMore,
    rootMargin: '100px',
  });

  if (infoLoading) return <div>로딩 중...</div>;
  if (!themeInfo) return null;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <NavigationBar />
      <Content>
        <ThemeHeroContent backgroundColor={themeInfo.backgroundColor}>
          <TextLine>
            <Text size="label1" weight="bold" color="#ffffff">
              {themeInfo.name}
            </Text>
          </TextLine>
          <TextLine>
            <Text size="title1" weight="bold" color="#ffffff">
              {themeInfo.title}
            </Text>
          </TextLine>
          <Text size="title2" weight="regular" color="#ffffff">
            {themeInfo.description}
          </Text>
        </ThemeHeroContent>

        {products.length === 0 ? (
          <EmptyMessage>상품이 없습니다.</EmptyMessage>
        ) : (
          <ProductList>
            {products.map((product, index) => {
              const goToCard = () => {
                if (isLoggedIn) {
                  navigate(`/order/${product.id}`);
                } else {
                  navigate('/login');
                }
              };

              if (index === products.length - 1) {
                return (
                  <div key={product.id} ref={lastProductRef}>
                    <ProductCard
                      onClick={goToCard}
                      src={product.imageURL}
                      brandName={product.brandInfo.name}
                      price={product.price.basicPrice.toLocaleString()}
                    />
                  </div>
                );
              } else {
                return (
                  <ProductCard
                    key={product.id}
                    onClick={goToCard}
                    src={product.imageURL}
                    brandName={product.brandInfo.name}
                    price={product.price.basicPrice.toLocaleString()}
                  />
                );
              }
            })}
          </ProductList>
        )}
        {productsLoading && <Spinner />}
      </Content>
    </Layout>
  );
};

export default Theme;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 44px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  gap: 24px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 720px;
`;

const ThemeHeroContent = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
  padding: 20px;
`;

const TextLine = styled.div`
  margin-bottom: 12px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
`;

const EmptyMessage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const Spinner = styled.div`
  margin: 20px auto;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ theme }) => theme.colors.gray800};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
