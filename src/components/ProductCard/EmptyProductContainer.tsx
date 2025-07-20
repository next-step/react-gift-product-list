import styled from "@emotion/styled";

const EmptyProductWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 125px;
  margin-bottom: 125px;
`;

const EmptyProductText = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
`;

interface EmptyProductContainerPropsType {
  label: string;
}

function EmptyProductContainer({ label }: EmptyProductContainerPropsType) {
  return (
    <EmptyProductWrapper>
      <EmptyProductText>{label}</EmptyProductText>
    </EmptyProductWrapper>
  );
}

export default EmptyProductContainer;
