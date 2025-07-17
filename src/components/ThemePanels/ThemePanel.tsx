import { fetchThemeProducts } from "@src/apis/BackEnd/apiList";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import styled from "@emotion/styled";

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

  const update = async () => {
    const response = await fetchThemeProducts(
      themeId,
      cursorRef.current,
      PRODUCTS_PER_PAGE
    );

    if (!response) {
      console.error("fetchThemeProducts에 실패하였습니다.");
      return;
    }

    const { cursor, hasMoreList, list } = response.data.data;
    console.log(cursor, list);
    hasMoreRef.current = hasMoreList;
    cursorRef.current = cursor;
    setProductList((prev) => [...prev, ...list]);
  };

  const getNext = () => {
    if (hasMoreRef.current) {
      update();
    }
  };

  const observer = new IntersectionObserver(getNext, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  });

  useEffect(() => {
    if (scrollEndRef.current) observer.observe(scrollEndRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CardPlaceHolder>
        {productList.map((product: ThemeProductData) => (
          <Card key={product.id} product={product} />
        ))}
      </CardPlaceHolder>
      <ScrollEnd ref={scrollEndRef}></ScrollEnd>
    </>
  );
}

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
