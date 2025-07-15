import styled from '@emotion/styled';
import { colors } from '@/styles/tokens';
import { Header } from '@/components/Header/Header';
import { CategoryGrid } from '@/components/CategoryGrid/CategoryGrid';
import { Banner } from '@/components/Banner/Banner';
import { FriendSelector } from '@/components/FriendSelector/FriendSelector';
import { RankingSection } from '@/components/RankingSection/RankingSection';
import { useFetchThemes } from '@/api/fetchThemes';
import { Loading } from '@/components/common/Loading';

const AppContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: ${colors.gray50};
  min-height: 100vh;
`;

export const GiftPage = () => {
  const { themes, themesLoading, themesError } = useFetchThemes();

  return (
    <AppContainer>
      <Header title="선물하기" />
      <FriendSelector onClick={() => console.log('선물할 친구 선택')} />
      {themesLoading ? (
        <Loading />
      ) : themesError && themes.length === 0 ? (
        <div>테마 불러오기 실패</div>
      ) : (
        <CategoryGrid
          categories={themes}
          onCategoryClick={(category) => console.log('카테고리 클릭', category)}
        />
      )}
      <Banner
        text="카카오테크 캠퍼스 3기 여러분 프로트엔드 2단계 과제 화이팅! 🎉"
        onClick={() => console.log('Banner 클릭')}
      />
      <RankingSection />
    </AppContainer>
  );
};
