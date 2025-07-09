import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { messageCards } from '@/data/messageCards';
import MessageCardSelector, { type MessageCard } from './MessageCardSelector/MessageCardSelector';
import SelectedCardPreview from './SelectedCardPreview/SelectedCardPreview';
import { useState } from 'react';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import ProductSummary from './ProductSummary/ProductSummary';
import SenderInfo from './SenderInfo/SenderInfo';
import ReceiverInfo from './ReceiverInfo/ReceiverInfo';

const OrderPage = () => {
  const [selectedCard, setSelectedCard] = useState<MessageCard | null>(null);
  const [message, setMessage] = useState('');

  const handleSelectCard = (card: MessageCard) => {
    setSelectedCard(card);
    setMessage(card.defaultTextMessage);
  };

  const [senderName, setSenderName] = useState('');

  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [quantity, setQuantity] = useState('1');

  return (
    <Layout>
      <NavigationBar />
      <MessageCardSelector
        cards={messageCards}
        selectedId={selectedCard?.id ?? null}
        onSelect={handleSelectCard}
      />
      {selectedCard && (
        <SelectedCardPreview card={selectedCard} message={message} onChange={setMessage} />
      )}
      <SenderInfo senderName={senderName} onChangeSenderName={setSenderName} />
      <ReceiverInfo
        receiverName={receiverName}
        onChangeReceiverName={setReceiverName}
        receiverPhone={receiverPhone}
        onChangeReceiverPhone={setReceiverPhone}
        quantity={quantity}
        onChangeQuantity={setQuantity}
      />
      <SectionTitle title="상품 정보" />
      <ProductSummary />
    </Layout>
  );
};

export default OrderPage;
