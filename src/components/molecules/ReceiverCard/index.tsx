import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { IconButton, InputField } from '@/components';
import type { InputType } from '@/components/atoms/Input';
import { X } from 'lucide-react';
import * as S from './styles';

interface FormField {
  label: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  type: InputType;
  error?: string;
}

interface ReceiverCardProps {
  index: number;
  formFields: FormField[];
  onRemove: (index: number) => void;
}

const ReceiverCard = ({ index, formFields, onRemove }: ReceiverCardProps) => {
  return (
    <S.ReceiverCard>
      <S.ReceiverHeader>
        <S.ReceiverTitle>받는 사람 {index + 1}</S.ReceiverTitle>
        <IconButton onClick={() => onRemove(index)}>
          <X />
        </IconButton>
      </S.ReceiverHeader>
      <S.ReceiverContent>
        {formFields.map((formField, fieldIndex) => (
          <React.Fragment key={formField.label}>
            <InputField
              label={formField.label}
              placeholder={formField.placeholder}
              {...formField.registerProps}
              type={formField.type}
              labelMinWidth="3.75rem"
              layout="horizontal"
              error={formField.error}
            />
            {fieldIndex < formFields.length - 1 && <S.FormSpacer />}
          </React.Fragment>
        ))}
      </S.ReceiverContent>
    </S.ReceiverCard>
  );
};

export default ReceiverCard;
