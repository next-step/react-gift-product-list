import { useForm } from 'react-hook-form';

export interface LoginState {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginState>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const values = watch();

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    values,
  };
}
