// PresentProductList.tsx
import { URLS } from '@src/assets/urls';
import {
  StyledPresentRankingItemBrandName,
  StyledPresentRankingItemDiv,
  StyledPresentRankingItemImage,
  StyledPresentRankingItemPrasentPrice,
  StyledPresentRankingItemPresentItem,
  StyledPresentRankingNumContainer,
} from '@src/components/Home/PresentRanking/Item/StyledPresentRankingItem';
import type { Good } from '@src/types/Goods';
import { useNavigate } from 'react-router-dom';

interface Props {
  goods: Good[] | null;
  isLoading: boolean;
  isError: boolean;
  isVisible?: boolean;
  showRankingNumber?: boolean;
}
const BASIC_RANKING_COMPONENT_NUMBER = 6;
const MANY_RANKING_COMPONENT_NUMBER = 18;

const PresentProductList = ({
  goods,
  isVisible = false,
  showRankingNumber = false,
  isLoading = true,
  isError = false,
}: Props) => {
  const navigate = useNavigate();
  const repeatCnt = isVisible ? MANY_RANKING_COMPONENT_NUMBER : BASIC_RANKING_COMPONENT_NUMBER;

  const handleItemClick = (item: Good) => {
    if (!sessionStorage.getItem('email')) {
      sessionStorage.setItem('redirectProductId', String(item.id));
      navigate(URLS.login);
    } else {
      navigate(`${URLS.order}?productId=${item.id}`);
    }
  };
  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError || !goods) {
    return <StyledPresentRankingItemDiv>상품 없음</StyledPresentRankingItemDiv>;
  }
  if (showRankingNumber) {
    return (
      <>
        {goods &&
          goods?.slice(0, repeatCnt).map((item: Good, index: number) => (
            <div key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
              <StyledPresentRankingItemDiv>
                <StyledPresentRankingNumContainer index={index + 1}>
                  {index + 1}
                </StyledPresentRankingNumContainer>
                <StyledPresentRankingItemImage src={item.imageURL} alt={item.name} />
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
            </div>
          ))}
      </>
    );
  } else {
    return (
      <>
        {goods.map((item, index) => (
          <div key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
            <StyledPresentRankingItemDiv>
              {showRankingNumber && (
                <StyledPresentRankingNumContainer index={index + 1}>
                  {index + 1}
                </StyledPresentRankingNumContainer>
              )}
              <StyledPresentRankingItemImage src={item.imageURL} alt={item.name} />
              <StyledPresentRankingItemBrandName>
                {item.brandInfo.name}
              </StyledPresentRankingItemBrandName>
              <StyledPresentRankingItemPresentItem>{item.name}</StyledPresentRankingItemPresentItem>
              <StyledPresentRankingItemPrasentPrice>
                {item.price.sellingPrice.toLocaleString()} 원
              </StyledPresentRankingItemPrasentPrice>
            </StyledPresentRankingItemDiv>
          </div>
        ))}
      </>
    );
  }
};

export default PresentProductList;
