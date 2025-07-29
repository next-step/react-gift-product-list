import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Tab } from '@/components/common/Tab';
import { Button } from '@/components/common/Button';
import { useProducts } from '@/hooks/useProducts';
import { Spinner } from '@/components/common/Spinner';
import { ProductItem } from '@/components/ProductItem';

export function ProductListSection() {
  /* 탭/더보기 상태 */
  const [mainTab, setMainTab] = useState<'ALL' | 'FEMALE' | 'MALE' | 'TEEN'>('ALL');
  const [subTab, setSubTab] = useState<'WANT' | 'GIVE' | 'WISH'>('WANT');
  const [showAll, setShowAll] = useState(false);

  const { products, isLoading, error } = useProducts(mainTab, subTab);

  useEffect(() => {
    const savedMainTab = localStorage.getItem('mainTab');
    const savedSubTab = localStorage.getItem('subTab');

    if (savedMainTab && ['ALL', 'FEMALE', 'MALE', 'TEEN'].includes(savedMainTab)) {
      setMainTab(savedMainTab as 'ALL' | 'FEMALE' | 'MALE' | 'TEEN');
    }
    if (savedSubTab && ['WANT', 'GIVE', 'WISH'].includes(savedSubTab)) {
      setSubTab(savedSubTab as 'WANT' | 'GIVE' | 'WISH');
    }
  }, []);

  const handleMainTabClick = (tab: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN') => {
    setMainTab(tab);
    localStorage.setItem('mainTab', tab);
  };

  const handleSubTabClick = (tab: 'WANT' | 'GIVE' | 'WISH') => {
    setSubTab(tab);
    localStorage.setItem('subTab', tab);
  };

  const displayedProducts = showAll ? products : products.slice(0, 6);

  /* 렌더링 */
  return (
    <Section>
      {/* 타이틀 */}
      <Title>실시간 급상승 선물랭킹</Title>

      {/* 1차 탭 : 대상별 */}
      <MainTabs>
        <Tab variant="main" active={mainTab === 'ALL'} onClick={() => handleMainTabClick('ALL')}>
          🎁 전체
        </Tab>
        <Tab
          variant="main"
          active={mainTab === 'FEMALE'}
          onClick={() => handleMainTabClick('FEMALE')}
        >
          👩 여성이
        </Tab>
        <Tab variant="main" active={mainTab === 'MALE'} onClick={() => handleMainTabClick('MALE')}>
          👨 남성이
        </Tab>
        <Tab variant="main" active={mainTab === 'TEEN'} onClick={() => handleMainTabClick('TEEN')}>
          🧒 청소년이
        </Tab>
      </MainTabs>

      {/* 2차 탭 : 액션별 */}
      <SubTabs>
        <Tab variant="sub" active={subTab === 'WANT'} onClick={() => handleSubTabClick('WANT')}>
          받고 싶어한
        </Tab>
        <Tab variant="sub" active={subTab === 'GIVE'} onClick={() => handleSubTabClick('GIVE')}>
          많이 선물한
        </Tab>
        <Tab variant="sub" active={subTab === 'WISH'} onClick={() => handleSubTabClick('WISH')}>
          위시로 받은
        </Tab>
      </SubTabs>

      {/* 상품 그리드 */}
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : error ? (
        <Message>상품 목록을 불러오는데 실패했습니다.</Message>
      ) : products.length === 0 ? (
        <Message>상품 목록이 없습니다.</Message>
      ) : (
        <ProductGrid>
          {displayedProducts.map((p, idx) => (
            <ProductItem key={p.id} product={p} rank={idx + 1} />
          ))}
        </ProductGrid>
      )}

      {/* 더보기 / 접기 */}
      {products.length > 6 && (
        <ButtonContainer>
          <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
            {showAll ? '접기' : '더보기'}
          </Button>
        </ButtonContainer>
      )}
    </Section>
  );
}

/* ───────── styles ───────── */

const Section = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.title.title2Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const MainTabs = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing3};
  overflow-x: auto;
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const SubTabs = styled.ul`
  display: flex;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.blue.blue100};
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
`;

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, calc((100% - (2 * ${({ theme }) => theme.spacing.spacing4})) / 3));
  gap: ${({ theme }) => theme.spacing.spacing4};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`;

const Message = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray600};
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; // Adjust as needed
`;
