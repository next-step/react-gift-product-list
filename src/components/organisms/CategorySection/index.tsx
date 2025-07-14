import { CheerUpMessage, CategoryField } from '@/components';
import * as S from './styles';

const CategorySection = () => {
  return (
    <S.Section>
      <CategoryField />
      <CheerUpMessage />   
    </S.Section>
  );
};

export default CategorySection; 