import styled from '@emotion/styled';
import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { useEffect, useState } from 'react';

type ThemeLabel = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

const ThemesProductLabel = () => {
  const urlArray = new URL(window.location.href).pathname.split('/');
  const themeId = urlArray[urlArray.length - 1];
  const [label, setLabel] = useState<ThemeLabel | null>(null);
  //const [products, setProducts] = useState(null);

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
  }, []);

  return (
    <StyledThemesProductLabelItem background={label?.backgroundColor}>
      <p>{label && label.name}</p>
      <p>{label && label.title}</p>
      <p>{label && label.description}</p>
    </StyledThemesProductLabelItem>
  );
};

export default ThemesProductLabel;

interface ColorProps {
  background?: string;
}

const StyledThemesProductLabelItem = styled.div<ColorProps>`
  background-color: ${({ background }) => background};
`;
