import { useCallback, useRef } from 'react';

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 0,
  rootMargin = '0px',
}: UseIntersectionObserverOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const elementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [onIntersect, enabled, threshold, rootMargin]
  );

  return elementRef;
};
