import { useInput } from '@/hooks/useInput';
import { validateEmail, validatePassword } from '@/utils/validation';
import type React from 'react';

export function useLoginForm() {
  const {
    value: email,
    error: emailError,
    bind: emailBind,
    validate: validateEmailValue,
  } = useInput({
    validator: validateEmail,
  });

  const {
    value: password,
    error: passwordError,
    bind: passwordBind,
    validate: validatePasswordValue,
  } = useInput({
    validator: validatePassword,
  });

  const isFormValid = email && password && !emailError && !passwordError;

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    callback: (values: { email: string; password: string }) => void,
  ) => {
    e.preventDefault();
    const isEmailValid = validateEmailValue();
    const isPasswordValid = validatePasswordValue();

    if (isEmailValid && isPasswordValid) {
      callback({ email, password });
    }
  };

  return {
    emailInput: {
      value: email,
      error: emailError,
      bind: emailBind,
    },
    passwordInput: {
      value: password,
      error: passwordError,
      bind: passwordBind,
    },
    isFormValid,
    handleSubmit,
  };
}
