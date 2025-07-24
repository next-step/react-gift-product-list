import { ROUTE_PATH } from '@/routes/Routes';
import { isLoggedIn } from '@/utils/auth';
import NavigationBar from '@components/NavigationBar';
import OrderForm from '@components/OrderForm/OrderForm';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  WebkitBoxPack: 'start',
  justifyContent: 'flex-start',
  backgroundColor: theme.semanticColors.background.default,
}));

const Container = styled.div(({ theme }) => ({
  maxWidth: '720px',
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  backgroundColor: theme.semanticColors.background.default,
  paddingTop: '2.75rem',
}));

const Order = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(ROUTE_PATH.LOGIN, { replace: true });
    }
  }, [navigate]);
  return (
    <Wrapper>
      <NavigationBar />
      <Container>
        <main>
          <OrderForm />
        </main>
      </Container>
    </Wrapper>
  );
};

export default Order;
