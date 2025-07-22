
import { PriceButton } from './OrderButton.style';
import { useFormContext } from 'react-hook-form';
import useOrderSubmit from '@/hooks/order/useOrderSubmit';

interface Props {
  product: { id: number; name: string; price: number };
  loading: boolean;
  error: unknown;
  count: number;
  receiverForm: {
    submittedRef: React.MutableRefObject<{ name: string; phone: string; count: number }[] | null>;
  };
}

export default function OrderButton({ product, loading, error, count, receiverForm }: Props) {
  const { handleSubmit } = useFormContext();

  if (error) return null;
  if (!product) return <div>상품 정보가 없습니다.</div>;

  const price = product.price * count;
  const onSubmit = useOrderSubmit({ product, count, receiverRef: receiverForm.submittedRef });

  return loading ? (
    <div>상품 정보를 불러올 수 없습니다.</div>
  ) : (
    <PriceButton onClick={handleSubmit(onSubmit)}>{price}원 주문하기</PriceButton>
  );
}
