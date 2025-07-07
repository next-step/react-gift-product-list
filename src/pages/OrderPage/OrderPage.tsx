import { useParams } from 'react-router-dom';

const OrderPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>주문하기 페이지</h1>
      <p>선택한 상품 ID: {id}</p>
    </div>
  );
};

export default OrderPage;