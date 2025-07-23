import { useEffect, useRef } from 'react';

interface UseInfiniteScrollParams {
  fetchNextPage: () => Promise<void>;
  hasMoreList: boolean;
  isFetching: boolean;
}

const useInfiniteScroll = ({
  fetchNextPage,
  hasMoreList,
  isFetching,
}: UseInfiniteScrollParams) => {
  //Ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMoreList || isFetching) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [fetchNextPage, hasMoreList, isFetching]);
  return { sentinelRef };
};

export default useInfiniteScroll;
