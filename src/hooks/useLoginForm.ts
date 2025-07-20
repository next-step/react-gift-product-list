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
    rules: {
      id: {
        required: '이메일을 입력해주세요.',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@kakao\.com$/,
          message: '@kakao.com 이메일 주소만 가능합니다.',
        },
      },
      password: {
        required: '비밀번호를 입력해주세요.',
        minLength: {
          value: 8,
          message: '비밀번호는 8자 이상이어야 합니다.',
        },
      },
    },
  });
};
