import { Section } from '@/components/layout';
import CategoryGrid, { type CategoryData } from './CategoryGrid';
import { useThemes } from '@/hooks';
import styled from '@emotion/styled';

interface CategorySectionProps {
  onCategoryClick?: (category: CategoryData) => void;
}

// 로딩 스켈레톤 스타일 정의
const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${(props) => props.theme.spacing.spacing2};
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${(props) => props.theme.spacing.spacing1};
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const SkeletonCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.gray200};
  margin-bottom: ${(props) => props.theme.spacing.spacing2};
`;

const SkeletonText = styled.div`
  width: 40px;
  height: 12px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.gray200};
`;

const CategorySection = ({ onCategoryClick }: CategorySectionProps) => {
  const { data, isLoading, error } = useThemes();

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <Section title="선물 테마" spacing="md">
        <LoadingContainer>
          {Array.from({ length: 15 }).map((_, index) => (
            <SkeletonItem key={index}>
              <SkeletonCircle />
              <SkeletonText />
            </SkeletonItem>
          ))}
        </LoadingContainer>
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
