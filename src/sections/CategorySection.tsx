import styled from "@emotion/styled";
import CategoryCard from "@/components/CategoryCard";
import { useThemes } from "@/hooks/useThemes";
import Spinner from "@/components/Spinner";

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing5} 0;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.title.title1Bold};
  margin-left: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

export default function CategorySection() {
  const { themes, loading, error } = useThemes();
  if (loading) return <Spinner />;
  if (error || !themes?.length) return null;

  return (
    <Section>
      <SectionTitle>선물 테마</SectionTitle>
      <Grid>
        {themes.map(({ themeId, name, image }) => (
          <CategoryCard key={themeId} name={name} image={image} />
        ))}
      </Grid>
    </Section>
  );
}
