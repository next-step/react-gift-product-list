import NavigationBar from '@components/Common/NavigationBar';
import OrderContainer from '@components/Order/OrderContainer';
import StyledTopestDiv from '@src/styles/Common/StyledTopesDiv';

const Order = () => {
  return (
    <StyledTopestDiv>
      <NavigationBar></NavigationBar>
      <OrderContainer></OrderContainer>
    </StyledTopestDiv>
  );
};

export default Order;
