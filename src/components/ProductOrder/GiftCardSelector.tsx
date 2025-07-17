import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { orderData } from '@/data/ORDER_DATA';

type GiftCardSelectorProps = {
  message: string;
  setMessage: (msg: string) => void;
  messageCardId: string;
  setMessageCardId: (id: string) => void;
};

const GiftCardSelector = ({
  message,
  setMessage,
  messageCardId,
  setMessageCardId,
}: GiftCardSelectorProps) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const selectedCard = orderData[selectedCardIndex];

  useEffect(() => {
    setMessage(selectedCard.defaultTextMessage);
    setMessageCardId(selectedCard.id);
  }, [selectedCard, setMessage, setMessageCardId]);

  const handleCardSelect = (index: number) => {
    setSelectedCardIndex(index);
  };

  return (
    <>
      <CardSlider>
        {orderData.map((card, index) => (
          <CardItem
            key={card.id}
            isSelected={index === selectedCardIndex}
            onClick={() => handleCardSelect(index)}
          >
            <CardImage src={card.thumbUrl} alt={`card-${index}`} />
          </CardItem>
        ))}
      </CardSlider>

      <SelectedCardPreview>
        <CardFrame>
          <PreviewImage src={selectedCard.imageUrl} />
        </CardFrame>
        <CardMessage
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </SelectedCardPreview>
    </>
  );
};

export default GiftCardSelector;

const CardSlider = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 0 20px;
`;

const CardItem = styled.div<{ isSelected: boolean }>`
  flex-shrink: 0;
  width: 76px;
  height: 50px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.isSelected ? '#fee500' : 'transparent')};
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SelectedCardPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
`;

const CardFrame = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
`;

const CardMessage = styled.input`
  width: 100%;
  height: 45px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
