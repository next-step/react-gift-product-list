import { useParams } from "react-router-dom";
import { useApiRequest } from "@/hooks/useApiRequest";
import styled from "@emotion/styled";
import ThemeProductsList from "@/pages/themeproductspage/ThemeProductsList";

type ThemeInfo = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

type Product = {
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

type ThemeProductResponse = {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
};

export default function ThemeProductsPage() {
  const { themeId } = useParams();
  const { data: themeInfo, status: themeStatus } = useApiRequest<ThemeInfo>({
    url: `/api/themes/${themeId}/info`,
  });
  const { data: productData, status: productStatus } =
    useApiRequest<ThemeProductResponse>({
      url: `/api/themes/${themeId}/products`,
    });

  if (themeStatus === "loading" || productStatus === "loading")
    return <p>로딩 중...</p>;
  if (
    themeStatus === "error" ||
    productStatus === "error" ||
    !themeInfo ||
    !productData
  )
    return <p>정보를 불러올 수 없습니다.</p>;

  return (
    <div>
      <Banner style={{ backgroundColor: themeInfo.backgroundColor }}>
        <h2>{themeInfo.name}</h2>
        <h1>{themeInfo.title}</h1>
        <p>{themeInfo.description}</p>
      </Banner>
      <section>
        <ThemeProductsList products={productData.list} />
      </section>
    </div>
  );
}

const Banner = styled.div`
  padding: 24px;
  h2 {
    font-size: 18px;
    margin-bottom: 4px;
    color: white;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 8px;
    color: white;
  }
  p {
    color: white;
  }
`;
