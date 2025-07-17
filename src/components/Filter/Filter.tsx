import Layout from '@/components/layout/Layout';
import Gender from '@/components/filter/Gender';
import Category from '@/components/filter/Category';
import GiftGrid from '@/components/gift-ranking/GiftGrid';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { isValidGender, isValidCategory } from '@/utils/validateFilter';

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.semantic.text.default};
  margin-bottom: 16px;
`;

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const genderParam = searchParams.get('gender') || 'all';
  const categoryParam = searchParams.get('category') || 'MANY_WISH';

  const selectedGender = isValidGender(genderParam) ? genderParam : 'all';
  const selectedCategory = isValidCategory(categoryParam) ? categoryParam : 'MANY_WISH';

  const handleGenderChange = (value: string) => {
    searchParams.set('gender', value);
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (value: string) => {
    searchParams.set('category', value);
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <Title>실시간 급상승 선물랭킹</Title>
      <Gender selectedGender={selectedGender} onChange={handleGenderChange} />
      <Category selectedCategory={selectedCategory} onChange={handleCategoryChange} />
      <GiftGrid gender={selectedGender} category={selectedCategory} />
    </Layout>
  );
};

export default Filter;
