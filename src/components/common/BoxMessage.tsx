import styled from "@emotion/styled";

type BoxMessageProps = {
  message: string;
  height: string;
};

const BoxMessage = ({ message, height }: BoxMessageProps) => {
  return (
    <BoxDiv height={height}>
      <Description>{message}</Description>
    </BoxDiv>
  );
};

export default BoxMessage;

const BoxDiv = styled.div<{ height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ height }) => height};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
`;
