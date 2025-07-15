import { css } from '@emotion/react';
import {
  CategoryWrapper,
  CategoryHeader,
  CategoryTitle,
  CategoryGrid,
  CategoryItem,
  CategoryImage,
} from './Category.styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { CategoryType } from '@/types/category';

const Category = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/themes');
        const data = res.data.data;
        if (data.length > 0) {
          setCategory(data);
          setIsLoading(false);
        } else {
          //데이터가 빈 배열일때
          setCategory([]);
        }
      } catch (e) {
        console.error(e);
        setCategory([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchThemes();
  }, []);
  if (isLoading) {
    return <div>📢카테고리가 로딩중입니다..</div>;
  }

  if (category.length === 0) {
    return <div>📭 선물 테마가 없습니다.</div>;
  }

  return (
    <CategoryWrapper>
      <CategoryHeader>
        <CategoryTitle>선물 테마</CategoryTitle>
      </CategoryHeader>
      <CategoryGrid>
        {category.map((item) => (
          <CategoryItem key={item.themeId}>
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

