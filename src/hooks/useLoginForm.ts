import { useForm } from 'react-hook-form';
import { getEmailError, getPasswordError } from '@/utils/validators';

export interface LoginFormValues {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const {
    register,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const values = watch();

  const email = {
    value: values.email,
    error: errors.email?.message || '',
    register: register('email', {
      validate: value => {
        const error = getEmailError(value);
        return error === '' ? true : error;
      },
    }),
    validate: () => trigger('email'),
  };

  const password = {
    value: values.password,
    error: errors.password?.message || '',
    register: register('password', {
      validate: value => {
        const error = getPasswordError(value);
        return error === '' ? true : error;
      },
    }),
    validate: () => trigger('password'),
  };

  return {
    email,
    password,
    isValid,
  };
};

export default useLoginForm;
