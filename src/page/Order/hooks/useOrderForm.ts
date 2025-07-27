import { useNavigate, useParams } from 'react-router-dom';
import useRanking from './useRnaking';
import { useUserInfo } from '@/contexts/UserInfoContext';
import type { OrderInfoValues } from '..';
import { toast } from 'react-toastify';
import postOrderInfo from '../utils/postOrderInfo';
import { ROUTES } from '@/routes/Routes';
import { useForm } from 'react-hook-form';

const useOrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { productSummaryData } = useRanking(id as string);
  const { userInfo } = useUserInfo();
  const orderForm = useForm<OrderInfoValues>({
    defaultValues: { message: '축하해요.', name: userInfo.name, receiverInfos: [] },
  });
  const orderData = orderForm.getValues();
  const price = orderData.receiverInfos.length * (productSummaryData?.price || 0);

  const onSubmit = async () => {
    if (!id) return;
    if (orderData.receiverInfos.length === 0) {
      toast('받는 사람이 없습니다');
      return;
    }

    const isSuccess = await postOrderInfo({
      orderData,
      navigate,
      id,
    });

    if (isSuccess) {
      alert(`
      주문이 완료되었습니다.
      상품명: ${productSummaryData?.name}
      구매 수량: ${orderData.receiverInfos.length}
      발신자 이름: ${orderData.name}
      메시지: ${orderData.message}`);
      navigate(ROUTES.HOME);
    }
  };

  return { orderForm, onSubmit, price, productSummaryData };
};

export default useOrderForm;
