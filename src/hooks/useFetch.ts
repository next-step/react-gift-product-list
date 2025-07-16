import { useCallback, useEffect, useState } from 'react'

export interface FetchState<T> {
  isLoading: boolean
  isError: boolean
  data: T | null
}

export const useFetch = <T>(fetcher: () => Promise<T>, deps: unknown[] = []) => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    isLoading: true,
    isError: false,
    data: null,
  })

  // * deps 의존성 배열 기반 메모이제이션
  const memoizedFetcher = useCallback(fetcher, deps)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      // * 재요청 시 로딩 상태
      setFetchState((prev) => ({ ...prev, isLoading: true, isError: false }))

      try {
        const data = await memoizedFetcher()
        if (isMounted) {
          setFetchState({ isLoading: false, isError: false, data })
        }
      } catch (error) {
        console.error('Fetch error:', error)
        if (isMounted) {
          setFetchState({ isLoading: false, isError: true, data: null })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [memoizedFetcher])

  return fetchState
}
