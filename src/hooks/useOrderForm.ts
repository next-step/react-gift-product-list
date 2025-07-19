import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useReceiver } from '@/contexts/ReceiverContext';
import { useAuth } from '@/contexts/AuthContext';
import { z, string } from 'zod';
import { orders } from '@/data/orders';
import { createOrder } from '@/lib/api/order';
import { type OrderRequest, type AxiosErrorResponse } from '@/types/api';

import { type ProductSummary } from '@/types/api';
import { type TextAreaChangeHandler, type InputChangeHandler } from '@/components';

interface CardState {
  selectedCardId: number;
  message: string;
}

interface FormData {
  senderName: string;
}

interface ValidationErrors {
  message: string;
  senderName: string;
}

const orderValidationSchema = z.object({
  message: string().min(1, '메시지를 입력해주세요.'),
  senderName: string().min(1, '보내는 사람 이름을 입력해주세요.'),
});

interface UseOrderFormProps {
  product?: ProductSummary;
}

export const useOrderForm = ({ product }: UseOrderFormProps = {}) => {
  const navigate = useNavigate();
  const { receiverList } = useReceiver();
  const { userInfo } = useAuth();

  const [cardState, setCardState] = useState<CardState>({
    selectedCardId: orders[0]?.id || 904,
    message: orders[0]?.defaultTextMessage || '축하해요.',
  });

  const [formData, setFormData] = useState<FormData>({
    senderName: userInfo?.name || '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    message: '',
    senderName: '',
  });

  const selectedCard = useMemo(() => {
    return orders.find(order => order.id === cardState.selectedCardId);
  }, [cardState.selectedCardId]);

  const clearError = (field: keyof ValidationErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCardClick = (id: number) => {
    const card = orders.find(order => order.id === id);
    setCardState(prev => ({
      ...prev,
      selectedCardId: id,
      message: card?.defaultTextMessage || prev.message,
    }));
    clearError('message');
  };

  const handleMessageChange: TextAreaChangeHandler = (e) => {
    setCardState(prev => ({
      ...prev,
      message: e.target.value.trim(),
    }));
    clearError('message');
  };

  const handleSenderNameChange: InputChangeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      senderName: e.target.value.trim(),
    }));
    clearError('senderName');
  };

  const validateForm = (): boolean => {
    const result = orderValidationSchema.safeParse({
      message: cardState.message,
      senderName: formData.senderName,
    });

    if (!result.success) {
      const newErrors: ValidationErrors = {
        message: '',
        senderName: '',
      };

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ValidationErrors;
        newErrors[field] = issue.message;
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({ message: '', senderName: '' });
    return true;
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (!product) {
      alert('상품 정보를 불러올 수 없습니다.');
      return;
    }

    if (!userInfo?.authToken) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      const orderData: OrderRequest = {
        productId: product.id,
        message: cardState.message,
        messageCardId: cardState.selectedCardId.toString(),
        ordererName: formData.senderName,
        receivers: receiverList.map(receiver => ({
          name: receiver.name,
          phoneNumber: receiver.phone,
          quantity: receiver.quantity
        }))
      };

      await createOrder(orderData, userInfo.authToken);
      
      const totalQuantity = receiverList.reduce((sum, receiver) => sum + receiver.quantity, 0);
      const receiverNames = receiverList.map(receiver => receiver.name).join(', ');
      
      const orderInfo = `주문이 완료되었습니다.

상품명: ${product.name}
구매수량: ${totalQuantity}개
발신자이름: ${formData.senderName}
받는사람: ${receiverNames}
메시지: ${cardState.message}`;

      alert(orderInfo);
      navigate('/');
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse;
      
      if (axiosError?.response) {
        const status = axiosError.response.status;
        const message = axiosError.response.data?.data?.message;
        
        switch (status) {
          case 401:
            toast.error(message || '로그인이 필요합니다.');
            navigate('/login');
            return;
          case 400:
            toast.error(message || '유효성 검사에 실패했습니다.');
            return;
          default:
            toast.error('주문에 실패했습니다. 다시 시도해주세요.');
            return;
        }
      } else {
        toast.error('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return {
    cardState,
    formData,
    errors,
    selectedCard,
    handleCardClick,
    handleMessageChange,
    handleSenderNameChange,
    handleOrder,
  };
}; 