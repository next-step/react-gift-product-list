import { useState, useCallback, useEffect } from "react"

export default function useInView(): [(node: Element | null) => void, boolean] {
  const [inView, setInView] = useState(false)
  const [target, setTarget] = useState<Element | null>(null)

  const setRef = useCallback((node: Element | null) => {
    setTarget(node)           
  }, [])


  useEffect(() => {
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }      
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [target])

  return [setRef, inView]
}
