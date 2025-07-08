import { useParams } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { messageCards } from '@/data/messageCards';
import MessageCardSelector from './MessageCardSelector';

const OrderPage = () => {
  const { id } = useParams();

  return (
    <div>
      <NavigationBar/>
      <MessageCardSelector cards={messageCards} />
      <p>선택한 상품 ID: {id}</p>
    </div>
  );
};

export default OrderPage;
