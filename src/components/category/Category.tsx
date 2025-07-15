import { categoryMockData } from '@/mocks/category';
import { css } from '@emotion/react';
import styled from "@emotion/styled";

const CategoryWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;

const CategoryHeader = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing5};
`;
const CategoryTitle=styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 27px;
`
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing2};
`;

const CategoryItem = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
    justify-content: center;
    gap: 0.25rem;
`;

const CategoryImage = styled.img`
  max-width: 3.125rem;
    max-height: 3.125rem;
    width: 100%;
    object-fit: cover;
  border-radius: 18px;
`;

const Category = () => {
  return (
    <CategoryWrapper>
      <CategoryHeader>
        <CategoryTitle>선물 테마</CategoryTitle>
      </CategoryHeader>

      <CategoryGrid>
        {categoryMockData.map((item) => (
          <CategoryItem key={item.themeId}>
            <CategoryImage src={item.image} alt={item.name} />
            <p css={css`
                font-size: 0.75rem;
                font-weight: 400;
                line-height: 1rem;
            `}>{item.name}</p>
          </CategoryItem>
        ))}
      </CategoryGrid>
    </CategoryWrapper>
  );
};

export default Category;