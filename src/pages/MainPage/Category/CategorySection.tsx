import * as S from './CategorySection.styles';
import CategoryItem from './CategoryItem';
import { useState, useEffect } from 'react';

interface Category {
  themeId: number;
  name: string;
  image: string;
}

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch('http://localhost:3000/api/themes');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result && Array.isArray(result.data)) {
          setCategories(result.data);
        } else {
          throw new Error('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <S.Wrapper style={{ justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <p>테마 불러오는 중...</p>
      </S.Wrapper>
    );
  }

  if (hasError || categories.length === 0) {
    return null;
  }

  return (
    <>
      <S.Wrapper>
        {categories.map((category) => (
          <CategoryItem key={category.themeId} name={category.name} image={category.image} />
        ))}
      </S.Wrapper>
      <S.Banner>
        <p>카카오테크 캠퍼스 3기여러분</p>
        <h3>프론트엔드 2단계 과제 화이팅! 🎉</h3>
      </S.Banner>
    </>
  );
};

export default CategorySection;
