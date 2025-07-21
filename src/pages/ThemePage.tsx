import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getThemeProduct } from "@/services/theme";
import styled from "@emotion/styled";
import axios from "axios";
import { showErrorToast } from "@/styles/toast";
import type { ProductInfo } from "@/types/product";
import { useFetchTheme } from "../hooks/useFetchTheme";
import ThemeHeader from "@/components/theme/ThemeHeader";
import ProductGrid from "@/components/theme/ProductGrid";

export default function ThemePage() {
  const { themeId } = useParams();
  const { theme, loading: themeLoading } = useFetchTheme(themeId);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 불러 올 게 있는지
  const pageRef = useRef(1); // 현재 페이지 번호 저장
  const loader = useRef<HTMLDivElement | null>(null); // 마지막 감지

  // 상품 불러오기
  const fetchProducts = useCallback(
    async (pageNum: number) => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        if (!themeId) return;
        const productData = await getThemeProduct(themeId);
        const newProducts = productData.data.list;
        pageRef.current = pageNum;
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(newProducts.length > 0);
      } catch (error) {
        if (axios.isAxiosError(error))
          showErrorToast("상품을 불러오는 데 실패했어요.");
      } finally {
        setLoading(false);
      }
    },
    [themeId, hasMore],
  );

  // 첫 페이지 상품만 초기 fetch
  useEffect(() => {
    if (!themeId || themeLoading) return;
    setProducts([]);
    setHasMore(true);
    pageRef.current = 1;
    fetchProducts(1);
  }, [themeId, themeLoading, fetchProducts]);

  // Intersection Observer로 무한 스크롤
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          pageRef.current += 1;
          fetchProducts(pageRef.current);
        }
      },
      { root: null, rootMargin: "20px", threshold: 1.0 },
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [fetchProducts, hasMore, loading]);

  if (!theme) return null;

  return (
    <Wrapper>
      <ThemeHeader theme={theme} />
      <ProductGrid products={products} loader={loader} loading={loading} />
      {loading && <Spinner />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Spinner = styled.div`
  margin: 40px auto;
  width: 25px;
  height: 25px;
  border: 4px solid #ccc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
