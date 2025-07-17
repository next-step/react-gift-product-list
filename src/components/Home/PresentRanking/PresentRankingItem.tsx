import { URLS } from '@assets/urls';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProductRanking, ProductRankings } from '@src_types/ProductRankings';
import {
  StyledPresentRankingItemBrandName,
  StyledPresentRankingItemDiv,
  StyledPresentRankingItemImage,
  StyledPresentRankingItemPrasentPrice,
  StyledPresentRankingItemPresentItem,
  StyledPresentRankingNumContainer,
} from '@src/styles/Home/PresentRanking/StyledPresentRankingItem';
import { ApiClient } from '@src/api/FetchData';

const BASIC_RANKING_COMPONENT_NUMBER = 6;
const MANY_RANKING_COMPONENT_NUMBER = 18;

const PresentItem = ({ isVisible }: { isVisible: boolean }) => {
  const { search } = useLocation();

  const repeatCnt = isVisible ? MANY_RANKING_COMPONENT_NUMBER : BASIC_RANKING_COMPONENT_NUMBER;
  const navigate = useNavigate();

  const handleItemClick = (item: ProductRanking) => {
    if (!sessionStorage.getItem('email')) {
      sessionStorage.setItem('redirectProductId', String(item.id));
      navigate(URLS.login);
    } else {
      navigate(`${URLS.order}?productId=${item.id}`);
    }
  };

  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [productRanking, setProductRanking] = useState<ProductRankings>({
    data: [
      {
        id: 0,
        name: '',
        price: {
          basicPrice: 0,
          sellingPrice: 0,
          discountRate: 0,
        },
        imageURL: 'none',
        brandInfo: {
          id: 0,
          name: '',
          imageURL: 'none',
        },
      },
    ],
  });

  useEffect(() => {
    const params = new URLSearchParams(search);
    const rankType = params.get('rankType');
    const targetType = params.get('targetType');
    const typeUrls = `?targetType=${targetType}&rankType=${rankType}`;

    const fetchProductRanking = async () => {
      try {
        // const response = await axios.get(process.env.VITE_API_BASE_URL + '/ranking');
        //const response = await axios.get('http://localhost:3000/api/products/ranking' + typeUrls);
        const data = await ApiClient('GET', 'products/ranking', null, typeUrls);
        setProductRanking(data);
        setError(false);
      } catch (error) {
        console.error('Error fetching Product Ranking data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProductRanking();
  }, [isLoading, isError, search]);
  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError || productRanking.data.length <= 0) {
    return <StyledPresentRankingItemDiv>상품 없음</StyledPresentRankingItemDiv>;
  } else {
    return (
      <>
        {productRanking &&
          productRanking.data.slice(0, repeatCnt).map((item: ProductRanking, index: number) => (
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
