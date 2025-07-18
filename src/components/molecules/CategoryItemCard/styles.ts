import styled from '@emotion/styled';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
`;

export const Image = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
  object-fit: cover;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typography.label2Regular}
  color: ${({ theme }) => theme.semantic.text.default};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;
