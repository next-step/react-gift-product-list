import { useEffect, useRef, useState, useCallback } from 'react';
import ProductListRenderer from '@/components/ProductList/ProductListRenderer';

interface Product {
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
}

interface APIResponse {
  data: {
    list: Product[];
    cursor: number;
    hasMoreList: boolean;
  };
}

interface ThemeProductListProps {
  themeId: string;
}

const ThemeProductList = ({ themeId }: ThemeProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/themes/${themeId}/products?cursor=${cursor}`
      );
      const json: APIResponse = await res.json();
      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const filtered = json.data.list.filter((item) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });
      setCursor(json.data.cursor);
      setHasMore(json.data.hasMoreList);
    } catch (err) {
      setError('상품을 불러오는 데 실패했어요.');
    } finally {
      setIsLoading(false);
    }
  }, [themeId, cursor, isLoading, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchProducts, hasMore, isLoading]);

  return (
    <>
      <ProductListRenderer
        isLoading={isLoading && products.length === 0}
        error={error}
        products={products}
      />
      {!isLoading && !error && <div ref={observerRef} style={{ height: 1 }} />}
    </>
  );
};

export default ThemeProductList;
