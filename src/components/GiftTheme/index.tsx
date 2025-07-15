import {
  Section,
  Title,
  Grid,
  Item,
  Image,
  Label
} from './styles';
import { type Theme, useGetThemes } from './useGetThemes';

const GiftThemeSection = () => {
  const { themes, loading, error } = useGetThemes();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || !themes || themes.length === 0) {
    return null;
  }

  return (
    <Section>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((theme: Theme) => (
          <Item key={theme.themeId}>
            <Image src={theme.image} alt={theme.name} />
            <Label>{theme.name}</Label>
          </Item>
        ))}
      </Grid>
    </Section>
  );
};

export default GiftThemeSection;
