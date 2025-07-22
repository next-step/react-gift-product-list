import { useState, useCallback, useRef } from 'react'

interface UsePaginationOptions<T> {
  fetcher: (
    cursor: number,
    limit: number,
  ) => Promise<{ list: T[]; cursor: number; hasMoreList: boolean }>
  initialCursor?: number
  limit?: number
  deps?: unknown[]
}

interface PaginationState<T> {
  list: T[]
  cursor: number
  hasMore: boolean
  isLoading: boolean
  isError: boolean
}

// * 페이지네이션 커스텀 훅
export function usePagination<T>({
  fetcher,
  initialCursor = 0,
  limit = 10,
  deps = [],
}: UsePaginationOptions<T>) {
  const [paginationState, setPaginationState] = useState<PaginationState<T>>({
    list: [],
    cursor: initialCursor,
    hasMore: true,
    isLoading: false,
    isError: false,
  })

  // * fetchMore가 항상 최신 cursor를 사용하기위해
  const cursorRef = useRef(initialCursor)
  cursorRef.current = paginationState.cursor

  // * 최초/더보기 fetch
  const fetchMore = useCallback(
    async (reset = false) => {
      setPaginationState((prev) => ({ ...prev, isLoading: true, isError: false }))
      try {
        const res = await fetcher(reset ? initialCursor : cursorRef.current, limit)
        setPaginationState((prev) => ({
          list: reset ? res.list : [...prev.list, ...res.list],
          cursor: res.cursor,
          hasMore: res.hasMoreList,
          isLoading: false,
          isError: false,
        }))
      } catch {
        setPaginationState((prev) => ({ ...prev, isLoading: false, isError: true }))
      }
    },
    [fetcher, initialCursor, limit, ...deps],
  )

  // * 초기화 및 첫 fetch
  const resetAndFetch = useCallback(() => {
    setPaginationState({
      list: [],
      cursor: initialCursor,
      hasMore: true,
      isLoading: false,
      isError: false,
    })
    fetchMore(true)
  }, [fetchMore, initialCursor])

  return {
    ...paginationState,
    fetchMore,
    resetAndFetch,
  }
}
