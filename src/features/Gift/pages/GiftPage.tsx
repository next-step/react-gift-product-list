import GiftRecipient from '@/features/Gift/components/Recipient/GiftRecipient';
import GiftCategory from '@/features/Gift/components/Category/CategorySection';
import MessageSection from '@/components/MessageSection';
import TrendingGiftRanking from '@/features/Gift/components/TrendRanking/TrendRanking';

const GiftPage = () => {
  return (
    <>
      <GiftRecipient />
      <GiftCategory />
      <MessageSection />
      <TrendingGiftRanking />
    </>
  );
};

export default GiftPage;
