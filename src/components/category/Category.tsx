import { css } from '@emotion/react';
import {
  CategoryWrapper,
  CategoryHeader,
  CategoryTitle,
  CategoryGrid,
  CategoryItem,
  CategoryImage,
} from './Category.styles';
import type { CategoryType } from '@/types/category';
import { useFetch } from '@/hooks/useFetch';
import { fetchCategories } from '@/services/themeApi';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/Router';

const Category = () => {
  const navigete= useNavigate();
  const {
    data: category,
    isLoading,
    error,
  } = useFetch<CategoryType[]>({
    fetcher: fetchCategories,
    initValue: [],
    deps:[]
  });
const handleClickCategory = (themeId: number) => {
navigete(ROUTE_PATH.THEME.replace(":themeId", String(themeId)))
};

  if (isLoading) return <div>📢 카테고리가 로딩중입니다..</div>;
  if (error) return <div>❌ 오류 발생: {String(error)}</div>;
  if (category.length === 0) return <div>📭 선물 테마가 없습니다.</div>;

  return (
    <CategoryWrapper>
      <CategoryHeader>
        <CategoryTitle>선물 테마</CategoryTitle>
      </CategoryHeader>
      <CategoryGrid>
        {category.map((item) => (
          <CategoryItem onClick={() => handleClickCategory(item.themeId)} key={item.themeId}>
            <CategoryImage src={item.image} alt={item.name} />
            <p
              css={css`
                font-size: 0.75rem;
                font-weight: 400;
                line-height: 1rem;
              `}
            >
              {item.name}
            </p>
          </CategoryItem>
        ))}
      </CategoryGrid>
    </CategoryWrapper>
  );
};

export default Category;
