import { useEffect } from 'react';
import { useReceiverForm } from '@/hooks/useReceiverForm';
import { ReceiverForm } from '@/components';
import * as S from './styles';

interface ReceiverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReceiverModal = ({
  isOpen,
  onClose,
}: ReceiverModalProps) => {
  const formHook = useReceiverForm();
  const { addReceiver, canAddMore, fields, handleSubmit } = formHook;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Header>
          <S.Title>받는 사람</S.Title>
          <S.Description>
            * 최대 10명까지 추가 할 수 있어요.<br />
            * 받는 사람의 전화번호를 중복으로 입력할 수 없어요.
          </S.Description>
          <S.AddButton 
            onClick={addReceiver}
            disabled={!canAddMore}
          >
            추가하기
          </S.AddButton>
        </S.Header>
        <S.ContentArea>
          <ReceiverForm formHook={formHook} />
        </S.ContentArea>
        <S.ButtonArea>
          <S.CancelButton onClick={onClose}>
            취소
          </S.CancelButton>
          <S.CompleteButton onClick={() => handleSubmit(onClose)}>
            {fields.length}명 완료
          </S.CompleteButton>
        </S.ButtonArea>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ReceiverModal;
