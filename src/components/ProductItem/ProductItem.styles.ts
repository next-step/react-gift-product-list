import styled from '@emotion/styled';

export const Card = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;

export const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 5px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const BrandLogo = styled.img`
  width: 16px;
  height: 16px;
`;

export const BrandName = styled.span`
  ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.color.text.sub};
`;

export const ProductName = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.color.text.default};
`;

export const Price = styled.p`
  ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.color.text.default};
`;
