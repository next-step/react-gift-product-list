import { CategoryContainerStyle } from '@/styles/Category/CategoryStyle.styles';
import type { CategoryType } from '@/types/category';

type CategoryProps = {
  category: string;
  categoryName: string;
  onClick: () => void;
  selectedCategory: CategoryType;
};

function Category({ category, categoryName, onClick, selectedCategory }: CategoryProps) {
  const selected = category === selectedCategory;
  return (
    <CategoryContainerStyle onClick={onClick} selected={selected}>
      {categoryName}
    </CategoryContainerStyle>
  );
}

export default Category;
