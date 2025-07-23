import NavigationBar from '@src/components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import ThemesProductItem from '../components/ThemesProduct/ThemesProductItem';

const ThemesProduct = () => {
  return (
    <StyledTopestDiv>
      <NavigationBar />
      <ThemesProductItem />
    </StyledTopestDiv>
  );
};

export default ThemesProduct;
