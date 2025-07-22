import { useCallback, useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  callback?: () => void;
  threshold?: number;
  rootMargin?: string;
};

export const useInView = (options: UseInViewOptions = {}) => {
  const { callback, threshold = 0.1, rootMargin = "50px" } = options;

  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
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
