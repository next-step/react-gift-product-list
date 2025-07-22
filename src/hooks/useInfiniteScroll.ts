import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
}

export function useInfiniteScroll({
  onIntersect,
  enabled = true,
  rootMargin = '0px',
}: UseInfiniteScrollOptions) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [onIntersect, enabled, rootMargin]);

  return ref;
}
