import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.background.default};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  margin-bottom: 20px;
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled.h4`
  ${({ theme }) => theme.typography.title2Bold};
  margin-bottom: 4px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.sub};
  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
`;

export const Price = styled.div`
  ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.color.text.default};
`;
