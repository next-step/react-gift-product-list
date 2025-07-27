import { useEffect, useRef } from 'react'

export default function useIntersection(
  callback: () => void,
  options?: IntersectionObserverInit,
) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        callback()
      }
    }, options)

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [callback, options])

  return ref
}