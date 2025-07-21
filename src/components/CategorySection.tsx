import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { fetchThemes } from '@/api/theme';
import type { Theme } from '@/types/theme';
import Spinner from '@/components/Spinner';
import { ROUTE } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

const SectionWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing3};
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const Image = styled.img`
  width: ${({ theme }) => theme.spacing.spacing14};
  height: ${({ theme }) => theme.spacing.spacing14};
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const CategorySection = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
    return <Spinner />;
  }
  if (error || themes.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map(({ themeId, name, image }) => (
          <Item key={themeId} onClick={() => navigate(ROUTE.THEME(themeId))}>
            <Image src={image} alt={name} />
            <Label>{name}</Label>
          </Item>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default CategorySection;
