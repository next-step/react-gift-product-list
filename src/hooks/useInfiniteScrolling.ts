import { useEffect, useCallback } from "react"

type Props = {
  observerRef: HTMLDivElement | null
  fetchMore: () => void
  hasMore: boolean
}

const options: IntersectionObserverInit = {
  threshold: 0.1,
}

export default function useInfiniteScrolling({
  observerRef,
  fetchMore,
  hasMore,
}: Props) {
  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (!entries[0].isIntersecting) return
      fetchMore()
    },
    [fetchMore]
  )

  useEffect(() => {
    if (!observerRef) return
    const observer = new IntersectionObserver(onIntersect, options)
    observer.observe(observerRef)

    if (!hasMore) observer.unobserve(observerRef)
    return () => observer.disconnect()
  }, [observerRef, onIntersect, hasMore])
}
