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
  return (
    <div>
      <SectionTitle title="받는 사람" />
      <TextInputBox
        title="이름"
        placeholder="이름을 입력하세요"
        value={receiverName}
        onChange={onChangeReceiverName}
      />
      <TextInputBox
        title="전화번호"
        placeholder="전화번호를 입력하세요"
        value={receiverPhone}
        onChange={onChangeReceiverPhone}
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
      />
    </div>
  );
};

export default ReceiverInfo;
