import { useCallback, useEffect, useState } from "react";

import { useRef } from "react";
import useFetch from "./useFetch";

interface PaginationData<T> {
  list: T[];
  cursor: number;
  hasMoreList: boolean;
}

const usePaginationFetch = <T>(url: string, limit: number = 10, threshold: number = 0.5) => {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMoreList, setHasMoreList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  const { fetchData } = useFetch<PaginationData<T>>(url, {
    autoFetch: false,
  });

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMoreList) return null;

    try {
      setIsLoading(true);
      const response = await fetchData(undefined, undefined, {
        cursor,
        limit,
      });

      if (response.error) {
        setHasMoreList(false);
        return null;
      }

      if (response.data) {
        setItems((prev) => [...prev, ...(response.data?.list ?? [])]);
        setCursor(response.data.cursor);
        setHasMoreList(response.data.hasMoreList);
      }
    } catch (error) {
      console.error("상품 목록을 불러오는데 실패했습니다:", error);
      setHasMoreList(false);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMoreList, isLoading, fetchData, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting && hasMoreList && !isLoading) {
          loadMoreItems();
        }
      },
      { threshold },
    );

    const el = loader.current;
    if (el && hasMoreList) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [hasMoreList, loadMoreItems, isLoading, threshold, loader]);

  return { items, isLoading, hasMoreList, loader };
};

export default usePaginationFetch;
