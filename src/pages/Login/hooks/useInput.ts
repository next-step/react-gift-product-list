import { useState, useMemo } from 'react';

// value만 받도록 Validator 타입 정의
export type Validator = (value: string) => string;

export const useInput = (getError: Validator) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  // touched가 true일 때만 에러 메시지를 보여줌
  const error = useMemo(() => (touched ? getError(value) : ''), [value, touched]);

  // 상태 변경 핸들러
  const onChange = (v: string) => setValue(v);

  // 사용자가 포커스를 한 번 잃은 이후부터 에러 메시지 노출
  const validate = () => setTouched(true);

  // 유효성은 touched와 상관없이 판별 (버튼 활성화 등 판단에 사용)
  const isValid = !getError(value);

  return {
    value,
    error,
    onChange,
    validate,
    isValid,
  };
};
