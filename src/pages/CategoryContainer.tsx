import Category from '@/components/Category';
import { CategoryContainerStyle } from '@/styles/Category/CategoryContainer.styles';
import { CATEGORY_TYPE } from '@/types/category';
import useRanking from '@/hooks/useRanking';

function CategoryContainer() {
  const { selectCategory, handleCategoryClick } = useRanking();

  return (
    <CategoryContainerStyle>
      <Category
        onClick={() => handleCategoryClick(CATEGORY_TYPE.MANY_WISH)}
        category="MANY_WISH"
        categoryName="받고 싶어한"
        selectedCategory={selectCategory}
      />
      <Category
        onClick={() => handleCategoryClick(CATEGORY_TYPE.MANY_RECEIVE)}
        category="MANY_RECEIVE"
        categoryName="많이 선물한"
        selectedCategory={selectCategory}
      />
      <Category
        onClick={() => handleCategoryClick(CATEGORY_TYPE.MANY_WISH_RECEIVE)}
        category="MANY_WISH_RECEIVE"
        categoryName="위시로 받은"
        selectedCategory={selectCategory}
      />
    </CategoryContainerStyle>
  );
}

export default CategoryContainer;
