/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  containerStyle,
  cardSelectorStyle,
  thumbListStyle,
  thumbStyle,
  selectedThumbStyle,
  selectedImageStyle,
  messageInputStyle,
  titleStyle,
  formGroupStyle,
  productInfoStyle,
  productImageStyle,
  orderButtonStyle,
  sectionStyle,
  helperTextStyle,
  errorInputStyle,
  errorMessageStyle,
} from './styles/OrderPage.style';
import AddReceiverModal from './components/AddReceiverModal';
import ReceiverTable from './components/ReceiverTable';
import EmptyReceiverBox from './components/EmptyReceiverBox';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cardTemplates } from '../../data/cardTemplates';
import 'react-toastify/dist/ReactToastify.css';
import { UserManagement } from '../Login/contexts/UserManagement';

import {
  fetchProductSummary,
  type ProductSummary,
} from '../../apis/product_summary';
import { postOrder } from '../../apis/orders';
import axios from 'axios';

const OrderPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { user } = UserManagement();
  const authToken = user?.authToken || '';

  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [selectedCard, setSelectedCard] = useState(cardTemplates[0]);
  const [receivers, setReceivers] = useState<
    { name: string; phone: string; quantity: number }[]
  >([]);
  const [isAddReceiverModalOpen, setIsAddReceiverModalOpen] = useState(false);

  const totalQuantity = receivers.reduce((sum, r) => sum + r.quantity, 0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: user?.name || '',
      message: cardTemplates[0].defaultTextMessage,
    },
  });

  useEffect(() => {
    if (!productId) {
      toast.error('잘못된 접근입니다.');
      navigate('/');
      return;
    }

    fetchProductSummary(productId, authToken)
      .then(setProduct)
      .catch((error) => {
        toast.error(error.message);
        navigate('/');
      });
  }, [productId, authToken, navigate]);

  const handleCardSelect = (card: typeof selectedCard) => {
    setSelectedCard(card);
    setValue('message', card.defaultTextMessage);
  };

  const onSubmit = async (data: { senderName: string; message: string }) => {
    if (receivers.length === 0) {
      toast.error('받는 사람이 없습니다.');
      return;
    }

    if (totalQuantity < 1) {
      toast.error('수량 합계가 1개 이상이어야 합니다.');
      return;
    }

    const orderData = {
      productId: Number(productId),
      message: data.message,
      messageCardId: String(selectedCard?.id),
      ordererName: data.senderName,
      receivers: receivers.map(({ name, phone, quantity }) => ({
        name,
        phoneNumber: phone,
        quantity,
      })),
    };

    // console.log('주문 요청 데이터:', orderData);

    try {
      await postOrder(orderData, authToken);
      if (!product) {
        toast.error('상품 정보를 불러오지 못했습니다.');
        return;
      }
      alert(
        `주문이 완료되었습니다.\n상품명: ${product.name}\n총 구매 수량: ${totalQuantity}\n발신자 이름: ${data.senderName}\n메시지: ${data.message}\n받는 사람 수: ${receivers.length}`
      );
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || '주문에 실패했습니다.';

        if (status === 401) {
          toast.error('로그인이 필요합니다.');
          navigate('/login');
        } else {
          toast.error(message);
        }
      } else {
        console.error('주문 실패 에러:', error);
        toast.error('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  if (!product) {
    return <div>제품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div css={containerStyle(theme)}>
      <div css={cardSelectorStyle(theme)}>
        <div css={thumbListStyle(theme)}>
          {cardTemplates.map((card) => (
            <img
              key={card.id}
              src={card.thumbUrl}
              alt="thumb"
              css={[
                thumbStyle(theme),
                card.id === selectedCard.id && selectedThumbStyle(theme),
              ]}
              onClick={() => handleCardSelect(card)}
            />
          ))}
        </div>
        <img
          src={selectedCard.imageUrl}
          alt="selected"
          css={selectedImageStyle(theme)}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('message', { required: '메시지를 입력해주세요.' })}
          placeholder="메시지를 입력해주세요."
          css={[messageInputStyle(theme), errors.message && errorInputStyle]}
        />
        {errors.message && (
          <p css={errorMessageStyle}>{errors.message.message}</p>
        )}

        <div css={sectionStyle(theme)}>
          <div css={formGroupStyle(theme)}>
            <label>보내는 사람</label>
            <div>
              <input
                {...register('senderName', {
                  required: '이름을 입력해주세요.',
                })}
                placeholder="이름을 입력하세요."
                css={errors.senderName ? errorInputStyle : undefined}
              />
              {errors.senderName && (
                <p css={errorMessageStyle}>{errors.senderName.message}</p>
              )}
            </div>
            <p css={helperTextStyle(theme)}>
              * 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.
            </p>
          </div>
        </div>

        <div css={sectionStyle(theme)}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <label>받는 사람</label>
            <button
              type="button"
              onClick={() => setIsAddReceiverModalOpen(true)}
              style={{
                background: theme.color.gray.gray300,
                color: theme.color.gray.gray1000,
                padding: '6px 12px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {receivers.length === 0 ? '+ 추가' : '수정'}
            </button>
          </div>

          {receivers.length === 0 ? (
            <EmptyReceiverBox />
          ) : (
            <ReceiverTable receivers={receivers} />
          )}
        </div>

        <div css={sectionStyle(theme)}>
          <h2 css={titleStyle(theme)}>상품 정보</h2>
          <div css={productInfoStyle(theme)}>
            <img
              src={product.imageURL}
              alt="상품"
              css={productImageStyle(theme)}
            />
            <div>
              <p>
                {product.name} / {product.brandName}
              </p>
              <strong>{product.price.toLocaleString()}원</strong>
            </div>
          </div>
        </div>

        <button css={orderButtonStyle(theme)} type="submit">
          {(product.price * totalQuantity).toLocaleString()}원 주문하기
        </button>
      </form>

      {isAddReceiverModalOpen && (
        <AddReceiverModal
          onClose={() => setIsAddReceiverModalOpen(false)}
          onComplete={(newReceivers) => {
            setReceivers(newReceivers);
            setIsAddReceiverModalOpen(false);
          }}
          initialReceivers={receivers}
        />
      )}
    </div>
  );
};

export default OrderPage;
