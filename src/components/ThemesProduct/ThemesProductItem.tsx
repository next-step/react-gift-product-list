import {
  StyledPresentRankingItemBrandName,
  StyledPresentRankingItemDiv,
  StyledPresentRankingItemImage,
  StyledPresentRankingItemPrasentPrice,
  StyledPresentRankingItemPresentItem,
} from '@src/components/Home/PresentRanking/Item/StyledPresentRankingItem';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { useThemesProductLabel } from './useThemesProductLabel';
import {
  StyledThemesProductGridContainer,
  StyledThemesProductLabelItem,
  StyledThemesProductPaddingContainer,
} from './StyledThemesProductItem';
import { useThemesProductItem } from './useThemesProductItem';
import { useNavigate } from 'react-router-dom';

const ThemesProductItem = () => {
  const navigate = useNavigate();
  const { label } = useThemesProductLabel(navigate);
  const { products, loader } = useThemesProductItem(navigate);
  return (
    <StyledTopestDiv>
      <StyledThemesProductLabelItem background={label?.backgroundColor}>
        <p className='label1Reuglar color-white'>{label && label.name}</p>
        <p className='title2Bold color-white'>{label && label.title}</p>
        <p className='title2Regular color-white'>{label && label.description}</p>
      </StyledThemesProductLabelItem>
      <StyledThemesProductPaddingContainer className='padding-container'>
        <StyledThemesProductGridContainer className='theme-grid-container'>
          {products && products.data.list.length !== 0 ? (
            products.data.list.map((item) => (
              <StyledPresentRankingItemDiv key={item.id}>
                <StyledPresentRankingItemImage src={item.imageURL} alt='제품 이미지' />
                <StyledPresentRankingItemBrandName className='brand_name'>
                  {item.brandInfo.name}
                </StyledPresentRankingItemBrandName>
                <StyledPresentRankingItemPresentItem className='goods_name'>
                  {item.name}
                </StyledPresentRankingItemPresentItem>
                <StyledPresentRankingItemPrasentPrice className='goods_price'>
                  {item.price.sellingPrice.toLocaleString()} 원
                </StyledPresentRankingItemPrasentPrice>
              </StyledPresentRankingItemDiv>
            ))
          ) : (
            <div>
              <p>상품이 없습니다.</p>
            </div>
          )}
          <div className='loader' ref={loader}></div>
        </StyledThemesProductGridContainer>
      </StyledThemesProductPaddingContainer>
    </StyledTopestDiv>
  );
};

export default ThemesProductItem;
