import { useEffect } from "react";

interface UseInfiniteScrollProps {
  targetRef: React.RefObject<HTMLElement | null>;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  targetRef,
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 1.0,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    const target = targetRef.current;
    if (!target || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [targetRef, hasMore, isLoading, onLoadMore, threshold]);
};
