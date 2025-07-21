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

// * 페이지네이션 커스텀 훅
export function usePagination<T>({
  fetcher,
  initialCursor = 0,
  limit = 10,
  deps = [],
}: UsePaginationOptions<T>) {
  const [list, setList] = useState<T[]>([])
  const [cursor, setCursor] = useState(initialCursor)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // * fetchMore가 항상 최신 cursor를 사용하기위해
  const cursorRef = useRef(cursor)
  cursorRef.current = cursor

  // * 최초/더보기 fetch
  const fetchMore = useCallback(
    async (reset = false) => {
      setIsLoading(true)
      setIsError(false)
      try {
        const res = await fetcher(reset ? initialCursor : cursorRef.current, limit)
        setList((prev) => (reset ? res.list : [...prev, ...res.list]))
        setCursor(res.cursor)
        setHasMore(res.hasMoreList)
      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [fetcher, initialCursor, limit, ...deps],
  )

  // * 초기화 및 첫 fetch
  const resetAndFetch = useCallback(() => {
    setList([])
    setCursor(initialCursor)
    setHasMore(true)
    fetchMore(true)
  }, [fetchMore, initialCursor])

  return {
    list,
    cursor,
    hasMore,
    isLoading,
    isError,
    fetchMore,
    resetAndFetch,
  }
}
