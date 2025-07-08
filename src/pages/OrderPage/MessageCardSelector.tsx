import { useState } from 'react';
import * as S from './MessageCardSelector.styles';

interface MessageCard {
  id: number;
  thumbUrl: string;
  imageUrl: string;
  defaultTextMessage: string;
}

interface Props {
  cards: MessageCard[];
  onSelect?: (card: MessageCard) => void; 
}

const MessageCardSelector = ({ cards, onSelect }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (card: MessageCard) => {
    setSelectedId(card.id);
    if (onSelect) onSelect(card);
  };

  return (
    <S.Container>
      {cards.map(card => (
        <S.Card
          key={card.id}
          isSelected={card.id === selectedId}
          onClick={() => handleClick(card)}
        >
          <S.Thumbnail src={card.thumbUrl} alt={card.defaultTextMessage} />
        </S.Card>
      ))}
    </S.Container>
  );
};

export default MessageCardSelector;

