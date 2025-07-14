import { ReceiverCard } from '@/components';
import { useReceiverForm } from '@/hooks/useReceiverForm';
import * as S from './styles';
import { formField } from '@/data/formField';

interface ReceiverFormProps {
  formHook: ReturnType<typeof useReceiverForm>;
}

const createFormFields = (
  index: number,
  register: ReturnType<typeof useReceiverForm>['register'],
  errors: ReturnType<typeof useReceiverForm>['formState']['errors']
) => formField.map(template => ({
  label: template.label,
  placeholder: template.placeholder,
  registerProps: register(`receivers.${index}.${template.field}`, template.registerOptions),
  type: template.type,
  error: errors.receivers?.[index]?.[template.field]?.message,
}));

const ReceiverForm = ({ formHook }: ReceiverFormProps) => {
  const { register, fields, remove, formState: { errors } } = formHook;

  return (
    <S.Container>
      <S.FormContent>
        {fields.map((field, index) => {
          const formFields = createFormFields(index, register, errors);

          return (
            <ReceiverCard
              key={field.id}
              index={index}
              formFields={formFields}
              onRemove={remove}
            />
          );
        })}
      </S.FormContent>
    </S.Container>
  );
};

export default ReceiverForm; 