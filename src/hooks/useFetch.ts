import { useEffect, useState } from 'react'

export interface FetchState<T> {
  isLoading: boolean
  isError: boolean
  data: T | null
}

export const useFetch = <T>(fetcher: () => Promise<T>) => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    isLoading: true,
    isError: false,
    data: null,
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const data = await fetcher() // 서비스 함수 호출
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
  }, [fetcher])

  return fetchState
}
