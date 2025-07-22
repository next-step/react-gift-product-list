import {
  ThemeInfoHeader,
  ThemeInfoWrapper,
} from '@/components/GiftThema/ThemaItem/ThemeInfo.styles.ts';
import {
  ProductsError,
  ProductsLoading,
} from '@/components/GiftThema/ThemaItem/ThemeProducts.styles.ts';

export default function ThemeInfo({ loading, error, themeInfo }) {

  return (
    <ThemeInfoWrapper>
      {error || !themeInfo ? (
        <ProductsError>테마 정보를 찾을 수 없습니다.</ProductsError>
      ) : (
        <ThemeInfoHeader background={themeInfo.backgroundColor}>
          <h5>{themeInfo.name}</h5>
          <h2>{themeInfo.title}</h2>
          <p>{themeInfo.description}</p>
        </ThemeInfoHeader>
      )}
    </ThemeInfoWrapper>
  );
}
