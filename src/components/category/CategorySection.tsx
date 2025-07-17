import { Section } from '@/components/layout';
import CategoryGrid, { type CategoryData } from './CategoryGrid';
import { useThemes } from '@/hooks';
import CategorySkeleton from './CategorySkeleton';

interface CategorySectionProps {
  onCategoryClick?: (category: CategoryData) => void;
}

const CategorySection = ({ onCategoryClick }: CategorySectionProps) => {
  const { data, isLoading, error } = useThemes();

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <Section title="선물 테마" spacing="md">
        <CategorySkeleton />
      </Section>
    );
  }

  // 에러가 있거나 데이터가 없으면 섹션을 표시하지 않음
  if (error || !data || !data.data || data.data.length === 0) {
    return null;
  }

  // API 응답 데이터를 CategoryData 형식으로 변환
  const categories: CategoryData[] = data.data;

  return (
    <Section title="선물 테마" spacing="md">
      <CategoryGrid categories={categories} onCategoryClick={onCategoryClick} />
    </Section>
  );
};

export default CategorySection;
