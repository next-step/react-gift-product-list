/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { fetchThemes } from "@/api/theme";
import type { Theme } from "@/api/theme";
import { CategoryCard } from "@/components/category/CategoryCard";

const SKELETON_CNT = 5;

export const CategorySection = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const data = await fetchThemes();
        setThemes(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadThemes();
  }, []);

  if (loading) {
    return (
      <CategoryGrid>
        {Array.from({ length: SKELETON_CNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </CategoryGrid>
    );
  }

  if (error || themes.length === 0) {
    return <ErrorBanner>해당 ID에 일치하는 데이터가 없습니다.</ErrorBanner>;
  }

  return (
    <CategoryGrid>
      {themes.map(({ themeId, name, image }) => (
        <CategoryCard key={themeId} name={name} image={image} />
      ))}
    </CategoryGrid>
  );
};

const CategoryGrid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;
  padding: 20px 0;
`;

const SkeletonCard = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray300};
  margin: 0 auto;
`;

const ErrorBanner = styled.div`
  background-color: #fff1f1;
  color: #d32f2f;
  padding: 12px 16px;
  margin-top: 16px;
  border-radius: 8px;
  text-align: center;
  ${({ theme }) => theme.typography.body2Regular};
`;
