import type { MultiOrderFormData } from '@schemas/orderSchema';
import postRequest from '@apis/postRequest';
import { useAuth } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { ProductSummaryInfo } from '../OrderTypes';

interface OrderResponse {
  success: boolean;
}

const useOrderSubmit = (productInfo: ProductSummaryInfo | null) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return async (formData: MultiOrderFormData) => {
    const { message, sender, recipients, messageCardId } = formData;

    const requestBody = {
      productId: productInfo?.id,
      message,
      messageCardId,
      ordererName: sender,
      receivers: recipients.map((r) => ({
        name: r.receiver,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    };

    const { success, error, status } = await postRequest<OrderResponse>(
      '/order',
      requestBody,
      {
        headers: {
          Authorization: user?.authToken || '',
        },
      }
    );

    if (success) {
      toast.success('주문 완료', {
        autoClose: 1000,
        onClose: () => navigate('/'),
      });
    } else {
      if (status == 401) {
        toast.error(error, {
          autoClose: 1000,
          onClose: () => navigate('/login'),
        });
      } else {
        toast.error(error);
      }
    }
  };
};

export default useOrderSubmit;
