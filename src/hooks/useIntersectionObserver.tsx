import { useEffect, type RefObject } from 'react'

// * Intersection Observer API 커스텀 훅
export function useIntersectionObserver(
  ref: RefObject<HTMLDivElement | null>,
  onIntersect: () => void,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) return
    if (!ref.current) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      { threshold: 1.0 },
    )

    const el = ref.current
    observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [ref, onIntersect, enabled])
}
