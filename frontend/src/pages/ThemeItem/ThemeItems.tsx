import Header from '@/components/Header/Header.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchThemesInfo from '@/hooks/fetch/useFetchThemesInfo.ts';
import { useEffect } from 'react';
import { PATH } from '@/constants/path.ts';
import ThemeInfo from '@/components/GiftThema/ThemaItem/ThemeInfo.tsx';
import ThemeProducts from '@/components/GiftThema/ThemaItem/ThemeProducts.tsx';
import { ProductsLoading } from '@/components/GiftThema/ThemaItem/ThemeProducts.styles.ts';

export default function ThemeItems() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const themeId = Number(id);
  const { themeInfo, loading, error, statusCode } = useFetchThemesInfo(themeId);

  useEffect(() => {
    if (statusCode === 404) {
      navigate(`${PATH.HOME}`);
    }
  }, [statusCode, navigate]);

  return (
    <>
      <Header />
      {loading ? (
        <ProductsLoading>로딩 중...</ProductsLoading>
      ) : (
        <>
          <ThemeInfo loading={loading} error={error} themeInfo={themeInfo} />
          <ThemeProducts themeId={themeId} />
        </>
      )}
    </>
  )
}
