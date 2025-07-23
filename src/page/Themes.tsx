
import {
} from '@/component/main/GiftRanking.styled';
import ProductList from '@/component/theme/ProductList';
import { BaseUrl } from '@/constant/api';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import { DefaultDiv, EmptyDiv4h, EmptyDiv8h } from '@/styles/CommomStyle/Common.styled';
import { ThemeDescription, ThemeName, ThemeTitle, ThemeTop } from '@/styles/CommomStyle/themes.styled';
import { defaultThemeInfo, type ThemeInfo } from '@/type/GiftAPI/product';
import { useParams } from 'react-router-dom';
//import useFetchFromUrlT from '@/hook/useFetchFromUrlT';



const Themes = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const themesUrl = `${BaseUrl}/api/themes/${themeId}/info`
  const themeInfo = useFetchFromUrlT<ThemeInfo>(themesUrl,defaultThemeInfo);

  const themeBackground = (themeInfo.item?.backgroundColor ?? 'white')
  const themeName = themeInfo.item?.name
  const themeTitle = themeInfo.item?.title
  const themeDescription = themeInfo.item?.description


  return (
    <DefaultDiv>
      <ThemeTop background={themeBackground}>
        <ThemeName> {themeName} </ThemeName>
        <EmptyDiv8h/>
        <ThemeTitle>{themeTitle}</ThemeTitle>
        <EmptyDiv4h/>
        <ThemeDescription>{themeDescription}</ThemeDescription>
      </ThemeTop>
      <ProductList />
    </DefaultDiv>

  )
};
export default Themes;