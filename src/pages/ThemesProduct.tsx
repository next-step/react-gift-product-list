import NavigationBar from '@src/components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import ThemesProductLabel from './ThemesProductLabel';

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
