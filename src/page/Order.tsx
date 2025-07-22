
import PresentCardSelector from '@/component/order/PresentCardSelector';
import OrderCheck from '@/component/order/OrderCheck';
import Receiver from '@/component/order/Receiver';
import Sender from '@/component/order/Sender';

import { DefaultDiv, EmptyDivGray8h } from '@/styles/Common.styled';
const Order = () => {
  return (
    <DefaultDiv>
      <PresentCardSelector/>
      <EmptyDivGray8h />

      <Sender/>
      <EmptyDivGray8h />
        <Receiver />

      <EmptyDivGray8h />
      <OrderCheck/>
    </DefaultDiv>
  );
};

export default Order;