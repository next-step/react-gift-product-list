import { useEffect, useRef } from 'react';

interface Options {
  onIntersection: () => void;
  disconnectCondition?: boolean;
}

export function useIntersectionObserver({ onIntersection, disconnectCondition = false }: Options) {
  const ref = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current || disconnectCondition) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersection();
      }
    });

    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [onIntersection, disconnectCondition]);

  return { ref };
}
