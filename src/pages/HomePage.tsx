import Navigation from '@/components/Navigation';
import FriendSelectSection from '@/components/FriendSelectSection';
import CategoryGroup from '@/components/CategorySection/CategoryGroup';
import BannerSection from '@/components/BannerSection';
import RankingGroup from '@/components/RankingSection/RankingGroup';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <FriendSelectSection />
      <CategoryGroup />
      <BannerSection />
      <RankingGroup />
    </>
  );
};

export default HomePage;
