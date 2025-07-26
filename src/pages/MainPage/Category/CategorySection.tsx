import * as S from './CategorySection.styles';
import CategoryItem from './CategoryItem';
import { useFetch } from '@/hooks/useFetch';

interface Category {
  themeId: number;
  name: string;
  image: string;
}

const CategorySection = () => {
  const url = 'http://localhost:3000/api/themes';
  const { data: categories = [], isLoading, error } = useFetch<Category[]>(url);

  if (isLoading) {
    return (
      <S.Wrapper style={{ justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <p>테마 불러오는 중...</p>
      </S.Wrapper>
    );
  }

  if (error || !categories || categories.length === 0) {
    return null;
  }

  return (
    <>
      <S.Wrapper>
        {categories.map((category) => (
          <CategoryItem
            key={category.themeId}
            themeId={category.themeId}
            name={category.name}
            image={category.image}
          />
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
