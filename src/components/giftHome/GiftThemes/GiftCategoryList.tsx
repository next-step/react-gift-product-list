import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import CategoryBtn from '@/components/giftHome/GiftThemes/CategoryBtn';
import Text from '@/common/Text';
import { fetchThemes } from '@/api/themes';
import type { Category } from '@/api/themes';
import LoadingSpinner from '@/common/LoadingSpinner';

const GiftCategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const data = await fetchThemes();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || '테마 불러오기에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadThemes();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Text>{error}</Text>;

  return (
    <Layout>
      <Text size="title1" weight="bold">
        선물 테마
      </Text>
      <CategoryItem>
        {categories.map((category) => (
          <CategoryBtn
            key={category.themeId}
            name={category.name}
            image={category.image}
          />
        ))}
      </CategoryItem>
    </Layout>
  );
};

export default GiftCategoryList;

const Layout = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6};
`;

const CategoryItem = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing7};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.spacing3};
`;
