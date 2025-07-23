import { type MultiOrderFormData } from '@schemas/orderSchema';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export interface FormSectionProps {
  register: UseFormRegister<MultiOrderFormData>;
  errors: FieldErrors<MultiOrderFormData>;
  setValue?: UseFormSetValue<MultiOrderFormData>;
}

export interface ProductSummaryInfo {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}
