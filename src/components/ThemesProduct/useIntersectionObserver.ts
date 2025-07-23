import { useEffect, useRef } from 'react';

type Props = {
  onIntersect: () => void;
  canLoadMore: boolean;
  threshold?: number;
};

export const useIntersectionObserver = ({ onIntersect, canLoadMore, threshold = 1.0 }: Props) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canLoadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [canLoadMore, onIntersect, threshold]);

  return loaderRef;
};
