import GlobalStyle from "@/styles/GlobalStyle.tsx";
import ThemeSection from "@/components/ThemeSection";
import SelectFriend from "@/components/SelectFriend.tsx";
import Cheering from "@/components/Cheering.tsx";
import GiftRanking from "@/components/GiftRankingBox.tsx";
import GiftRankingHeader from "@/components/GiftRankingHeader.tsx";

const Main = () => {
  return (
    <>
      <GlobalStyle />
      <SelectFriend />
      <ThemeSection />
      <Cheering />
      <GiftRankingHeader />
      <GiftRanking />
    </>
  );
};

export default Main;
