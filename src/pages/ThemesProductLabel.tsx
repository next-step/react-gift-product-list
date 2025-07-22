import styled from '@emotion/styled';
import {
  StyledPresentRankingItemBrandName,
  StyledPresentRankingItemDiv,
  StyledPresentRankingItemImage,
  StyledPresentRankingItemPrasentPrice,
  StyledPresentRankingItemPresentItem,
} from '@src/components/Home/PresentRanking/Item/StyledPresentRankingItem';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { useThemesProduct } from './useThemesProduct';

const ThemesProductLabel = () => {
  const { label, products } = useThemesProduct();

  return (
    <StyledTopestDiv>
      <StyledThemesProductLabelItem background={label?.backgroundColor}>
        <p className='label1Reuglar color-white'>{label && label.name}</p>
        <p className='title2Bold color-white'>{label && label.title}</p>
        <p className='title2Regular color-white'>{label && label.description}</p>
      </StyledThemesProductLabelItem>
      <StyledThemesProductPaddingContainer>
        <StyledThemesProductGridContainer>
          {products &&
            products.data.list.map((item) => (
              <StyledPresentRankingItemDiv>
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
            ))}
        </StyledThemesProductGridContainer>
      </StyledThemesProductPaddingContainer>
    </StyledTopestDiv>
  );
};

export default ThemesProductLabel;

interface ColorProps {
  background?: string;
}

const StyledThemesProductLabelItem = styled.div<ColorProps>`
  background-color: ${({ background }) => background};
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;

  p {
    margin: 3px 10px 0px 10px;
  }
`;

const StyledThemesProductPaddingContainer = styled.div`
  width: 100%;
  padding: 4px 16px;
  background-color: white;
`;

const StyledThemesProductGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 5px;
`;
