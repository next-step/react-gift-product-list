import { useParams } from 'react-router-dom';
import ThemeHero from './ThemeHero';
// import ProductList from './ProductList';

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();

  if (!themeId) return null;

  return (
    <div>
      <ThemeHero themeId={themeId} />
      {/* <ProductList themeId={themeId} /> */}
    </div>
  );
};

export default ThemeProductPage;
