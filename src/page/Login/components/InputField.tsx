import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef } from 'react';

const InputContainer = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.semantic.text.default};
  transition: border-color 200ms;
  border-style: solid;
  min-height: ${({ theme }) => theme.spacing.spacing11};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing2} 0;
  border-width: 0 0 1px;
  border-color: ${({ theme }) => theme.colors.semantic.border.default};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const P = styled.p`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.colorScale.red[500]};
  margin: 0px;
  text-align: left;
`;

export interface InputHook extends ComponentPropsWithoutRef<'input'> {
  error?: string;
}

interface InputFieldProps {
  hook: InputHook;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
}

const InputField = ({ hook }: InputFieldProps) => {
  const { error, ...rest } = hook;
  return (
    <InputContainer>
      <Input {...rest} />
      {error && <P>{error}</P>}
    </InputContainer>
  );
};

export default InputField;
