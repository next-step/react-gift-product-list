import { useForm } from 'react-hook-form';

export interface LoginFormInputs {
  id: string;
  password: string;
}

export const useLoginForm = () => {
  return useForm<LoginFormInputs>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      password: '',
    },
  });
};
