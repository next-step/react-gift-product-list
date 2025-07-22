import { useCallback, useEffect, useState } from 'react'
import { AxiosError } from 'axios'

export interface FetchState<T> {
  isLoading: boolean
  isError: boolean
  data: T | null
  errorStatus?: number // ! 에러 status code (특정 에러 처리용)
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
      } catch (error: unknown) {
        console.error('Fetch error:', error)

        if (error instanceof AxiosError && error.response) {
          const errorStatus = error.response.status
          setFetchState({ isLoading: false, isError: true, data: null, errorStatus })
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
