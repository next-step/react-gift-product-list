import styled from '@emotion/styled';

interface TextInputBoxProps {
  title?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  marginBottom?: string;
}

const TextInputBox = ({
  title,
  placeholder,
  value,
  onChange,
  marginBottom = '16px',
}: TextInputBoxProps) => {
  return (
    <Wrapper marginBottom={marginBottom}>
      {title && <Title>{title}</Title>}
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Wrapper>
  );
};

export default TextInputBox;

const Wrapper = styled.div<{ marginBottom: string }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  margin: ${({ marginBottom }) => marginBottom};
`;

const Title = styled.label`
  min-width: 70px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.default};
  padding-top: 12px;
`;

const Textarea = styled.textarea`
  flex: 1;
  height: 20px;
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  resize: none;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.kakaoYellow};
  }
  margin-right: 20px;
`;
