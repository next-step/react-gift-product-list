import { URLS } from '@assets/urls';
import { useNavigate } from 'react-router-dom';
import {
  StyledPresentRankingItemBrandName,
  StyledPresentRankingItemDiv,
  StyledPresentRankingItemImage,
  StyledPresentRankingItemPrasentPrice,
  StyledPresentRankingItemPresentItem,
  StyledPresentRankingNumContainer,
} from '@src/components/Home/PresentRanking/Item/StyledPresentRankingItem';
import { useRankingItem } from './useRankingItem';
import type { Good } from '@src/types/Goods';

const BASIC_RANKING_COMPONENT_NUMBER = 6;
const MANY_RANKING_COMPONENT_NUMBER = 18;

const PresentItem = ({ isVisible }: { isVisible: boolean }) => {
  const repeatCnt = isVisible ? MANY_RANKING_COMPONENT_NUMBER : BASIC_RANKING_COMPONENT_NUMBER;
  const navigate = useNavigate();

  const handleItemClick = (item: Good) => {
    if (!sessionStorage.getItem('email')) {
      sessionStorage.setItem('redirectProductId', String(item.id));
      navigate(URLS.login);
    } else {
      navigate(`${URLS.order}?productId=${item.id}`);
    }
  };
  const { goods, isLoading, isError } = useRankingItem();

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError || goods?.data.length === 0) {
    return <StyledPresentRankingItemDiv>상품 없음</StyledPresentRankingItemDiv>;
  } else {
    return (
      <>
        {goods &&
          goods.data.slice(0, repeatCnt).map((item: Good, index: number) => (
            <div key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
              <StyledPresentRankingItemDiv>
                <StyledPresentRankingNumContainer index={index + 1}>
                  {index + 1}
                </StyledPresentRankingNumContainer>
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
            </div>
          ))}
      </>
    );
  }
};

export default PresentItem;
