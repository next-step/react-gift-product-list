import SectionTitle from '@/components/SectionTitle';
import TextInputBox from '@/components/TextInputBox';

interface SenderInfoProps {
  senderName: string;
  onChangeSenderName: (value: string) => void;
}

const SenderInfo = ({ senderName, onChangeSenderName }: SenderInfoProps) => {
  return (
    <div>
      <SectionTitle title="보내는 사람" />
      <TextInputBox
        placeholder="이름을 입력하세요"
        value={senderName}
        onChange={onChangeSenderName}
      />
    </div>
  );
};

export default SenderInfo;
