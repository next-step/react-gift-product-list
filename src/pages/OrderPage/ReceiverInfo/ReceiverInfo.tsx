import SectionTitle from '@/components/SectionTitle';
import TextInputBox from '@/components/TextInputBox';

interface ReceiverInfoProps {
  receiverName: string;
  onChangeReceiverName: (value: string) => void;
  receiverPhone: string;
  onChangeReceiverPhone: (value: string) => void;
  quantity: string;
  onChangeQuantity: (value: string) => void;
}

const ReceiverInfo = ({
  receiverName,
  onChangeReceiverName,
  receiverPhone,
  onChangeReceiverPhone,
  quantity,
  onChangeQuantity,
}: ReceiverInfoProps) => {
  //유효성
  const receiverNameError =
    receiverName.trim() === '' ? '받는 사람 이름이 반드시 입력 되어야 해요.' : '';

  const receiverPhoneError =
    receiverPhone.trim() === ''
      ? '받는 사람 전화번호가 반드시 입력되어야 해요.'
      : !/^010\d{8}$/.test(receiverPhone)
        ? '전화번호는 01012341234 형식으로 입력해 주세요.'
        : '';

  const quantityError =
    quantity.trim() === '' || parseInt(quantity, 10) < 1 ? '수량은 1개 이상이어야 해요.' : '';

  return (
    <div>
      <SectionTitle title="받는 사람" />
      <TextInputBox
        title="이름"
        placeholder="이름을 입력하세요"
        value={receiverName}
        onChange={onChangeReceiverName}
        errorMessage={receiverNameError}
      />
      <TextInputBox
        title="전화번호"
        placeholder="전화번호를 입력하세요"
        value={receiverPhone}
        onChange={onChangeReceiverPhone}
        errorMessage={receiverPhoneError}
      />
      <TextInputBox
        title="수량"
        placeholder="1"
        value={quantity}
        onChange={(value) => {
          if (/^\d*$/.test(value)) {
            onChangeQuantity(value);
          }
        }}
        errorMessage={quantityError}
      />
    </div>
  );
};

export default ReceiverInfo;
