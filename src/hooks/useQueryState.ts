import { useSearchParams } from "react-router-dom"

export default function useQueryState<T extends string>(
  key: string,
  defaultValue: T
) {
  const [params, setParams] = useSearchParams()
  const value = (params.get(key) as T | null) ?? defaultValue

  const setValue = (v: T) => {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      next.set(key, v)
      next.set(`${key}Reload`, Date.now().toString())
      return next
    }, { replace: true })
  }

  return [value, setValue] as const
}
