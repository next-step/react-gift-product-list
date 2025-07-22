import { useEffect, useState } from "react";
import type { ThemeProduct, ThemeProducts } from "@/types/ThemeProducts";

interface ObserverOptionsType {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  unobserveOnEnter?: boolean;
}

interface UseInfiniteScrollPropsType {
  data: ThemeProducts;
  isLoading: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  setCursor: React.Dispatch<React.SetStateAction<number>>;
  observerOptions?: ObserverOptionsType;
}

function useInfiniteScroll({
  data,
  isLoading,
  loaderRef,
  setCursor,
  observerOptions,
}: UseInfiniteScrollPropsType) {
  const [themeProducts, setThemeProducts] = useState<ThemeProduct[]>([]);

  useEffect(() => {
    if (data) {
      setThemeProducts((prev) => [...prev, ...data.list]);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && data?.hasMoreList) {
          setCursor((prev) => prev + data?.list.length);
        }
      },
      {
        ...observerOptions,
      }
    );

    const el = loaderRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [isLoading, data?.hasMoreList]);

  return { themeProducts };
}

export default useInfiniteScroll;
