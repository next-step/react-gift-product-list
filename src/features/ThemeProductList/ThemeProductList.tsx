import { useParams } from 'react-router-dom';
import ProductList from './components/ProductList';
import ThemeHero from './components/ThemeHero';

const ThemeProductList = () => {
  const { id } = useParams();

  if (!id) return <div>유효한 테마 ID를 찾을 수 없습니다.</div>;

  return (
    <>
      <ThemeHero id={id} />
      <ProductList id={id} />
    </>
  );
};

export default ThemeProductList;
