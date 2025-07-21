import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import CategoryBtn from '@/components/giftHome/GiftThemes/CategoryBtn';
import Text from '@/common/Text';
import LoadingSpinner from '@/common/LoadingSpinner';
import useGiftThemes from '@/hooks/useGiftThemes';

const GiftCategoryList = () => {
  const { categories, loading, error } = useGiftThemes();
  const navigate = useNavigate();

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
            onClick={() => navigate(`/themes/${category.themeId}`)}
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
