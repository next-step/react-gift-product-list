import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

import ReceiverInfo from '@/components/order/ReceiverInfo';
import { fetchProductSummary } from '@/api/productApi';

import type { Receiver } from '@/types/receiver';
import type { ProductSummary } from '@/types/product';

import {
  Wrapper,
  Section,
  Label,
  InputBox,
  StyledInput,
  StyledTextarea,
  ErrorMsg,
  HelperText,
  ProductInfo,
  ProductImage,
  ProductDetails,
  OrderButton,
} from '@/components/order/Order.style';

interface GiftFormValues {
  sender: string;
  message: string;
}

interface GiftSenderProps {
  templateMessage: string;
}

const GiftForm = ({ templateMessage }: GiftSenderProps) => {

  const navigate = useNavigate();
  const location = useLocation();
  const giftId = location.state?.id;

  const [receiverList, setReceiverList] = useState<Receiver[]>([]);
  const [productInfo, setProductInfo] = useState<ProductSummary | null>(null);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GiftFormValues>({
    defaultValues: {
      sender: user?.name || '', 
      message: templateMessage ?? '',
    },
  });

  useEffect(() => {
    setValue('message', templateMessage);
    if (user?.name) {
      setValue('sender', user.name); 
    }
  }, [templateMessage, user?.name, setValue]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!giftId) return;
      try {
        const res = await fetchProductSummary(giftId);
        setProductInfo(res.data.data);
      } catch (err) {
        console.error('상품 정보 가져오기 실패:', err);
        toast.error('존재하지 않는 상품입니다.');
        navigate('/');
      }
    };
    loadProduct();
  }, [giftId, navigate]);

  const validateReceivers = () => {
    if (receiverList.length === 0) {
      alert('최소 1명의 받는 사람을 등록해주세요.');
      return false;
    }

    const phoneSet = new Set<string>();
    for (let i = 0; i < receiverList.length; i++) {
      const r = receiverList[i];

      if (!r.name.trim()) {
        alert(`${i + 1}번 받는 사람 이름을 입력해주세요.`);
        return false;
      }

      if (!/^010\d{8}$/.test(r.phone)) {
        alert(`${i + 1}번 전화번호는 01012345678 형식이어야 합니다.`);
        return false;
      }

      if (phoneSet.has(r.phone)) {
        alert(`${i + 1}번 전화번호가 중복됩니다.`);
        return false;
      }

      phoneSet.add(r.phone);

      if (r.quantity < 1) {
        alert(`${i + 1}번 수량은 1 이상이어야 합니다.`);
        return false;
      }
    }

    return true;
  };

  const onSubmit = (data: GiftFormValues) => {
    if (!validateReceivers()) return;

    alert(
      `주문이 완료되었습니다.
상품명: ${productInfo?.name}
받는 사람 수: ${receiverList.length}
발신자 이름: ${data.sender}
메시지: ${data.message}`
    );
    navigate('/');
  };

  if (!productInfo) return <div>상품 정보를 불러오는 중입니다...</div>;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <Label>메시지</Label>
          <InputBox>
            <StyledTextarea
              placeholder="메시지를 입력하세요"
              {...register('message', {
                required: '메시지는 반드시 입력 되어야 해요.',
              })}
              error={!!errors.message}
            />
            {errors.message && <ErrorMsg>{errors.message.message}</ErrorMsg>}
          </InputBox>
        </Section>

        <Section>
          <Label>보내는 사람</Label>
          <InputBox>
            <StyledInput
              type="text"
              placeholder="이름을 입력하세요."
              {...register('sender', {
                required: '보내는 사람 이름이 반드시 입력 되어야 해요.',
              })}
              error={!!errors.sender}
            />
            {errors.sender && <ErrorMsg>{errors.sender.message}</ErrorMsg>}
            <HelperText>* 실제 선물 발송 시 발신자 이름으로 반영됩니다.</HelperText>
          </InputBox>
        </Section>

        <Section>
          <Label>받는 사람</Label>
          <ReceiverInfo receivers={receiverList} onUpdate={setReceiverList} />
        </Section>

        <Section>
          <Label>상품 정보</Label>
          <ProductInfo>
            <ProductImage src={productInfo.imageURL} alt={productInfo.name} />
            <ProductDetails>
              <strong>{productInfo.name}</strong>
              <span>{productInfo.brandInfo.name}</span>
              <b>상품가 {productInfo.price.sellingPrice.toLocaleString()}원</b>
            </ProductDetails>
          </ProductInfo>
        </Section>

        <OrderButton type="submit">
          {productInfo.price.sellingPrice.toLocaleString()}원 주문하기
        </OrderButton>
      </form>
    </Wrapper>
  );
};

export default GiftForm;
