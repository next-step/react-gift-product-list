import { useParams } from 'react-router-dom';
import ThemeHero from './ThemeHero';
import ThemeProductList from './ThemeProductList';

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();

  if (!themeId) return null;

  return (
    <div>
      <ThemeHero themeId={themeId} />
      <ThemeProductList themeId={themeId} />
    </div>
  );
};

export default ThemeProductPage;
