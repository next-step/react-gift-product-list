import CategorySection from '@features/Home/components/CategorySection';
import PromoBanner from '@features/Home/components/PromoBanner';
import RankingSection from '@features/Home/components/ranking/RankingSection';
import FreiendSelector from '@features/Home/components/FriendSelector';

const Home = () => {
  return (
    <>
      <FreiendSelector />
      <CategorySection />
      <PromoBanner />
      <RankingSection />
    </>
  );
};

export default Home;
