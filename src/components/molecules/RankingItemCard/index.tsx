import * as S from './styles';
import { type ClickHandler } from '@/components';

interface RankingItemCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  price?: number;
  rank: number;
  onClick?: ClickHandler;
}

const RankingItemCard = (props: RankingItemCardProps) => {
  const { imageUrl, title, subtitle, price, rank, onClick } = props;
  
  return (
    <S.Card onClick={onClick}>
      <S.RankBadge rank={rank}>{rank}</S.RankBadge>
      <S.Image src={imageUrl} alt={title} />
      <S.Subtitle>{subtitle}</S.Subtitle>
      <S.ProductName>{title}</S.ProductName>
      {price !== undefined && <S.Price>{price.toLocaleString()} <span>원</span></S.Price>}
    </S.Card>
  );
};

export default RankingItemCard; 