import { useState, useEffect} from "react"
import axios, { AxiosResponse } from "axios"

interface UseFetchOptions {
  dependencies?: any[]
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: any
}

function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const {
    dependencies = [],
    onSuccess,
    onError,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response: AxiosResponse<T> = await axios.get(url)
        setData(response.data)
        onSuccess?.(response.data)
      } catch (err) {
        setError(err)
        onError?.(err)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url, ...dependencies])

  return {
    data,
    loading,
    error
  }
}

export default useFetch
