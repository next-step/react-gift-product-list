import { FriendSelect } from '../components/FriendSelect';

import { GiftThemeGrid } from '../components/GiftThemeGrid';
import { YellowBanner } from '../components/YellowBanner';
import GiftRankingFilter from '../components/GiftRankingFilter';
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
