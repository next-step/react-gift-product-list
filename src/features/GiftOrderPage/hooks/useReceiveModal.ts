import { useModal } from '@contexts/ModalContext';
import type { MultiOrderFormData } from '@schemas/orderSchema';
import { useState } from 'react';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface UseReceiveModalResult {
  isReceiveModalOpen: boolean;
  openReceiveModal: () => void;
  closeReceiveModal: () => void;
}

const useReceiveModal = (
  watch: UseFormWatch<MultiOrderFormData>,
  setValue: UseFormSetValue<MultiOrderFormData>
): UseReceiveModalResult => {
  const [prevRecipients, setPrevRecipients] = useState<
    MultiOrderFormData['recipients']
  >([]);
  const {
    isReceiveModalOpen,
    openReceiveModal: openModal,
    closeReceiveModal: closeModal,
  } = useModal();

  const openReceiveModal = () => {
    const currentRecipients = watch('recipients') ?? [];
    const deepCopied = JSON.parse(JSON.stringify(currentRecipients));
    setPrevRecipients(deepCopied);
    openModal();
  };

  const closeReceiveModal = () => {
    setValue('recipients', prevRecipients);
    closeModal();
  };

  return { isReceiveModalOpen, openReceiveModal, closeReceiveModal };
};

export default useReceiveModal;
