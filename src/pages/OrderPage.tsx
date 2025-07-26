import { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { LetterCardSelector } from '@/components/LetterCardSelector';
import { OrderForm, type OrderFormRef } from '@/components/OrderForm';
import { ProductInfo } from '@/components/ProductInfo';
import { cardTemplates } from '@/data/cardTemplateMock';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Button } from '@/components/common/Button';
import { useOrderStore } from '@/stores/orderStore';
import useAuthStore from '@/stores/authStore';
import { FieldSet, Legend } from '@/components/common/FieldSet';
import { VerticalSpacing } from '@/components/common/VerticalSpacing';
import { getProductSummary } from '@/services/product';
import { createOrder } from '@/services/order';
import type { Product } from '@/types/product';
import { Spinner } from '@/components/common/Spinner';

export default function OrderPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedCardId, setSelectedCardId] = useState(cardTemplates[0].id);
  const selectedCard = useMemo(
    () => cardTemplates.find(card => card.id === selectedCardId),
    [selectedCardId],
  );

  const formRef = useRef<OrderFormRef>(null);
  const { setReceivers } = useOrderStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductSummary(Number(productId));
        setProduct(productData);
        // console.log('Product State Updated:', productData);
      } catch {
        toast.error('제품 정보를 불러오는데 실패했습니다.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, navigate]);

  useEffect(() => {
    return () => {
      setReceivers([]);
    };
  }, [setReceivers]);

  if (loading) {
    return (
      <Container>
        <Spinner size="40px" borderWidth="4px" color="#000" />
      </Container>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  const handleSelectCard = (id: number) => {
    setSelectedCardId(id);
  };

  const handleOrderSubmit = async () => {
    if (!formRef.current || !selectedCard) return;

    const formData = formRef.current.getFormData();
    const receivers = useOrderStore.getState().receivers;

    if (receivers.length === 0) {
      toast.error('받는 사람을 추가해주세요.');
      return;
    }

    try {
      const mappedReceivers = receivers.map(receiver => ({
        name: receiver.receiverName,
        phoneNumber: receiver.phoneNumber,
        quantity: receiver.quantity,
      }));

      const orderPayload = {
        productId: product.id,
        ordererName: formData.senderName,
        message: formData.message,
        messageCardId: selectedCard.id.toString(),
        receivers: mappedReceivers,
      };

      console.log('Order Payload:', orderPayload); // 주문 정보 콘솔 출력

      await createOrder(orderPayload);
      toast.success('주문이 완료되었습니다.');
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        toast.error('로그인이 필요합니다.');
        navigate('/login');
      } else {
        toast.error('주문에 실패했습니다.');
      }
    }
  };

  return (
    <Container>
      <LetterCardContainer>
        <LetterCardSelector
          templates={cardTemplates}
          selectedId={selectedCardId}
          onSelect={handleSelectCard}
        />
      </LetterCardContainer>

      <VerticalSpacing size="12px" />

      {selectedCard && (
        <PreviewContainer>
          <Preview src={selectedCard.imageUrl} alt={`${selectedCard.id} preview`} />
        </PreviewContainer>
      )}

      <VerticalSpacing size="40px" />

      <OrderForm ref={formRef} selectedCard={selectedCard} userInfo={user ?? undefined} />

      <VerticalSpacing size="8px" backgroundColor="#f3f4f5" />

      <FieldSet>
        <Legend>상품 정보</Legend>
        <ProductInfo
          imgSrc={product.imageURL}
          productName={product.name}
          brandName={product.brandName}
          price={product.price.sellingPrice}
        />
      </FieldSet>

      <VerticalSpacing size="60px" />

      <OrderButton onClick={handleOrderSubmit}>주문하기</OrderButton>
    </Container>
  );
}

const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding-bottom: 80px;
`;

const LetterCardContainer = styled.header`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  padding: 6px 8px;
  overflow-x: scroll;
`;

const PreviewContainer = styled.div`
  width: 100%;
  max-width: 360px;
  aspect-ratio: 3/2;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OrderButton = styled(Button)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  border-radius: 0;
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  background-color: ${({ theme }) => theme.semanticColors.brand.kakaoYellow};
`;