import { useEffect, useRef } from 'react'

type UseInfiniteScrollParams = {
  onIntersect: () => void
  enabled: boolean
  threshold?: number
  rootMargin?: string
}

export const useInfiniteScroll = ({
  onIntersect,
  enabled,
  threshold = 1.0,
  rootMargin = '0px',
}: UseInfiniteScrollParams) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [onIntersect, enabled, threshold, rootMargin])

  return ref
}
