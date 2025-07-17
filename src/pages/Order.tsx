import orderCard from '@/mocks/order_card.mock';
import NavBar from '@/components/NavBar';
import Layout from '@/components/Layout';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';


import { useState, useMemo } from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import SlidingCardSelector from '@/components/Order/SlidingCardSelector';
import CardView from '@/components/Order/CardView';
import SenderInputCompo from '@/components/Order/SenderInputCompo';
import ReceiverInputCompo from '@/components/Order/ReceiverInputCompo';
import ItemInfoCompo from '@/components/Order/ItemInfoCompo';
import Modal from '@/components/Order/Modal';

// 주문 버튼 시작
const OrderBtnWrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacing.spacing12};

  position: sticky;
  bottom: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;
`

const OrderButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  border: none;

  font-size: ${({ theme }) => theme.typography.body.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Bold.lineHeight};
  cursor: pointer;

  
`;



function Order() {
  const navigate = useNavigate();
  const [modalToggle, setModalToggle] = useState(false); // 모달의 상태를 나타내는 state

  type Receiver = {
    name: string;
    phone: string;
    count: number;
  };
  // 이 receiver객체들의 count를 다 합쳐서 쓸까?

  type OrderFormValues = {
    selectedId: number;
    message: string;
    senderName: string;
    receivers: Receiver[];
    allPrice: number;
  };

  const DEFAULT_CARD_ID = 904;
  const defaultMessage = useMemo(() => {
    return orderCard.find((c) => c.id === DEFAULT_CARD_ID)?.defaultTextMessage || '';
  }, []);
  // register는 필드를 useForm에 등록할때 사용
  // control은 useFieldArray 랑 연결할때 
  // handleSubmit은 폼 제출 처리할때(최종 전송할때 감싸서 사용
  // erros는 formState안에 있는 객체로 각 필드들의 에러 상태를 가지고있음
  // watch는 특정 필드의 현재 값을 구독해서 상태를 실시간으로 확인 가능
  // setValue 특정 필드의 값을 설정할때 사용
  const methods = useForm<OrderFormValues>({
    defaultValues: {
      selectedId: DEFAULT_CARD_ID,
      message: defaultMessage,
      senderName: '',
      receivers: [],
      allPrice: 0,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = methods;

  // useForm에서 가져온 control객체를 넘겨야 리액트 훅 폼과 연결됨
  // useForm의 defaultValues에 선언한 필드 이름과 맞춰줌
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receivers'
  });

  // 이전 페이지에서 상품정보 받아오는 코드
  const [searchParams] = useSearchParams();
  const brandInfo = searchParams.get('brandInfo');
  // const id = searchParams.get('id');
  const imageURL = searchParams.get('imageURL');
  const name = searchParams.get('name');
  const price = parseInt(String(searchParams.get('price')));

  // 최종 주문 핸들러
  function handleOrderClick() {
    const receivers = watch('receivers');
    const totalCount = receivers.reduce((sum, receivers) => sum + Number(receivers.count || 0), 0);
    alert(`주문이 완료되었습니다.\n상품명: ${name}\n구매 수량: ${totalCount}\n발신자 이름: ${watch('senderName')}\n메시지: ${watch('message')}
      `);
    navigate('/');
  }

  

  

  

  return (

    <Layout>
      <NavBar></NavBar>
      <FormProvider {...methods}>
        {/* 슬라이딩 카드 */}
        <SlidingCardSelector />
        {/* 카드뷰  */}
        <CardView />
        {/* 보내는 사람 */}
        <SenderInputCompo />
        {/* 받는사람 */}
        <ReceiverInputCompo setModalToggle={setModalToggle} fields={fields} />
        {/* 상품 정보 */}
        <ItemInfoCompo brandInfo={brandInfo} imageURL={imageURL} name={name} price={price} />
        {/* 주문 버튼 */}
        <OrderBtnWrapper>
          <OrderButton onClick={handleSubmit(handleOrderClick)}>
            {watch('allPrice')}원 주문하기
          </OrderButton>
        </OrderBtnWrapper>
        {/* --------------모달-------------- */}
        <Modal modalToggle={modalToggle} fields={fields} remove={remove} append={append} setModalToggle={setModalToggle} price={price}/>
      </FormProvider>
    </Layout>
  );
}

export default Order;



