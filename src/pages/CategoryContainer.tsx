import Category from '@/components/Category';
import { CategoryContainerStyle } from '@/styles/Category/CategoryContainer.styles';
import { CATEGORY_TYPE } from '@/types/category';
import type { CategoryType } from '@/types/category';

type CategoryContainerProps = {
  selectedCategory: CategoryType;
  handleCategoryClick: (category: CategoryType) => void;
};

function CategoryContainer({ selectedCategory, handleCategoryClick }: CategoryContainerProps) {
  return (
    <CategoryContainerStyle>
      {CATEGORY_TYPE.map((category_type) => (
        <Category
          onClick={() => handleCategoryClick(category_type.value)}
          category={category_type.value}
          categoryName={category_type.label}
          selectedCategory={selectedCategory}
        />
      ))}
    </CategoryContainerStyle>
  );
}

export default CategoryContainer;
