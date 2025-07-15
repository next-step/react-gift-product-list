import styled from "@emotion/styled";
import { CategoryCard } from "@/pages/home/components/CategoryCard";
import { useThemes } from "@/hooks/useThemes";
import { ERROR_MESSAGES } from "@/constants/messages";

export const CategorySection = () => {
  const { themes, loading, error } = useThemes();

  if (loading) return <Placeholder>{ERROR_MESSAGES.THEME.LOAD}</Placeholder>;
  if (error || themes.length === 0) return null;

  return (
    <Section>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((item) => (
          <CategoryCard
            key={item.themeId}
            name={item.name}
            image={item.image}
          />
        ))}
      </Grid>
    </Section>
  );
};

const Section = styled.section`
  padding: 20px 16px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px 8px;
`;

const Placeholder = styled.div`
  padding: 32px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
  font-size: 14px;
`;
