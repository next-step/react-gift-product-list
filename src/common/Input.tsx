import React from 'react';
import styled from '@emotion/styled';

interface InputProps {
  name?: string;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type = 'text',
      placeholder,
      hasError = false,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <Layout>
      <StyledInput
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        hasError={hasError}
        disabled={disabled}
        {...props}
      />
    </Layout>
  )
);

Input.displayName = 'Input';

export default Input;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 388px;
  width: 100%;
`;

const StyledInput = styled.input<{ hasError: boolean; disabled: boolean }>`
  padding: 12px 16px;
  border: none;
  border-bottom: 1.2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.red700 : theme.colors.borderDefault};
  font-size: ${({ theme }) => theme.typography.fontSizes.title2};
  outline: none;
  transition: border-bottom-color 0.2s ease;

  &:focus {
    border-bottom: 1.2px solid ${({ theme }) => theme.colors.gray700};
  }

  &::placeholder {
    color: #999999;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999999;
    cursor: not-allowed;

    &::placeholder {
      color: #cccccc;
    }
  }
`;
