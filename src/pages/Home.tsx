import { FriendSelect } from '../components/home/FriendSelect';

import { GiftThemeGrid } from '../components/giftTheme/GiftThemeGrid';
import { YellowBanner } from '../components/home/YellowBanner';
import GiftRankingFilter from '../components/home/GiftRankingFilter';
import { Header } from '../components/common/Header';

const Home = () => {
  return (
    <>
      <Header />
      <FriendSelect />
      <GiftThemeGrid />
      <YellowBanner />
      <GiftRankingFilter />
    </>
  );
};

export default Home;
