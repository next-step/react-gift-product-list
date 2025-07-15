import * as S from './styles';

interface ItemCardProps {
  imageUrl: string;
  title: string;
}

const ItemCard = (props: ItemCardProps) => {
  const { imageUrl, title } = props;
  
  return (
    <S.Card>
      <S.Image src={imageUrl} alt={title} />
      <S.Title>{title}</S.Title>
    </S.Card>
  );
};

export default ItemCard; 