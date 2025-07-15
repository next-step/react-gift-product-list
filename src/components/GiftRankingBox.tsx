import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import GiftObject from "./GiftObject";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const productRankingURL = import.meta.env.VITE_API_BASE_URL_PRODUCT_RANKING;

type ProductRanking = {
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

const GiftRanking = () => {
  const theme = useTheme();
  const [productRankingData, setproductRankingData] = useState<
    ProductRanking[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProductRanking = async () => {
      try {
        const response = await axios.get(productRankingURL);
        setproductRankingData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching theme data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProductRanking();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div css={giftRankingStyle(theme)}>
        {productRankingData &&
          productRankingData.map((product) => (
            <GiftObject
              key={product.id}
              gift={product}
              onClick={() => navigate(`/order/${product.id}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default GiftRanking;

const giftRankingStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  background: ${theme.colors.semantic.background.fill};
`;
