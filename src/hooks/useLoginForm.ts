import { useLoginEmailForm } from '@src/hooks/useLoginEmailForm';
import { useLoginPwForm } from '@src/hooks/useLoginPwForm';
import { useMemo } from 'react';

export const useLoginForm = () => {
  const { id, idError, handleIdBlur, handleIdChange } = useLoginEmailForm();
  const { pw, pwError, handlePwBlur, handlePwChange } = useLoginPwForm();

  const isLoginButtonEnabled = useMemo(() => {
    const isIdValid = !id || idError ? false : true;
    const isPasswordValid = !pw || pwError ? false : true;

    return isIdValid && isPasswordValid;
  }, [id, pw, idError, pwError]);
  return {
    id,
    idError,
    handleIdBlur,
    handleIdChange,
    pw,
    pwError,
    handlePwBlur,
    handlePwChange,
    isLoginButtonEnabled,
  };
};
