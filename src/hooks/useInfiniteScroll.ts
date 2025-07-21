import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export const useInfiniteScroll = (
  onIntersect: () => void,
  enabled: boolean
) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    if (enabled && inView) {
      onIntersect()
    }
  }, [inView, enabled, onIntersect])

  return ref
}
