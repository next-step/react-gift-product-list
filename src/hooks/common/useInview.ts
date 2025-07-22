import { useCallback, useEffect, useRef, useState } from "react";

interface UseInViewProps {
  callback?: () => void;
  threshold?: number;
  rootMargin?: string;
}

export const useInView = (options: UseInViewProps = {}) => {
  const { callback, threshold = 0.1, rootMargin = "50px" } = options;

  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const isIntersecting = entry.isIntersecting;

      setInView(isIntersecting);

      if (isIntersecting) {
        callback?.();
      }
    },
    [callback],
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);

  return {
    ref: elementRef,
    inView,
  };
};
