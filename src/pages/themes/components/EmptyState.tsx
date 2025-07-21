import styled from "@emotion/styled";

export const EmptyState = () => {
  return (
    <Wrapper>
      <Message>상품이 없습니다.</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 40px 16px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
`;
