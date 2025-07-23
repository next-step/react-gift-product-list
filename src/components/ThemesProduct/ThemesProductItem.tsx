import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { useThemesProductLabel } from './useThemesProductLabel';
import {
  StyledThemesProductGridContainer,
  StyledThemesProductLabelItem,
  StyledThemesProductPaddingContainer,
} from './StyledThemesProductItem';
import { useThemesProductItem } from './useThemesProductItem';
import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from './useIntersectionObserver';
import PresentProductList from '../Home/PresentRanking/Item/PresentRankingItem';

const ThemesProductItem = () => {
  const navigate = useNavigate();
  const { label } = useThemesProductLabel(navigate);
  const { goods, isLoading, isError, loadItem, hasMore } = useThemesProductItem(navigate);
  const loaderRef = useIntersectionObserver({
    onIntersect: loadItem,
    canLoadMore: hasMore,
  });

  return (
    <StyledTopestDiv>
      <StyledThemesProductLabelItem background={label?.backgroundColor}>
        <p className='label1Reuglar color-white'>{label?.name}</p>
        <p className='title2Bold color-white'>{label?.title}</p>
        <p className='title2Regular color-white'>{label?.description}</p>
      </StyledThemesProductLabelItem>
      <StyledThemesProductPaddingContainer className='padding-container'>
        <StyledThemesProductGridContainer className='theme-grid-container'>
          <PresentProductList goods={goods} isError={isError} isLoading={isLoading} />
          <div className='loader' ref={loaderRef}></div>
        </StyledThemesProductGridContainer>
      </StyledThemesProductPaddingContainer>
    </StyledTopestDiv>
  );
};
export default ThemesProductItem;
