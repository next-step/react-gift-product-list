import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orders } from '@/data/orders';
import { getProductById } from '@/lib/api';
import { type RankingProduct } from '@/types/api';
import { useFetchState } from '@/hooks/useFetchState';
import { useOrderForm } from '@/hooks/useOrderForm';
import { Loading, ErrorMessage } from '@/components';
import OrderTemplate from './template';

const Order = () => {
  const { productId } = useParams<{ productId: string }>();
  const { fetchState, setLoading, setSuccess, setError } = useFetchState<RankingProduct>(true);

  useEffect(() => {
    if (!productId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const productData = await getProductById(parseInt(productId));
        setSuccess(productData);
      } catch (error) {
        setError();
      }
    };

    fetchProduct();
  }, [productId]);

  const {
    cardState,
    formData,
    errors,
    selectedCard,
    handleCardClick,
    handleMessageChange,
    handleSenderNameChange,
    handleOrder,
  } = useOrderForm({ product: fetchState.data || undefined });

  if (fetchState.isLoading) {
    return <Loading height="100vh" />;
  }

  if (fetchState.isError) {
    return <ErrorMessage height="100vh" message="Error loading product." />;
  }

  if (!fetchState.data) {
    return null;
  }

  return (
    <OrderTemplate
      orders={orders}
      cardState={cardState}
      selectedCard={selectedCard}
      onCardClick={handleCardClick}
      onMessageChange={handleMessageChange}
      formData={formData}
      onSenderNameChange={handleSenderNameChange}
      errors={errors}
      product={fetchState.data}
      onSubmit={handleOrder}
    />
  );
};

export default Order;
