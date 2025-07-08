import { useParams } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { messageCards } from '@/data/messageCards';
import MessageCardSelector, { type MessageCard } from './MessageCardSelector';
import SelectedCardPreview from './SelectedCardPreview';
import { useState } from 'react';
import Layout from '@/components/Layout';

const OrderPage = () => {
  const { id } = useParams();

  const [selectedCard, setSelectedCard] = useState<MessageCard | null>(null);
  const [message, setMessage] = useState('');

  const handleSelectCard = (card: MessageCard) => {
    setSelectedCard(card);
    setMessage(card.defaultTextMessage);
  };

  return (
    <Layout>
      <NavigationBar />
      <MessageCardSelector cards={messageCards} selectedId={selectedCard?.id ?? null}
        onSelect={handleSelectCard} />
      {selectedCard && (
        <SelectedCardPreview card={selectedCard} message={message} onChange={setMessage} />
      )}
      <p>선택한 상품 ID: {id}</p>
    </Layout>
  );
};

export default OrderPage;
