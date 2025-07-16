/** @jsxImportSource @emotion/react */
import { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";

import { fetchThemes } from "@/api/theme";
import type { Theme } from "@/api/theme";
import { CategoryCard } from "@/components/category/CategoryCard";
import { Spinner } from "@/components/common/Spinner";

export const CategorySection = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchThemesData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchThemes();
      setThemes(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThemesData();
  }, [fetchThemesData]);

  if (loading) {
  return <Spinner size={48} withWrapper />;
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

const ErrorBanner = styled.div`
  background-color: #fff1f1;
  color: #d32f2f;
  padding: 12px 16px;
  margin-top: 16px;
  border-radius: 8px;
  text-align: center;
  ${({ theme }) => theme.typography.body2Regular};
`;
