import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orders } from '@/data/orders';
import { getProductById } from '@/lib/api';
import { type RankingProduct } from '@/types/api';
import { useOrderForm } from '@/hooks/useOrderForm';
import OrderTemplate from './template';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

const Order = () => {
  const { productId } = useParams<{ productId: string }>();
  const [fetchState, setFetchState] = useState<FetchState<RankingProduct>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    if (!productId) {
      setFetchState({
        isLoading: false,
        isError: false,
        data: null,
      });
      return;
    }

    const fetchProduct = async () => {
      try {
        setFetchState(prev => ({ ...prev, isLoading: true }));
        const productData = await getProductById(parseInt(productId));
        setFetchState({
          isLoading: false,
          isError: false,
          data: productData,
        });
      } catch (error) {
        setFetchState({
          isLoading: false,
          isError: true,
          data: null,
        });
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
    return <div>Loading...</div>;
  }

  if (fetchState.isError) {
    return <div>Error loading product.</div>;
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
      product={fetchState.data || undefined}
      onSubmit={handleOrder}
    />
  );
};

export default Order;
