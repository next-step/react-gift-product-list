import NavigationBar from '@src/components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import ThemesProductLabel from '../components/ThemesProduct/ThemesProductItem';

const ThemesProduct = () => {
  return (
    <StyledTopestDiv>
      <NavigationBar />
      <ThemesProductLabel />
      <div className='themes-container'></div>
    </StyledTopestDiv>
  );
};

export default ThemesProduct;
