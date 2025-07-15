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
      <Category
        onClick={() => handleCategoryClick(CATEGORY_TYPE.MANY_WISH)}
        category={CATEGORY_TYPE.MANY_WISH}
        categoryName="받고 싶어한"
        selectedCategory={selectedCategory}
      />
      <Category
        onClick={() => handleCategoryClick(CATEGORY_TYPE.MANY_RECEIVE)}
        category={CATEGORY_TYPE.MANY_RECEIVE}
        categoryName="많이 선물한"
        selectedCategory={selectedCategory}
      />
      <Category
        onClick={() => handleCategoryClick(CATEGORY_TYPE.MANY_WISH_RECEIVE)}
        category={CATEGORY_TYPE.MANY_WISH_RECEIVE}
        categoryName="위시로 받은"
        selectedCategory={selectedCategory}
      />
    </CategoryContainerStyle>
  );
}

export default CategoryContainer;
