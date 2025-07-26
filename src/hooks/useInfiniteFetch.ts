import { useInfiniteQuery } from '@tanstack/react-query';

interface FetchPageParams {
  pageParam?: number;
}

interface UseInfiniteFetchOptions<T> {
  queryKey: (string | number)[];
  fetchFunction: ({ pageParam }: FetchPageParams) => Promise<T[]>;
  getNextPageParam: (lastPage: T[], allPages: T[][]) => number | undefined;
  enabled?: boolean;
}

export function useInfiniteFetch<T>({
  queryKey,
  fetchFunction,
  getNextPageParam,
  enabled = true,
}: UseInfiniteFetchOptions<T>) {
  return useInfiniteQuery({
    queryKey,
    queryFn: fetchFunction,
    getNextPageParam,
    enabled,
    initialPageParam: 1,
  });
}
