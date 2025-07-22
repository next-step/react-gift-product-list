import styled from '@emotion/styled';
import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
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
  }, [label, themeId]);

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
  }, [products, themeId]);

  return (
    <StyledTopestDiv>
      <StyledThemesProductLabelItem background={label?.backgroundColor}>
        <p>{label && label.name}</p>
        <p>{label && label.title}</p>
        <p>{label && label.description}</p>
      </StyledThemesProductLabelItem>
      {products &&
        products.data.list.map((item) => (
          <div key={item.id}>
            <img src={item.imageURL} alt='사진 없음' />
            <p>{item.brandInfo.name}</p>
            <p>{item.name}</p>
            <p>{item.price.sellingPrice}</p>
          </div>
        ))}
    </StyledTopestDiv>
  );
};

export default ThemesProductLabel;

interface ColorProps {
  background?: string;
}

const StyledThemesProductLabelItem = styled.div<ColorProps>`
  background-color: ${({ background }) => background};
`;
