import { useParams } from 'react-router-dom';

const ThemeProductPage = () => {
  const { themeId } = useParams();

  return (
    <div>
      <h1>테마 상품 페이지</h1>
      <p>themeId: {themeId}</p>
    </div>
  );
};

export default ThemeProductPage;
