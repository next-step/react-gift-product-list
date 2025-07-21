import { useEffect, useRef, useCallback } from "react";

type Callback = () => void;

interface UseIntersectOptions {
  rootMargin?: string;
  threshold?: number;
}

export const useIntersect = <T extends Element = HTMLDivElement>(
  onIntersect: Callback,
  canObserve: boolean,
  options: UseIntersectOptions = { rootMargin: "0px", threshold: 1.0 }
) => {
  const ref = useRef<T | null>(null);

  const observerCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !canObserve) return;

    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [observerCallback, canObserve, options]);

  return ref;
};
