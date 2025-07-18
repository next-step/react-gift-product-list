import NavigationBar from '@components/Common/NavigationBar';
import OrderContainer from '@src/components/Order/Container/OrderContainer';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';

const Order = () => {
  return (
    <StyledTopestDiv>
      <NavigationBar></NavigationBar>
      <OrderContainer></OrderContainer>
    </StyledTopestDiv>
  );
};

export default Order;
