import styled from '@emotion/styled';
import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import {
  StyledPresentRankingItemBrandName,
  StyledPresentRankingItemDiv,
  StyledPresentRankingItemImage,
  StyledPresentRankingItemPrasentPrice,
  StyledPresentRankingItemPresentItem,
} from '@src/components/Home/PresentRanking/Item/StyledPresentRankingItem';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { useEffect, useState } from 'react';

type ThemeLabel = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

type ThemeProducts = {
  data: {
    list: ThemeProduct[];
    cursor: number;
    hasMoreList: boolean;
  };
};
type ThemeProduct = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

const ThemesProductLabel = () => {
  const urlArray = new URL(window.location.href).pathname.split('/');
  const themeId = urlArray[urlArray.length - 1];
  const [label, setLabel] = useState<ThemeLabel | null>(null);
  const [products, setProducts] = useState<ThemeProducts | null>(null);

  useEffect(() => {
    const reqeustLabel = async () => {
      const apiReqeustParmas = {
        methods: 'GET' as HttpTypes,
        requestName: `themes/${themeId}/info`,
        body: {},
        params: '',
        headers: null,
      };
      try {
        const fetchData = await apiClient(apiReqeustParmas);
        console.log(fetchData);
        setLabel(fetchData.data);
      } catch (error) {
        return error;
      }
    };
    reqeustLabel();
  }, [themeId]);

  useEffect(() => {
    const reqeustThemeItem = async () => {
      const apiReqeustParmas = {
        methods: 'GET' as HttpTypes,
        requestName: `themes/${themeId}/products`,
        body: {},
        params: '',
        headers: null,
      };
      try {
        const fetchData = await apiClient(apiReqeustParmas);
        console.log(fetchData);
        setProducts(fetchData);
      } catch (error) {
        return error;
      }
    };
    reqeustThemeItem();
  }, [themeId]);

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
