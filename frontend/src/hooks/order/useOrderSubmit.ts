import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserInfo } from '@/storage/userInfo';
import { PATH } from '@/constants/path';
import order from '@/api/order';
import { renderOrderSuccessToast } from '@/utils/toastContents';
import type { OrderRequest } from '@/api/order';

interface UseOrderSubmitParams {
  product: { id: number; name: string; price: number };
  count: number;
  receiverRef: React.MutableRefObject<{ name: string; phone: string; count: number }[] | null>;
}

export default function useOrderSubmit({ product, count, receiverRef }: UseOrderSubmitParams) {
  const navigate = useNavigate();

  return async (data: any) => {
    const userInfo = getUserInfo();
    const token = userInfo?.authToken;

    if (!token) {
      toast.error('로그인이 필요합니다.');
      navigate(PATH.LOGIN);
      return;
    }

    if (!receiverRef.current || receiverRef.current.length === 0) {
      toast.error('받는 사람 정보를 입력해주세요.');
      return;
    }

    const { textMessage, senderName, messageCardId } = data;

    const orderData: OrderRequest = {
      productId: product.id,
      message: textMessage,
      messageCardId: String(messageCardId),
      ordererName: senderName,
      receivers: receiverRef.current.map(({ name, phone, count }) => ({
        name,
        phoneNumber: phone,
        quantity: Number(count),
      })),
    };

    try {
      const result = await order(orderData);
      if (result.data?.success) {
        toast(renderOrderSuccessToast(product.name, count, senderName, textMessage), {
          type: 'success',
          autoClose: 3000,
          style: { width: '400px' },
        });
        navigate(PATH.HOME);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '주문 중 오류가 발생했습니다.');
    }
  };
}
