import type { MultiOrderFormData } from '@schemas/orderSchema';
import type { FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';

const useOrderInvalid = () => {
  return (errors: FieldErrors<MultiOrderFormData>) => {
    if (errors.recipients) {
      if ('message' in errors.recipients) {
        toast.error(errors.recipients.message);
      } else if (
        'root' in errors.recipients &&
        errors.recipients.root?.message
      ) {
        toast.error(errors.recipients.root.message);
      }
    }
  };
};

export default useOrderInvalid;
