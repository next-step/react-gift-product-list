import styled from '@emotion/styled';

export const CategoryWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;

export const CategoryHeader = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing5};
`;
export const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 27px;
`;
export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing2};
`;

export const CategoryItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

export const CategoryImage = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  object-fit: cover;
  border-radius: 18px;
`;
