import styled from '@emotion/styled';
import Card from '@/components/OrderForm/Card';
import { Sender } from '@/components/OrderForm/Sender';
import { Recipient } from '@/components/OrderForm/Recipient';
import { ProductInfo } from '@/components/OrderForm/ProductInfo';
import { OrderButton } from '@/components/OrderForm/OrderButton';
import { MOCK_CARDFORM_LIST } from '@/components/OrderForm/mock';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/Routes';
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { getProductSummary, postOrder } from '@/Api/api';
import { toast } from 'react-toastify';
import { AuthContext } from '@/contexts/AuthContext';

const Wrapper = styled.section(({ theme }) => ({
  width: '100%',
  paddingBottom: '3.125rem',
  backgroundColor: theme.semanticColors.background.default,
}));

const Margin = styled.div<{ height: string }>(({ theme, height }) => ({
  width: '100%',
  height: height,
  backgroundColor: theme.semanticColors.background.fill,
}));

// 폼 전체 값 타입
interface RecipientItem {
  name: string;
  phone: string;
  quantity: number;
}
export interface OrderFormValues {
  message: string;
  sender: string;
  recipients: RecipientItem[];
}

const OrderForm = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('productId'));
  const [selectedProduct, setSelectedProduct] = useState<{
    imageURL: string;
    name: string;
    price: { sellingPrice: number };
    brandInfo: { name: string };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageCardId, setMessageCardId] = useState<string>(String(MOCK_CARDFORM_LIST[0].id));

  useEffect(() => {
    if (!productId) {
      setSelectedProduct(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getProductSummary(productId)
      .then((d) => {
        setSelectedProduct({
          imageURL: d.imageURL,
          name: d.name,
          price: { sellingPrice: d.price },
          brandInfo: { name: d.brandName },
        });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message ?? '상품 정보를 불러오지 못했어요.');
        navigate(ROUTE_PATH.HOME);
      })
      .finally(() => setLoading(false));
  }, [productId, navigate]);

  const methods = useForm<OrderFormValues>({
    defaultValues: {
      message: MOCK_CARDFORM_LIST[0].defaultTextMessage || '',
      sender: user?.name ?? '',
      recipients: [],
    },
    mode: 'onBlur',
  });

  const { setValue } = methods;

  useEffect(() => {
    if (user?.name) {
      setValue('sender', user.name, { shouldDirty: false });
    }
  }, [user, setValue]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: OrderFormValues) => {
    if (data.recipients.length === 0) {
      toast.error('받는 사람을 한 명 이상 추가해 주세요.');
      return;
    }
    if (!selectedProduct) {
      toast.error('상품 정보를 불러오지 못했습니다.');
      return;
    }
    const totalQty = data.recipients.reduce((s, r) => s + r.quantity, 0);

    // navigate(ROUTE_PATH.HOME);

    try {
      await postOrder({
        productId,
        message: data.message,
        messageCardId,
        ordererName: data.sender,
        receivers: data.recipients.map((r) => ({
          name: r.name,
          phoneNumber: r.phone,
          quantity: r.quantity,
        })),
      });
      alert(
        `주문 완료!\n` +
          `상품명: ${selectedProduct.name}\n` +
          `구매 수량: ${totalQty}\n` +
          `발신자 이름: ${user?.name}\n` +
          `메시지: ${messageCardId}`
      );
      navigate(ROUTE_PATH.HOME);
    } catch (e: any) {
      if (e.response?.status === 401) {
        toast.error('로그인이 필요합니다.');
        navigate('/login');
        return;
      }
      toast.error(e.response?.data?.message ?? '주문 요청 실패');
    }
  };

  const recipients = useWatch({ control: methods.control, name: 'recipients' });
  const totalQuantity = recipients.reduce((sum, r) => sum + (r.quantity ?? 0), 0);
  const totalPrice = selectedProduct?.price.sellingPrice
    ? selectedProduct.price.sellingPrice * totalQuantity
    : 0;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          {/* 메시지 카드 */}
          <Controller
            name="message"
            control={control}
            rules={{ required: '메시지를 입력해주세요' }}
            render={({ field }) => (
              <Card
                message={field.value}
                onMessageChange={field.onChange}
                messageError={errors.message?.message}
                onCardChange={(id) => setMessageCardId(String(id))}
              />
            )}
          />
          <Margin height="8px" />

          {/* 발신자 입력 */}
          <Controller
            name="sender"
            control={control}
            rules={{ required: '이름을 입력해주세요' }}
            render={({ field }) => (
              <Sender
                value={field.value}
                onChange={field.onChange}
                error={errors.sender?.message}
              />
            )}
          />
          <Margin height="8px" />

          {/* 받는 사람 (모달) */}
          <Recipient />

          <Margin height="8px" />
          <ProductInfo product={selectedProduct} />
          <OrderButton type="submit" totalPrice={totalPrice} />
        </Wrapper>
      </form>
    </FormProvider>
  );
};

export default OrderForm;
