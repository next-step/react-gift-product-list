import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orders } from '@/data/orders';
import { getProductSummary } from '@/lib/api/rankingProducts';
import { type ProductSummary, type AxiosErrorResponse } from '@/types/api';
import { useFetchState } from '@/hooks/useFetchState';
import { useOrderForm } from '@/hooks/useOrderForm';
import { Loading, ErrorMessage } from '@/components';
import OrderTemplate from './template';

const Order = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { fetchState, setLoading, setSuccess, setError } = useFetchState<ProductSummary | undefined>(undefined, true);

  useEffect(() => {
    if (!productId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const productData = await getProductSummary(parseInt(productId));
        setSuccess(productData);
      } catch (error: unknown) {
        const axiosError = error as AxiosErrorResponse;
        
        if (axiosError?.response) {
          const status = axiosError.response.status;
          const message = axiosError.response.data?.data?.message;

          switch (status) {
            case 400:
              toast.error(message || '현재 없는 상품입니다');
              navigate('/');
              return;
            default:
              setError();
              return;
          }
        } else {
          setError();
        }
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const {
    cardState,
    formData,
    errors,
    selectedCard,
    handleCardClick,
    handleMessageChange,
    handleSenderNameChange,
    handleOrder,
  } = useOrderForm({ product: fetchState.data });

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
