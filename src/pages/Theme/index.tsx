import { useParams } from 'react-router-dom';
import { ThemeHeroSection, ThemeProductSection } from '@/components';
import * as S from './styles';

const Theme = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const numericThemeId = themeId ? parseInt(themeId, 10) : undefined;

  return (
    <S.Container>
      <ThemeHeroSection themeId={numericThemeId} />
      {numericThemeId && <ThemeProductSection themeId={numericThemeId} />}
    </S.Container>
  );
};

export default Theme; 