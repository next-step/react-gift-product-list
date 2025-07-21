import { fetchThemeProducts } from "@src/apis/BackEnd/apiList";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import styled from "@emotion/styled";
import usePostState from "@src/hooks/usePostState";
import PendingSpinner from "../shared/PendingSpinner";

export type ThemeProductData = {
  brandInfo: {
    id: number;
    imageURL: string;
    name: string;
  };
  id: number;
  imageURL: string;
  name: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
};

function ThemePanel() {
  const themeId = useParams().id ?? "";
  const [productList, setProductList] = useState<ThemeProductData[]>([]);
  const hasMoreRef = useRef<boolean>(true);
  const cursorRef = useRef<number>(0);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const PRODUCTS_PER_PAGE = 12;
  const productData = usePostState(fetchThemeProducts);

  useEffect(() => {
    if (productData.status === "done") {
      const { cursor, hasMoreList, list } = productData.result.data;
      hasMoreRef.current = hasMoreList;
      cursorRef.current = cursor;
      setProductList((prev) => [...prev, ...list]);
    }
  }, [productData.status]);

  const getNext = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        hasMoreRef.current &&
        productData.status !== "pending"
      ) {
        productData.post(themeId, cursorRef.current, PRODUCTS_PER_PAGE);
      }
    },
    [themeId, productData.status]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(getNext, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    });
    if (scrollEndRef.current) observer.observe(scrollEndRef.current);
    return () => observer.disconnect();
  }, [getNext]);

  return (
    <>
      {productData.status === "done" && productList.length === 0 && (
        <NoProduct>상품이 없습니다.</NoProduct>
      )}
      <CardPlaceHolder>
        {productList.map((product: ThemeProductData) => (
          <Card key={product.id} product={product} />
        ))}
      </CardPlaceHolder>
      {productData.status === "pending" && <PendingSpinner />}
      <ScrollEnd ref={scrollEndRef}></ScrollEnd>
    </>
  );
}

const NoProduct = styled.div`
  width: 100%;
  padding: 50px;
  text-align: center;
`;

const ScrollEnd = styled.div`
  height: 100px;
`;

const CardPlaceHolder = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-items: center;
  align-items: start;
`;

export default ThemePanel;
