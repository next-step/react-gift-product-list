import SectionTitle from '@/components/SectionTitle';
import TextInputBox from '@/components/TextInputBox';
import { useFormContext } from 'react-hook-form';

const ReceiverInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <SectionTitle title="받는 사람" />
      <TextInputBox
        title="이름"
        placeholder="이름을 입력하세요"
        {...register('receiverName')}
        errorMessage={errors.receiverName?.message as string | undefined}
      />
      <TextInputBox
        title="전화번호"
        placeholder="전화번호를 입력하세요"
        {...register('receiverPhone')}
        errorMessage={errors.receiverPhone?.message as string | undefined}
      />
      <TextInputBox
        title="수량"
        placeholder="1"
        {...register('quantity')}
        errorMessage={errors.quantity?.message as string | undefined}
      />
    </div>
  );
};

export default ReceiverInfo;
