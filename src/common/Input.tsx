import React from 'react';
import styled from '@emotion/styled';

interface InputProps {
  name?: string;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, type = 'text', placeholder, hasError = false, ...props }, ref) => (
    <Layout>
      <StyledInput
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        hasError={hasError}
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

const StyledInput = styled.input<{ hasError: boolean }>`
  padding: 12px 16px;
  border: none;
  border-bottom: 1.2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.red700 : theme.colors.borderDefault};
  font-size: ${({ theme }) => theme.typography.fontSizes.title2};
  outline: none;

  &:focus {
    border-bottom: 1.2px solid ${({ theme }) => theme.colors.gray700};
  }

  &::placeholder {
    color: #999999;
  }
`;
