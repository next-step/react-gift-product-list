import { useEffect, useRef } from 'react';

type UseInfiniteScrollParams = {
  onIntersect: () => void;
  enabled: boolean;
  threshold?: number;
  rootMargin?: string;
};

export const useInfiniteScroll = ({
  onIntersect,
  enabled,
  threshold = 1.0,
  rootMargin = '0px',
}: UseInfiniteScrollParams) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const current = ref.current;
    if (!enabled || !current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersectRef.current();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(current);

    return () => {
      observer.unobserve(current);
      observer.disconnect();
    };
  }, [enabled, threshold, rootMargin]);

  return ref;
};
