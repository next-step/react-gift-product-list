import { useCallback, useEffect, useState } from "react";
import useApiRequest from "./useApiRequest";
import { useInView } from "./useInView";

type UseInfiniteQueryProps<TRes, TItem, TParams> = {
  fetcher: (params: TParams) => Promise<TRes>;
  initialParams: TParams;
  getList: (res: TRes) => TItem[];
  getCursor: (res: TRes) => number;
  getHasMore: (res: TRes) => boolean;
};

function useInfiniteQuery<TRes, TItem, TParams>({
  fetcher,
  initialParams,
  getList,
  getCursor,
  getHasMore,
}: UseInfiniteQueryProps<TRes, TItem, TParams>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const requestFn = useCallback(
    () => fetcher({ ...initialParams, cursor, limit: 20 }),
    [cursor, initialParams, fetcher],
  );
  const { data, isError, isLoading, refetch } = useApiRequest({
    requestFn,
    immediate: false,
  });

  useEffect(() => {
    if (
      data &&
      !isLoading &&
      !isError &&
      (!getHasMore(data) || cursor !== getCursor(data))
    ) {
      setItems(prev => [...prev, ...getList(data)]);
      setCursor(getCursor(data));
      setHasMore(getHasMore(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isError]);

  const { ref: loader } = useInView({
    callback: () => {
      if (hasMore && !isLoading) {
        refetch();
      }
    },
    threshold: 1,
    rootMargin: "50px",
  });

  return {
    items,
    isLoading,
    isError,
    loaderRef: loader,
  };
}

export default useInfiniteQuery;
